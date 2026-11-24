"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";
import { images, type ImageKey } from "@/content/images";

const unsplashLoader = ({ src, width, quality }: ImageLoaderProps) =>
  `https://images.unsplash.com/photo-${src}?w=${width}&q=${quality || 72}&auto=format&fit=crop`;

type Props = {
  name: ImageKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  /** decorative images get empty alt */
  decorative?: boolean;
};

/**
 * Responsive, lazy-loaded photo from the image library with a graceful
 * texture fallback if the remote image fails.
 */
export function Photo({ name, sizes = "100vw", priority, className = "", alt, decorative }: Props) {
  const img = images[name];
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt ?? img.alt}
        className={`absolute inset-0 bg-panel ${className}`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, var(--color-sage) 0 1px, transparent 2px), radial-gradient(circle at 70% 60%, var(--color-border-strong) 0 1px, transparent 2px)",
          backgroundSize: "22px 22px, 31px 31px",
        }}
      />
    );
  }
  return (
    <Image
      loader={unsplashLoader}
      src={img.id}
      alt={decorative ? "" : alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={{ filter: "var(--img-filter)" }}
    />
  );
}
