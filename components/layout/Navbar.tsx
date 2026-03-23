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
          fixed inset-x-0 top-0 z-50 backdrop-blur-sm bg-black/5 border-b border-white/10
          transition-transform duration-300 ease-in-out will-change-transform
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image
              src="/clinrt-logo-white.png"
              alt="ClinRT Logo"
              width={160}
              height={20}
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-8 type-h6 text-white lg:flex"
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
                      ? "border-(--color-orange) pb-1 text-white border-b-2"
                      : "text-white/70 hover:text-white"
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
            className="hidden lg:inline-flex"
          />

          <button
            className="z-50 p-2 lg:hidden text-white"
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
          fixed inset-0 z-40 flex flex-col bg-[#0B1E33] p-8 pt-32 transition-transform duration-300 lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav
          className="flex flex-col gap-8 text-2xl font-semibold text-white"
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
                  isActive ? "text-white" : "text-white/70 hover:text-white"
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
            className="w-full bg-white text-[#0B1E33] hover:bg-white"
          />
        </nav>
      </div>
    </>
  );
}
