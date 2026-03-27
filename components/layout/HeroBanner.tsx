import Container from "@/components/ui/Container";

type HeroBannerProps = {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
};

export default function HeroBanner({
  title,
  breadcrumb,
  subtitle,
  image,
  align = "center",
}: HeroBannerProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="hero-overlay" />
      <Container
        className={`hero-content hero-content-lift flex flex-col ${alignment} py-20 sm:py-24 md:py-32`}
      >
        <p className="text-xs uppercase tracking-[0.45em] text-black/70">
          {breadcrumb}
        </p>
        <h1 className="mt-4 page-banner-title font-semibold">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

