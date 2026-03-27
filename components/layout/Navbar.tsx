"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { navigation, uiLabels } from "@/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(controlNavbar);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 bg-transparent  border-b border-white/20
          transition-transform duration-300 ease-in-out will-change-transform
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[#081423]/24 via-[#081423]/10 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <Link
            href="/"
            className="relative -ml-20 z-50 flex items-center gap-2 rounded-full border border-white/18 bg-linear-to-r from-white/72 via-[#edf7ff]/64 to-[#daf6ea]/62 px-3 py-2 shadow-[0_18px_40px_rgba(8,20,35,0.14)] ring-1 ring-white/32 backdrop-blur-xl transition duration-300 hover:from-white/80 hover:via-[#f2f9ff]/76 hover:to-[#e3faf1]/72 sm:px-4"
          >
            <Image
              src="/images/company-logo.png"
              alt="ClinRT Logo"
              width={120}
              height={15}
              // className="h-auto w-33 sm:w-37.5 lg:w-40"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full  bg-[#0f243a]/30 px-2 py-2 text-white shadow-[0_18px_36px_rgba(8,20,35,0.16)] backdrop-blur-xl lg:flex"
            aria-label="Primary"
          >
            {navigation.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 transition duration-300 ${
                    isActive
                      ? "bg-white/16 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      : "text-white/78 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            href={navigation.cta.href}
            label={navigation.cta.label}
            className="hidden shadow-[0_18px_36px_rgba(8,20,35,0.16)] lg:inline-flex"
          />

          <button
            className="z-50 rounded-full border border-white/18 bg-[#0f243a]/30 p-2.5 text-white shadow-[0_18px_36px_rgba(8,20,35,0.18)] backdrop-blur-xl transition hover:bg-[#0f243a]/40 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={uiLabels.toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`
    fixed inset-0 z-40 flex flex-col overflow-y-auto bg-linear-to-b from-[#f6fbff] via-white to-[#eef8f3] p-6 pt-28 transition-transform duration-300 sm:p-8 sm:pt-32 lg:hidden
    ${isOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <nav
          className="flex flex-col gap-4 text-2xl font-semibold"
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
                className={`rounded-[1.35rem] px-5 py-4 transition duration-300 ${
                  isActive
                    ? "bg-[#0f243a] text-white! shadow-[0_18px_36px_rgba(8,20,35,0.12)]"
                    : "border border-[#0f243a]/8 bg-white/72 text-[#0f243a]! hover:border-[#6466ae]/22 hover:bg-white hover:text-[#0f243a]!"
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
            className="mt-2 w-full uppercase shadow-[0_18px_36px_rgba(8,20,35,0.12)]"
          />
        </nav>
      </div>
    </>
  );
}
