"use client";
/* eslint-disable react-hooks/immutability -- three.js objects are mutated per frame by design (R3F idiom) */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { builders } from "./heroShapes";

export type SceneState = { scroll: number; reduced: boolean };

const vert = /* glsl */ `
uniform float uTime; uniform float uMix; uniform float uScroll; uniform float uPx; uniform float uBoost;
uniform float uFlowA; uniform float uFlowB; uniform vec3 uMouse; uniform float uHover;
uniform vec3 uPal[6];
attribute vec4 aA; attribute vec4 aB; attribute float aCA; attribute float aCB;
attribute float aSeed; attribute float aSize;
varying vec3 vColor; varying float vAlpha;

// w flags: (.5,1.5) conveyor · [2,3) pouring grain · [3,4) rising bubble
vec3 flowed(vec4 p, float f){
  vec3 q = p.xyz;
  if (p.w > .5 && p.w < 1.5) q.x = mod(q.x + f + 3.0, 6.0) - 3.0;
  else if (p.w >= 2. && p.w < 3.) {
    float top = (p.w - 2.)*4. - 1.5;
    float span = 3.1 - top;
    q.y = top + mod(q.y - top - uTime*.85, span);
  } else if (p.w >= 3.) {
    float bot = (p.w - 3.)*4. - 1.5;
    float y0 = q.y;
    q.y = bot + mod(q.y - bot + uTime*.32, 2.7);
    // keep bubbles inside the flask profile as they rise into the neck
    float r0 = y0 > .45 ? .22 : (.3 + (.45 - y0)/1.8)*.6;
    float r1 = q.y > .45 ? .22 : (.3 + (.45 - q.y)/1.8)*.6;
    q.xz *= r1/max(r0, .001);
    q.x += sin(uTime*2. + q.y*6.)*.02;
  }
  return q;
}
vec3 pal(float i){
  return i < .5 ? uPal[0] : i < 1.5 ? uPal[1] : i < 2.5 ? uPal[2] : i < 3.5 ? uPal[3] : i < 4.5 ? uPal[4] : uPal[5];
}
void main(){
  // staggered, eased morph with a swirl through the air
  float t = clamp(uMix*1.45 - aSeed*.45, 0., 1.);
  t = t*t*(3. - 2.*t);
  vec3 a = flowed(aA, uFlowA);
  vec3 b = flowed(aB, uFlowB);
  vec3 p = mix(a, b, t);
  float arc = sin(t*3.14159);
  float ph = aSeed*40.;
  p += vec3(sin(ph + uTime*.7), cos(ph*1.3 + uTime*.5) + .6, sin(ph*.7 - uTime*.6))*arc*.55;

  // idle breathing
  p += vec3(sin(uTime*.9 + ph), cos(uTime*.8 + ph*1.7), sin(uTime*.6 + ph*.5))*.012;

  // cursor pushes particles aside
  vec2 d = p.xy - uMouse.xy;
  float dist = length(d);
  float push = (1. - smoothstep(0., .95, dist))*.42*uHover;
  p.xy += normalize(d + 1e-4)*push;
  p.z += push*.6;

  // scroll: the product disperses into ingredients again — dust rising
  p += vec3((aSeed - .5)*3.2, aSeed*2.6 + .6, (fract(aSeed*7.3) - .5)*2.)*uScroll*uScroll*1.4;

  vec4 mv = modelViewMatrix*vec4(p, 1.);
  gl_Position = projectionMatrix*mv;
  float ci = mix(aCA, aCB, step(.5, t));
  float emph = ci > 2.5 && ci < 3.5 ? 1.3 : ci > 3.5 && ci < 4.5 ? 1.08 : 1.;
  gl_PointSize = aSize*uPx*uBoost*emph*(1./-mv.z)*(1. + push*1.5);

  vColor = mix(pal(aCA), pal(aCB), t);
  // conveyor jars fade at the ends of the line
  float edgeA = aA.w > .5 && aA.w < 1.5 ? 1. - smoothstep(2.4, 2.95, abs(a.x)) : 1.;
  float edgeB = aB.w > .5 && aB.w < 1.5 ? 1. - smoothstep(2.4, 2.95, abs(b.x)) : 1.;
  vAlpha = mix(edgeA, edgeB, t)*(1. - uScroll*.85);
}`;

