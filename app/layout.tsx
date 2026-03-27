import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";
import { CursorEffects } from "@/components/cursor-effects";
import { siteMeta } from "@/data";
import Watermark from "@/components/Watermark";
import WatermarkRight from "@/components/WatermarkRight";
import { appConfig } from "@/config/app-config";

//define metadata for website

export const metadata: Metadata = {
  title: siteMeta.name,
  description: siteMeta.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AppNavbar />
        {appConfig.enableCursorEffects ? <CursorEffects /> : null}
        <Watermark />
        <WatermarkRight />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
