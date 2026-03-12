"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import Button from "@/components/ui/Button";
import { navigation, uiLabels } from "@/data";
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          {/* <LogoMark />
          <span className="type-h6 font-semibold uppercase tracking-[0.3em]">
            {navigation.brandLabel}
          </span> */}
          <Image
            src="/clinrt-logo-white.png"
            alt="ClinRT Logo"
            width={160}
            height={20}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 type-h6 lg:flex"
          aria-label="Primary"
        >
          {navigation.items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition ${
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Button
          href={navigation.cta.href}
          label={navigation.cta.label}
          className="hidden lg:inline-flex"
        />

        {/* Mobile Toggle */}
        <button
          className="z-50 p-2 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={uiLabels.toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`
          fixed inset-0 z-40 flex flex-col bg-black/95 p-8 pt-32 transition-transform duration-300 lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <nav
            className="flex flex-col gap-8 text-2xl font-semibold"
            aria-label="Mobile"
          >
            {navigation.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`transition ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-(--primary-color)"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

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
