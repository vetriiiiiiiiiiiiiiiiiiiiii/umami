/**
 * Point-cloud "sculptures" for the hero: the Umami Labs journey told in particles.
 *   0 Ingredient  — three heaps of raw material being poured
 *   1 Formula     — a laboratory flask holding liquid
 *   2 Compliant   — a finished jar with a label and a compliance seal
 *   3 Commercial  — jars flowing along a production line past a filling station
 *
 * Each sampler returns exactly N points: xyz + flow flag (w) and a palette index.
 * Palette: 0 grain · 1 spice · 2 herb · 3 accent · 4 ink · 5 glass
 */

export type Cloud = { pos: Float32Array; col: Float32Array };

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Builder {
  pos: Float32Array;
  col: Float32Array;
  i = 0;
  constructor(public n: number) {
    this.pos = new Float32Array(n * 4);
    this.col = new Float32Array(n);
  }
  push(x: number, y: number, z: number, c: number, flow = 0) {
    if (this.i >= this.n) return;
    this.pos.set([x, y, z, flow], this.i * 4);
    this.col[this.i] = c;
    this.i++;
  }
  /** fill remaining slots by duplicating existing points (keeps N exact) */
  done(r: () => number): Cloud {
    const filled = this.i;
    while (this.i < this.n) {
      const k = Math.floor(r() * filled);
      this.push(this.pos[k * 4], this.pos[k * 4 + 1], this.pos[k * 4 + 2], this.col[k], this.pos[k * 4 + 3]);
    }
    return { pos: this.pos, col: this.col };
  }
}

const TAU = Math.PI * 2;

/* ── 0 · Ingredient heaps ── */
export function ingredients(n: number): Cloud {
  const r = rng(11);
  const b = new Builder(n);
  const heaps = [
    { x: -1.55, z: 0.1, H: 1.35, R: 1.0, c: 0 },
    { x: 0.05, z: -0.15, H: 1.8, R: 1.15, c: 1 },
    { x: 1.6, z: 0.15, H: 1.15, R: 0.9, c: 2 },
  ];
  const base = -1.3;
  const per = Math.floor((n * 0.86) / heaps.length);
  for (const h of heaps) {
    for (let k = 0; k < per; k++) {
      const y = h.H * (1 - Math.cbrt(r()));
      const rad = h.R * (1 - y / h.H) * (r() < 0.7 ? 1 : Math.sqrt(r()));
      const a = r() * TAU;
      // slight grain clumping noise
      const j = (r() - 0.5) * 0.06;
      b.push(h.x + Math.cos(a) * rad + j, base + y, h.z + Math.sin(a) * rad + j, h.c);
    }
  }
  // grains being poured onto each heap
  const pour = Math.floor(n * 0.12);
  for (let k = 0; k < pour; k++) {
    const h = heaps[k % 3];
    const y = base + h.H + r() * (3.0 - h.H);
    // w encodes 'pouring' + the heap top it lands on (animated in the shader)
    b.push(h.x + (r() - 0.5) * 0.1, y, h.z + (r() - 0.5) * 0.1, h.c, 2 + (base + h.H - 0.15 + 1.5) / 4);
  }
  return b.done(r);
}

/* ── 1 · Formula flask ── */
export function flask(n: number): Cloud {
  const r = rng(22);
  const b = new Builder(n);
  const yb = -1.35;
  const yShoulder = 0.45;
  const yTop = 1.55;
  const radiusAt = (y: number) => (y > yShoulder ? 0.3 : 0.3 + ((yShoulder - y) / (yShoulder - yb)) * 1.0);
  // glass wall
  const glass = Math.floor(n * 0.3);
  for (let k = 0; k < glass; k++) {
    const y = yb + r() * (yTop - yb);
    const a = r() * TAU;
    const rad = radiusAt(y);
    b.push(Math.cos(a) * rad, y, Math.sin(a) * rad, 5);
  }
  // rim and base rings
  for (let k = 0; k < n * 0.04; k++) {
    const a = r() * TAU;
    if (k % 2) b.push(Math.cos(a) * 0.37, yTop, Math.sin(a) * 0.37, 4);
    else b.push(Math.cos(a) * 1.3, yb, Math.sin(a) * 1.3, 4);
  }
  // liquid volume + meniscus
  const yLiquid = -0.25;
  const liquid = Math.floor(n * 0.5);
  for (let k = 0; k < liquid; k++) {
    const surface = r() < 0.18;
    const y = surface ? yLiquid : yb + 0.04 + r() * (yLiquid - yb - 0.04);
    const a = r() * TAU;
    const rad = (radiusAt(y) - 0.05) * (surface ? Math.sqrt(r()) : r() < 0.55 ? 1 : Math.sqrt(r()));
    b.push(Math.cos(a) * rad, y, Math.sin(a) * rad, surface ? 3 : k % 9 === 0 ? 2 : 3);
  }
  // bubbles rising through the neck, and a little vapour
  for (let k = 0; k < n * 0.12; k++) {
    const y = yLiquid + r() * 2.6;
    const rad = y > yShoulder ? 0.22 * r() : radiusAt(y) * 0.6 * r();
    const a = r() * TAU;
    // w encodes 'rising' + where the liquid surface is (animated in the shader)
    b.push(Math.cos(a) * rad, y, Math.sin(a) * rad, y > yTop ? 2 : 3, 3 + (yLiquid + 1.5) / 4);
  }
  return b.done(r);
}

