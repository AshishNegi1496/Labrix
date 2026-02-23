import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import CountUpOnView from "@/components/CountUpOnView";
import Image from "next/image";

const images = {
  hero: "https://picsum.photos/seed/labrix-hero/1600/900",
  feature1: "https://picsum.photos/seed/labrix-feature-1/640/480",
  feature2: "https://picsum.photos/seed/labrix-feature-2/640/480",
  feature3: "https://picsum.photos/seed/labrix-feature-3/640/480",
  feature4: "https://picsum.photos/seed/labrix-feature-4/640/480",
  wide: "https://picsum.photos/seed/labrix-wide/1400/700",
  lab: "https://picsum.photos/seed/labrix-lab/1200/800",
  sample: "https://picsum.photos/seed/labrix-sample/800/600",
};

const featureCards = [
  {
    title: "How does it work",
    text: "From sample intake to reporting, every step is documented and verified.",
    image: images.feature1,
  },
  {
    title: "Clinical diagnostics",
    text: "Validated assays and fast turnaround for patient-critical data.",
    image: images.feature2,
  },
];

const researchCards = [
  {
    title: "Precision analytics",
    text: "Signal processing, high-throughput screening, and deep data analysis.",
    image: images.feature3,
  },
  {
    title: "Cellular systems",
    text: "Human-cell models and controlled environments for repeatable results.",
    image: images.feature4,
  },
  {
    title: "Translational science",
    text: "We bridge discovery with real-world delivery for scaled impact.",
    image: images.feature1,
  },
];

const innovationCards = [
  { title: "Biotech", text: "From discovery to commercialization support." },
  {
    title: "Environment",
    text: "Monitoring and compliance with clear insights.",
  },
  { title: "Testing", text: "Validated, repeatable protocols across labs." },
  { title: "Research", text: "Custom programs tailored to your objectives." },
];

const solutionCards = [
  {
    title: "Analytical testing",
    text: "Precision chemistry and assay development.",
    image: images.feature2,
  },
  {
    title: "Toxicology analysis",
    text: "Safety testing across complex compounds.",
    image: images.feature3,
  },
  {
    title: "Pharmaceutical testing",
    text: "Regulatory-ready data and reporting.",
    image: images.feature4,
  },
];

const faqItems = [
  "How quickly can we start a project?",
  "Do you provide custom research programs?",
  "Can we combine testing and product strategy?",
  "What does onboarding look like?",
];

const testimonials = [
  {
    quote:
      "Labrix helped us shorten our validation cycle by weeks while improving data quality.",
    name: "Ariana Blake",
    role: "VP Research, Helix Labs",
  },
  {
    quote:
      "Their team moved seamlessly from discovery to delivery with clear communication.",
    name: "Jonas Kent",
    role: "Director of Innovation, GreenCore",
  },
];

const blogPosts = [
  {
    title: "What it takes to ship safer diagnostics",
    date: "Feb 12, 2026",
    image: images.feature2,
  },
  {
    title: "Building data pipelines you can trust",
    date: "Jan 26, 2026",
    image: images.feature3,
  },
  {
    title: "Why lab partnerships need clarity early",
    date: "Jan 08, 2026",
    image: images.feature4,
  },
];

