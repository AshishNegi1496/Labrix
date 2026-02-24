import Link from "next/link";
import LogoMark from "@/components/LogoMark";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-6 py-6 text-white">
        {/* Logo — Left */}
        <Link href="/" className="flex items-center gap-2 justify-self-start">
          <LogoMark />
          <span className="type-h6 font-semibold uppercase tracking-[0.3em]">
            Labrix
          </span>
        </Link>

        {/* Navigation — Center */}
        <nav className="hidden justify-self-center items-center gap-8 type-h6 text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA — Right */}
        <Link
          href="/contact"
          className="hidden justify-self-end btn-default lg:inline-flex"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
