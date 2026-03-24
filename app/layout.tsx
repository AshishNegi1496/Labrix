import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CursorEffects } from "@/components/cursor-effects";
import { siteMeta } from "@/data";
import Watermark from "@/components/Watermark";
import WatermarkRight from "@/components/WatermarkRight";
import { appConfig } from "@/config/app-config";

//define metadata for website

export const metadata: Metadata = {
  title: siteMeta.name,
  description: siteMeta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        {appConfig.enableCursorEffects ? <CursorEffects /> : null}
        <Watermark />
        <WatermarkRight />
        {children}
        <Footer />
      </body>
    </html>
  );
}
