"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Install lucide-react or use SVGs
import LogoMark from "@/components/LogoMark";
import Button from "@/components/ui/Button";
import { navigation, uiLabels } from "@/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <LogoMark />
          <span className="type-h6 font-semibold uppercase tracking-[0.3em]">
            {navigation.brandLabel}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 type-h6 text-white/80 lg:flex">
          {navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Button
          href={navigation.cta.href}
          label={navigation.cta.label}
          className="hidden lg:inline-flex"
        />

        {/* Mobile Toggle Button */}
        <button
          className="z-50 p-2 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={uiLabels.toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`
          fixed inset-0 z-40 flex flex-col bg-black/95 p-8 pt-32 transition-transform duration-300 lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <nav className="flex flex-col gap-8 text-2xl font-semibold">
            {navigation.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-(--primary-color)"
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={navigation.cta.href}
              label={navigation.cta.label}
              onClick={() => setIsOpen(false)}
              className="w-full"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
