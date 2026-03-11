import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

const brochures = [
  "ClinRT Platform Overview 2026",
  "Clinical Execution Playbook",
  "Sponsor Collaboration Framework",
] as const;

const blogs = [
  {
    title: "How operational visibility changes trial outcomes",
    date: "March 2, 2026",
  },
  {
    title: "Designing better workflows for site teams",
    date: "February 21, 2026",
  },
  {
    title: "Reducing delays in cross-functional trial delivery",
    date: "February 14, 2026",
  },
] as const;

const caseStudies = [
  "Multi-country oncology operations acceleration",
  "End-to-end workflow redesign for rare disease study",
  "Compliance-first coordination model for late-phase trials",
] as const;

const webinars = [
  "Modern Clinical Operations: From Data to Decisions",
  "Implementation patterns for sponsor and CRO teams",
] as const;

const news = [
  "Event: ClinRT team at Global Clinical Tech Forum 2026",
  "Media: Featured in Clinical Innovation Review",
  "Announcement: New quality monitoring capabilities released",
] as const;

const moments = [
  { src: "/images/case-study-1.jpg", label: "Team workshop" },
  { src: "/images/case-study-2.jpg", label: "Client strategy day" },
  { src: "/images/case-study-3.jpg", label: "Product launch event" },
  { src: "/images/service-1.jpg", label: "Clinical operations summit" },
] as const;

export default function WhatsNewPage() {
  return (
    <PageTransition>
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/why-choose-image.jpg"
          alt="What's new at ClinRT"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 section-shell flex min-h-screen items-end py-20">
          <ScrollReveal className="max-w-3xl text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              What&apos;s New
            </p>
            <h1 className="mt-4 type-h1 font-semibold text-white">
              Latest updates from ClinRT
            </h1>
            <p className="mt-4 text-white/85">
              Discover fresh resources, practical insights, and real delivery
              stories from our teams and partners.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid gap-5 md:grid-cols-2">
          <ScrollReveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Brochures
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {brochures.map((item) => (
                <li key={item} className="rounded-xl bg-(--bg-page) p-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/contact" label="Request Brochure Pack" size="sm" />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Blogs
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {blogs.map((item) => (
                <li key={item.title} className="rounded-xl bg-(--bg-page) p-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-(--muted-color)">
                    {item.date}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper id="case-studies" fullBleed>
        <div className="mx-auto max-w-7xl rounded-3xl bg-(--color-secondary) px-6 py-14 text-white md:px-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Case Studies
            </p>
            <p className="mt-3 type-h2 font-semibold text-white">
              Delivery stories from active clinical programs
            </p>
          </ScrollReveal>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {caseStudies.map((item, index) => (
              <ScrollReveal key={item} delay={index * 90}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/85">
                  {item}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-5 md:grid-cols-2">
          <ScrollReveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              Webinars
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {webinars.map((item) => (
                <li key={item} className="rounded-xl bg-(--bg-page) p-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/contact" label="Get Webinar Invites" size="sm" />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
              News
            </p>
            <p className="mt-2 text-sm text-(--muted-color)">
              Events, media coverage, and product announcements.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {news.map((item) => (
                <li key={item} className="rounded-xl bg-(--bg-page) p-3">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.35em] text-(--muted-color)">
            Moments
          </p>
          <h2 className="mt-3 type-h2 font-semibold">Photos and videos</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moments.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 80}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="p-3 text-sm">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/videos/homePageVideo.mp4" className="link text-sm">
            Watch a recent ClinRT moment video
          </Link>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
