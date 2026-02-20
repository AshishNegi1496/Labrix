import Link from 'next/link';
import LogoMark from '@/components/LogoMark';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  return (
    <header className='absolute left-0 top-0 z-50 w-full'>
      <div className='section-shell flex items-center justify-between py-6 text-white'>
        <Link href='/' className='flex items-center gap-3'>
          <LogoMark />
          <span className='text-xs font-semibold uppercase tracking-[0.35em]'>
            labrix
          </span>
        </Link>

        <nav className='hidden items-center gap-6 text-sm text-white/80 lg:flex'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='transition hover:text-white'
            >
              {item.label}
            </Link>
          ))}
          <span className='inline-flex items-center gap-1 text-white/80'>
            Pages
            <svg
              viewBox='0 0 16 16'
              className='h-3 w-3'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path d='M4 6l4 4 4-4' />
            </svg>
          </span>
          <Link href='/contact' className='transition hover:text-white'>
            Contact Us
          </Link>
        </nav>

        <div className='flex items-center gap-3'>
          <Link href='/contact' className='btn-default btn-sm'>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