/* jar helper used by stages 2 and 3 */
function jar(b: Builder, r: () => number, count: number, cx: number, cy: number, cz: number, s: number, flow = 0) {
  const R = 0.95 * s;
  const y0 = cy - 1.25 * s;
  const y1 = cy + 0.85 * s;
  const lY0 = cy - 0.55 * s;
  const lY1 = cy + 0.4 * s;
  for (let k = 0; k < count; k++) {
    const u = r();
    const a = r() * TAU;
    if (u < 0.12) {
      // lid
      const y = y1 + r() * 0.32 * s;
      const top = r() < 0.4;
      const rad = top ? R * 1.04 * Math.sqrt(r()) : R * 1.04;
      b.push(cx + Math.cos(a) * rad, top ? y1 + 0.32 * s : y, cz + Math.sin(a) * rad, 4, flow);
    } else if (u < 0.62) {
      // label band — biased to the visible front
      const a = r() < 0.8 ? Math.PI / 2 + (r() - 0.5) * 2.2 : r() * TAU;
      const y = lY0 + r() * (lY1 - lY0);
      const front = Math.cos(a - Math.PI / 2); // +z facing
      const ly = (y - lY0) / (lY1 - lY0);
      const ang = a - Math.PI / 2; // 0 = front
      const along = -Math.atan2(Math.sin(ang), Math.cos(ang)); // + = viewer right
      // paper label: title cut out as negative space, large compliance seal with a cut-out check
      let c = 4;
      if (front > 0.15) {
        const title = ly > 0.7 && ly < 0.86 && Math.abs(along) < 0.62;
        const sx = along * 1.05;
        const sy = (ly - 0.36) * 1.25;
        const sd = Math.hypot(sx, sy);
        if (title) continue;
        if (sd < 0.36) {
          // check mark: two strokes, cut out of the seal
          const d1 = Math.abs(sy - (-sx - 0.03)) < 0.045 && sx > -0.19 && sx < -0.03;
          const d2 = Math.abs(sy - (sx * 1.25 - 0.05)) < 0.045 && sx > -0.05 && sx < 0.21;
          if (d1 || d2) continue;
          c = 3;
        } else if (sd < 0.41) continue;
      } else if (r() < 0.7) continue;
      b.push(cx + Math.cos(a) * R * 1.005, y, cz + Math.sin(a) * R * 1.005, c, flow);
    } else if (u < 0.74) {
      // glass body above/below label
      const y = r() < 0.5 ? y0 + r() * (lY0 - y0) : lY1 + r() * (y1 - lY1);
      b.push(cx + Math.cos(a) * R, y, cz + Math.sin(a) * R, 5, flow);
    } else {
      // product inside (granola-like fill)
      const y = y0 + r() * (lY1 + 0.25 * s - y0);
      const rad = R * 0.9 * Math.sqrt(r());
      b.push(cx + Math.cos(a) * rad, y, cz + Math.sin(a) * rad, r() < 0.5 ? 0 : 1, flow);
    }
  }
}

/* ── 2 · Compliant product ── */
export function product(n: number): Cloud {
  const r = rng(33);
  const b = new Builder(n);
  jar(b, r, Math.floor(n * 1.5), 0, 0.12, 0, 1.25);
  // a few loose grains around the base
  for (let k = 0; k < n * 0.04; k++) {
    const a = r() * TAU;
    const rad = 1.35 + r() * 0.6;
    b.push(Math.cos(a) * rad, -1.45, Math.sin(a) * rad * 0.7, k % 2 ? 0 : 1);
  }
  return b.done(r);
}

/* ── 3 · Commercial production line ── */
export function production(n: number): Cloud {
  const r = rng(44);
  const b = new Builder(n);
  const jars = 4;
  const perJar = Math.floor((n * 0.66) / jars);
  for (let j = 0; j < jars; j++) {
    jar(b, r, perJar, -3 + j * 1.5, 0.06, 0, 0.6, 1);
  }
  // belt surface + edges
  const beltY = -0.72;
  for (let k = 0; k < n * 0.2; k++) {
    const x = -2.9 + r() * 5.8;
    const e = r();
    if (e < 0.45) b.push(x, beltY, e < 0.22 ? 0.55 : -0.55, 4);
    else b.push(x, beltY - 0.02, (r() - 0.5) * 1.1, 5);
  }
  // rollers
  for (let k = 0; k < n * 0.08; k++) {
    const x = -2.7 + Math.floor(r() * 10) * 0.6;
    const a = r() * TAU;
    b.push(x + Math.cos(a) * 0.14, beltY - 0.2 + Math.sin(a) * 0.14, (r() - 0.5) * 1.1, 2);
  }
  // filling station (frame + nozzle) over the line
  for (let k = 0; k < n * 0.1; k++) {
    const u = r();
    const x0 = -0.95;
    if (u < 0.5) {
      // two posts
      const side = r() < 0.5 ? -1 : 1;
      b.push(x0 + side * 0.75, beltY + r() * 2.5, -0.7, 4);
    } else if (u < 0.75) {
      // cross beam
      b.push(x0 - 0.75 + r() * 1.5, beltY + 2.5, -0.7 + (r() - 0.5) * 0.08, 4);
    } else {
      // nozzle
      b.push(x0 + (r() - 0.5) * 0.14, beltY + 1.85 + r() * 0.65, -0.2, 3);
    }
  }
  return b.done(r);
}

export const builders = [ingredients, flask, product, production];
