import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CursorEffects } from "@/components/cursor-effects";
import { siteMeta } from "@/data";
import { appConfig } from "@/config/app-config";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteMeta.name,
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${sourceSerif.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        <CursorEffects enabled={appConfig.enableCursorEffects} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
