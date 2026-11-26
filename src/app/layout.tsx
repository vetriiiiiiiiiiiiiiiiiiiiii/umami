import type { Metadata, Viewport } from "next";
import { Cinzel, Caveat, Nunito } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/layout/MotionRoot";
import { SketchDefs } from "@/components/ui/Sketch";
import { JsonLd, organizationSchema } from "@/lib/seo";

const display = Cinzel({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--ff-display", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--ff-hand", display: "swap" });
const body = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--ff-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Umami Labs — Food Product Development, Compliance & Manufacturing Consultancy",
    template: "%s — The Umami Labs",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "The Umami Labs — One team. The entire journey.",
    description: site.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "The Umami Labs — One team. The entire journey.", description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#171215" },
  ],
};

/** Runs before first paint: theme and motion preference. */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('umami-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)}catch(e){}var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(rm?'reduced':'motion')})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <SketchDefs />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionRoot />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
