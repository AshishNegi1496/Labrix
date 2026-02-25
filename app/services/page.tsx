import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Panel } from "@/components/ui/Panel";
import Button from "@/components/ui/Button";
import {
  servicesEngagement,
  servicesHero,
  servicesList,
  servicesPerformance,
  servicesStats,
} from "@/data";
import GlassCard from "@/components/GlassCard";
import CountUpOnView from "@/components/CountUpOnView";

const isNumeric = (v: string): boolean => /^\d+(\.\d+)?$/.test(v);

export default function Services() {
  return (
    <PageTransition>
      <HeroBanner
        title={servicesHero.title}
        breadcrumb={servicesHero.breadcrumb}
        image={servicesHero.image}
      />
      <Ticker />

      <SectionWrapper>
        <div className="grid gap-16 md:grid-cols-3">
          {servicesList.map(({ image, title, text }, i) => (
            <GlassCard
              key={i}
              image={image}
              title={title}
              description={text}
              height="h-80"
              overlayOpacity="bg-black/45"
              hoverEffect="scale"
              className="p-0"
              contentPadding="p-6"
              imageClassName="group-hover:scale-95 transition-transform duration-500"
              titleClassName="font-semibold type-h3"
              descriptionClassName="text-white/90 type-h6"
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <Panel className="bg-(--primary-color) text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                {servicesPerformance.label}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                {servicesPerformance.title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/70">
                {servicesPerformance.description}
              </p>
              <div className="mt-6">
                <Button
                  href={servicesPerformance.cta.href}
                  label={servicesPerformance.cta.label}
                  size="sm"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {servicesStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  {value === "24/7" ? (
                    <p className="type-h2 font-semibold text-white">{value}</p>
                  ) : (
                    <CountUpOnView
                      to={parseFloat(value)}
                      suffix=""
                      className="type-h2 font-semibold text-white"
                    />
                  )}
                  <p className="mt-2 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <GlassCard
          image="/images/one-team.png"
          height="h-auto"
          className="p-0 border-none"
          contentPadding="p-0"
          hoverEffect="none"
        >
          <div className="grid gap-0 lg:grid-cols-2 min-h-100">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="type-h2 uppercase tracking-[0.4em]">
                {servicesEngagement.label}
              </p>
              <p className="mt-4 type-h3 font-semibold">
                {servicesEngagement.title}
              </p>
              <p className="mt-4 type-h6 md:text-base">
                {servicesEngagement.description}
              </p>
            </div>
          </div>
        </GlassCard>
      </SectionWrapper>
    </PageTransition>
  );
}
