import type { ReactNode } from 'react';

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
};

export default function SectionWrapper({
  children,
  className,
  innerClassName,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={['py-14 md:py-20', className].filter(Boolean).join(' ')}
    >
      <div
        className={['section-shell', innerClassName].filter(Boolean).join(' ')}
      >
        {children}
      </div>
    </section>
  );
}