const frag = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - .5);
  float a = smoothstep(.5, .32, d);
  if (a < .01) discard;
  gl_FragColor = vec4(vColor, a*vAlpha);
}`;

type Theme = "light" | "dark";
const palettes: Record<Theme, string[]> = {
  // grain · spice · herb · accent · ink · glass
  light: ["#a67a2c", "#c4643f", "#5f8255", "#6f9410", "#1d3529", "#8f8a7b"],
  dark: ["#e0b86a", "#e08a5c", "#9fb894", "#d1eb62", "#f1f0e7", "#7f9184"],
};

function Particles({
  state,
  stage,
  lite,
}: {
  state: React.RefObject<SceneState>;
  stage: number;
  lite: boolean;
}) {
  const N = lite ? 6500 : 14000;
  const { gl, size, camera, invalidate } = useThree();
  const group = useRef<THREE.Group>(null);
  const clouds = useMemo(() => builders.map((b) => b(N)), [N]);
  const current = useRef(stage);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, h: 0, th: 0, nx: 0, ny: 0 });
  const flow = useRef({ a: 0, b: 0 });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const start = clouds[stage];
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute("aA", new THREE.BufferAttribute(start.pos.slice(), 4));
    g.setAttribute("aB", new THREE.BufferAttribute(start.pos.slice(), 4));
    g.setAttribute("aCA", new THREE.BufferAttribute(start.col.slice(), 1));
    g.setAttribute("aCB", new THREE.BufferAttribute(start.col.slice(), 1));
    const seed = new Float32Array(N);
    const sz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      seed[i] = s - Math.floor(s);
      const s2 = Math.sin(i * 78.233) * 12345.678;
      sz[i] = 0.85 + Math.pow(s2 - Math.floor(s2), 4) * 1.3;
    }
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    return g;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clouds, N]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uMix: { value: 0 },
          uScroll: { value: 0 },
          uPx: { value: 1 },
          uBoost: { value: 1 },
          uFlowA: { value: 0 },
          uFlowB: { value: 0 },
          uMouse: { value: new THREE.Vector3() },
          uHover: { value: 0 },
          uPal: { value: palettes.light.map((c) => new THREE.Color(c)) },
        },
      }),
    [],
  );

  useEffect(() => () => {
    geo.dispose();
    mat.dispose();
  }, [geo, mat]);

  /* theme → palette uniforms */
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const t: Theme = root.dataset.theme === "dark" ? "dark" : "light";
      palettes[t].forEach((c, i) => (mat.uniforms.uPal.value as THREE.Color[])[i].set(c));
      mat.blending = t === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
      mat.uniforms.uBoost.value = t === "dark" ? 1 : 1.18;
      mat.needsUpdate = true;
      invalidate();
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [mat, invalidate]);

  /* stage changes → morph */
  const tween = useRef<gsap.core.Tween | null>(null);
  useEffect(() => {
    if (stage === current.current) return;
    const aA = geo.getAttribute("aA") as THREE.BufferAttribute;
    const aB = geo.getAttribute("aB") as THREE.BufferAttribute;
    const cA = geo.getAttribute("aCA") as THREE.BufferAttribute;
    const cB = geo.getAttribute("aCB") as THREE.BufferAttribute;
    // the shape we're leaving is whatever we were heading to
    const m0 = mat.uniforms.uMix.value as number;
    const midway = !!tween.current?.isActive() && m0 > 0 && m0 < 1;
    tween.current?.kill();
    const fromIdx = current.current;
    if (midway) {
      // re-target from where the particles are right now instead of snapping back
      const A = aA.array as Float32Array;
      const B = aB.array as Float32Array;
      const CA = cA.array as Float32Array;
      const CB = cB.array as Float32Array;
      const e = m0 * m0 * (3 - 2 * m0);
      for (let i = 0; i < A.length; i += 4) {
        A[i] += (B[i] - A[i]) * e;
        A[i + 1] += (B[i + 1] - A[i + 1]) * e;
        A[i + 2] += (B[i + 2] - A[i + 2]) * e;
        if (e > 0.5) A[i + 3] = B[i + 3];
      }
      if (e > 0.5) CA.set(CB);
      if (e > 0.5) flow.current.a = flow.current.b;
    } else {
      (aA.array as Float32Array).set(clouds[fromIdx].pos);
      (cA.array as Float32Array).set(clouds[fromIdx].col);
      flow.current.a = flow.current.b;
    }
    (aB.array as Float32Array).set(clouds[stage].pos);
    (cB.array as Float32Array).set(clouds[stage].col);
    aA.needsUpdate = aB.needsUpdate = cA.needsUpdate = cB.needsUpdate = true;
    flow.current.b = 0;
    current.current = stage;
    mat.uniforms.uMix.value = 0;
    if (state.current?.reduced) {
      mat.uniforms.uMix.value = 1;
      invalidate();
      return;
    }
    tween.current = gsap.to(mat.uniforms.uMix, { value: 1, duration: 2.1, ease: "power2.inOut" });
  }, [stage, clouds, geo, mat, state, invalidate]);

  /* pointer */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = gl.domElement.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
      mouse.current.nx = nx;
      mouse.current.ny = ny;
      const inside = Math.abs(nx) < 1.1 && Math.abs(ny) < 1.1;
      mouse.current.th = inside ? 1 : 0;
      // unproject onto z = 0 plane
      const v = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const p = camera.position.clone().add(dir.multiplyScalar(dist));
      mouse.current.tx = p.x;
      mouse.current.ty = p.y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl, camera]);

  const first = useRef(true);
  useFrame((st, delta) => {
    const s = state.current!;
    const dt = Math.min(delta, 0.05);
    const m = mouse.current;
    const k = 1 - Math.pow(0.02, dt);
    m.x += (m.tx - m.x) * k;
    m.y += (m.ty - m.y) * k;
    m.h += (m.th - m.h) * k;
    const u = mat.uniforms;
    u.uTime.value = s.reduced ? 3 : st.clock.elapsedTime;
    u.uScroll.value = s.scroll;
    u.uPx.value = gl.getPixelRatio() * size.height * (lite ? 0.014 : 0.0145);
    u.uMouse.value.set(m.x, m.y, 0);
    u.uHover.value = s.reduced ? 0 : m.h;
    // conveyor flow (only meaningful while the production line is showing)
    if (!s.reduced) {
      if (current.current === 3) flow.current.b += dt * 0.38;
      u.uFlowA.value = flow.current.a;
      u.uFlowB.value = flow.current.b;
    }
    if (group.current) {
      const g = group.current;
      const yaw = s.reduced ? -0.12 : Math.sin(st.clock.elapsedTime * 0.25) * 0.22 - 0.12 + m.nx * 0.2;
      g.rotation.y += (yaw - g.rotation.y) * k;
      g.rotation.x += ((s.reduced ? 0.2 : 0.2 - m.ny * 0.08) - g.rotation.x) * k;
    }
    if (first.current) {
      first.current = false;
      requestAnimationFrame(() => window.dispatchEvent(new Event("umami:hero-ready")));
    }
  });

  return (
    <group ref={group} position={[0, 0.05, 0]}>
      <points geometry={geo} material={mat} frustumCulled={false} />
    </group>
  );
}

export default function HeroScene({
  state,
  stage,
  active,
  lite,
}: {
  state: React.RefObject<SceneState>;
  stage: number;
  active: boolean;
  lite: boolean;
}) {
  return (
    <Canvas
      dpr={lite ? [1, 1.6] : [1, 2]}
      frameloop={active && !state.current?.reduced ? "always" : "demand"}
      camera={{ position: [0, 0.15, lite ? 7.6 : 7.6], fov: 36 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Particles state={state} stage={stage} lite={lite} />
    </Canvas>
  );
}
