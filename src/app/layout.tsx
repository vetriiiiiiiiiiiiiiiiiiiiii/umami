import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { MotionRoot } from "@/components/layout/MotionRoot";
import { JsonLd, organizationSchema } from "@/lib/seo";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--ff-grotesk", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--ff-serif", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Umami Labs — Food Product Development, Compliance & Manufacturing Consultancy",
    template: "%s — Umami Labs",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Umami Labs — One team. The entire journey.",
    description: site.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "Umami Labs — One team. The entire journey.", description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#101713" },
  ],
};

/** Runs before first paint: theme, motion preference and loader state. */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('umami-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)}catch(e){}var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(rm?'reduced':'motion');try{if(rm||sessionStorage.getItem('umami-loaded'))d.classList.add('no-loader')}catch(e){d.classList.add('no-loader')}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${grotesk.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Loader />
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