export default function Home() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-28 text-white md:grid-cols-2">
          {/* LEFT — Text */}
          <div>
            <p className="flex items-center gap-3 text-sm text-white/80">
              <span className="relative h-3 w-3">
                <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
                <span className="absolute inset-1 rounded-full bg-green-300" />
              </span>
              The Science Behind Smarter Solutions
            </p>

            <p className="mt-4 max-w-xl text-4xl md:text-6xl font-semibold leading-tight">
              Trusted Scientific Solutions for a Smarter, Safer World
            </p>

            <p className="mt-6 max-w-lg text-base md:text-lg text-white/80">
              With decades of experience and a future-focused mindset, we
              support clients with accurate testing, custom research, and expert
              consultation.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/services" className="btn-default">
                Get Started
              </Link>
              <Link href="/contact" className="btn-default btn-outline">
                Explore Our Services
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
              <CountUpOnView
                to={16}
                suffix="+"
                className="type-h2 font-semibold text-white"
              />
              <span>years ·</span>
              <CountUpOnView
                to={1200}
                suffix="+"
                className="type-h2 font-semibold text-white"
              />
              <span>clients</span>
            </div>
          </div>

          <a
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto w-full max-w-md"
          >
            {/* <Image
              src="/images/video-preview.jpg"
              width={500}
              height={500}
              alt=""
            /> */}

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 translate-x-0.5 fill-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </section>

      <Ticker />

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              Pioneering
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Pioneering scientific research to transform knowledge into
              real-world solutions
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--muted-color)]">
              Our multidisciplinary teams translate complex science into
              practical outcomes for healthcare, biotech, and environmental
              partners.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-color)] text-white text-xs font-semibold">
                5k+
              </span>
              <div>
                <p className="text-sm font-semibold">Industry collaborators</p>
                <p className="text-xs text-[var(--muted-color)]">
                  Across 18 global research hubs
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div
                  className="h-36 rounded-xl bg-slate-200 bg-cover"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <h3 className="mt-4 text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-xs text-[var(--muted-color)]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {researchCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className="h-40 rounded-2xl bg-slate-200 bg-cover"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-color)]">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-3xl bg-[var(--accent-color)] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--primary-color)]">
                Innovation
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--primary-color)]">
                Leading innovation across critical fields of research
              </h2>
              <p className="mt-4 text-sm md:text-base text-[var(--primary-color)] opacity-80">
                We focus on the highest-impact programs, delivering clarity,
                precision, and speed without compromising rigor.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[var(--primary-color)]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-xs font-semibold">
                  42
                </span>
                Active research programs
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {innovationCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl bg-white/90 p-5 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-[var(--primary-color)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--muted-color)]">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="relative overflow-hidden rounded-3xl bg-slate-100">
            <div
              className="h-72 bg-cover"
              style={{ backgroundImage: `url(${images.lab})` }}
            />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/85 px-4 py-2 text-xs font-semibold text-[var(--primary-color)]">
              Powered by technology driven scientific curiosity
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              Technology
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Intelligent tooling that keeps experiments repeatable
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--muted-color)]">
              Our labs blend automation and expert review to deliver reliable
              results. Every workflow is calibrated for accuracy and speed.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-[var(--muted-color)]">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Automated validation of multi-sample runs
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Dedicated quality leads embedded in every project
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Cross-functional reporting in clear, shared dashboards
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-3xl bg-[var(--primary-color)] p-8 md:p-12 text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                Transforming
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                Transforming scientific questions into real-world results
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/70">
                We align stakeholders, set measurable milestones, and keep teams
                moving with clear documentation and weekly reviews.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div>
                  <p className="text-2xl font-semibold text-white">24%</p>
                  Faster approvals
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">3.1x</p>
                  Data throughput
                </div>
              </div>
              <div className="mt-6">
                <Link href="/contact" className="btn-default btn-sm">
                  Start a project
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {solutionCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4"
                >
                  <h3 className="text-sm font-semibold">{card.title}</h3>
                  <p className="mt-2 text-xs text-white/70">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              Innovative solution
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Backed by scientific rigor
            </h2>
          </div>
          <Link href="/services" className="btn-default btn-sm">
            View services
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {solutionCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div
                className="h-40 rounded-2xl bg-slate-200 bg-cover"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-color)]">
                Research
              </p>
              <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-xs text-[var(--muted-color)]">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="py-10">
        <div className="section-shell">
          <div
            className="h-72 rounded-3xl bg-slate-200 bg-cover"
            style={{ backgroundImage: `url(${images.wide})` }}
          />
        </div>
      </section>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div
              className="h-56 rounded-2xl bg-slate-200 bg-cover"
              style={{ backgroundImage: `url(${images.sample})` }}
            />
            <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted-color)]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-color)] text-xs font-semibold text-white">
                12+
              </span>
              Years of validated protocols
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              From sample to solution
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              A trusted scientific partner from intake to delivery
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--muted-color)]">
              We keep the process transparent with shared dashboards, milestone
              check-ins, and clear next steps.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-[var(--muted-color)]">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Intake and study design in under one week
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Dedicated project manager for each engagement
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary-color)]" />
                Final report with recommendations and follow up
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-3xl bg-[var(--accent-color)] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--primary-color)]">
                Choose a plan
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[var(--primary-color)]">
                Pick a plan that fits your project scope
              </h2>
              <p className="mt-4 text-sm md:text-base text-[var(--primary-color)] opacity-80">
                Transparent pricing with clearly scoped deliverables. Upgrade or
                expand as your needs evolve.
              </p>
              <div className="mt-6">
                <Link href="/contact" className="btn-default btn-sm">
                  Compare plans
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/90 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-color)]">
                  Starter
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--primary-color)]">
                  $12,500
                </p>
                <p className="mt-2 text-xs text-[var(--muted-color)]">
                  Best for quick validation
                </p>
                <ul className="mt-4 space-y-2 text-xs text-[var(--muted-color)]">
                  <li>Single lab pathway</li>
                  <li>Weekly reports</li>
                  <li>Dedicated analyst</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/90 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-color)]">
                  Growth
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--primary-color)]">
                  $29,500
                </p>
                <p className="mt-2 text-xs text-[var(--muted-color)]">
                  Multi-phase engagements
                </p>
                <ul className="mt-4 space-y-2 text-xs text-[var(--muted-color)]">
                  <li>Multi lab workflows</li>
                  <li>Dedicated project lead</li>
                  <li>Executive reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              FAQs
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Browse our most asked questions
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--muted-color)]">
              We keep engagements transparent. If you need something more
              specific, reach out and we will tailor it.
            </p>
            <div className="mt-6">
              <Link href="/contact" className="btn-default btn-sm">
                Ask a question
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm"
              >
                <span>{item}</span>
                <span className="text-lg text-[var(--muted-color)]">+</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-3xl bg-[var(--primary-color)] p-8 md:p-12 text-white">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Testimonials
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              What our clients say about their experience with us
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl bg-white p-6 text-[var(--primary-color)]"
              >
                <p className="text-sm">{testimonial.quote}</p>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-color)]">
                  {testimonial.name}
                </div>
                <div className="text-xs text-[var(--muted-color)]">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              News
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Stay updated with the latest in science and innovation
            </h2>
          </div>
          <Link href="/blog" className="btn-default btn-sm">
            Read the blog
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div
                className="h-40 rounded-2xl bg-slate-200 bg-cover"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-color)]">
                {post.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-xs text-[var(--muted-color)]">
                Insights on lab operations, new research models, and partner
                workflows.
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
