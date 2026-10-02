import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { HeroGate } from "@/components/hero-gate";
import { InlineScript } from "@/components/inline-script";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noauffal Abdullatief — Data Scientist & AI Engineer",
  description: "I design intelligent systems from data to production.",
};

const heroScript = `(function(){try{var r=document.documentElement;if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){window.__heroAnim="done";return}r.classList.add("hero-anim");window.__heroAnim="armed";var fired=false;var fire=function(){if(fired)return;fired=true;window.__heroAnim="ready";r.classList.add("hero-ready");window.setTimeout(function(){window.__heroAnim="done";r.classList.remove("hero-anim","hero-ready")},2400)};if(document.fonts&&document.fonts.ready&&document.fonts.ready.then){document.fonts.ready.then(function(){window.requestAnimationFrame(fire)})}window.setTimeout(fire,900)}catch(e){try{window.__heroAnim="done";document.documentElement.classList.remove("hero-anim")}catch(_){}}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <InlineScript html={heroScript} />
        {children}
        <HeroGate />
      </body>
    </html>
  );
}
