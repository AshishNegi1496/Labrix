import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

export default function ComingSoonPage() {
  return (
    <PageTransition>
      <SectionWrapper className="pt-28 md:pt-36">
        <ScrollReveal className="mx-auto max-w-3xl rounded-3xl bg-(--primary-color) px-8 py-16 text-center text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Coming Soon
          </p>
          <h1 className="mt-4 type-h1 font-semibold text-white">
            This ClinRT module is on the way
          </h1>
          <p className="mt-4 text-white/80">
            We&apos;re actively building this capability. Contact us for early
            access updates and launch timelines.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" label="Contact Us" />
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
}
