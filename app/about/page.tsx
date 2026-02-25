import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Panel } from "@/components/ui/Panel";
import Button from "@/components/ui/Button";
import {
  aboutHero,
  aboutHighlight,
  aboutImages,
  aboutIntro,
  aboutMission,
  aboutStat,
  aboutStoryCards,
  aboutTestimonialsBlock,
  aboutTestimonials,
} from "@/data";
import GlassCard from "@/components/GlassCard";
import CountUpOnView from "@/components/CountUpOnView";

const Ping = () => (
  <span className="relative h-2.5 w-2.5">
    <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-green-300" />
  </span>
);
const Badge = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-black/50 px-4 py-1.5 text-sm">
    <Ping />
    {children}
  </p>
);

export default function About() {
  return (
    <PageTransition>
      <HeroBanner
        title={aboutHero.title}
        breadcrumb={aboutHero.breadcrumb}
        image={aboutHero.image}
      />
      <Ticker />

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <Badge>{aboutIntro.label}</Badge>
            <p className="mt-4 type-h2 md:text-4xl font-semibold">
              {aboutIntro.title}
            </p>
            <p className="mt-4 type-h6 md:text-base text-(--muted-color)">
              {aboutIntro.description}
            </p>
            <div className="mt-6">
              <Button
                href={aboutIntro.cta.href}
                label={aboutIntro.cta.label}
                size="sm"
              />
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-(--muted-description)">
              {aboutIntro.proof}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutStoryCards.map(({ image, title, text }, i) => (
              <GlassCard
                key={i}
                image={image}
                title={title}
                description={text}
                height="h-72"
                overlayOpacity="bg-black/20"
                contentPadding="p-4"
                hoverEffect="scale"
                className="border-none"
                titleClassName="type-h4 font-semibold text-white"
                descriptionClassName="type-h6 text-white/80"
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <Panel className="bg-(--accent-color)">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <Badge>{aboutMission.label}</Badge>
              <p className="mt-4 type-h3 font-semibold text-(--primary-color)">
                {aboutMission.title}
              </p>
              <p className="mt-4 type-h6 md:text-base text-(--primary-color) opacity-80">
                {aboutMission.description}
              </p>
              <div className="mt-6">
                <Button
                  href={aboutMission.cta.href}
                  label={aboutMission.cta.label}
                  size="sm"
                />
              </div>
            </div>
            <GlassCard
              image="/images/about-lab.png"
              height="h-96"
              overlayOpacity="bg-black/20"
              className="rounded-3xl border-none shadow-lg"
              hoverEffect="scale"
              imageClassName="object-cover"
            />
          </div>
        </Panel>
      </SectionWrapper>

      <SectionWrapper>
        <div className="space-y-8">
          <Badge>Performance Metrics</Badge>
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <GlassCard
              image={aboutStat.image}
              height="h-96"
              overlayOpacity="bg-gradient-to-t from-black/60 via-transparent to-transparent"
              className="rounded-3xl border-none"
            >
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl">
                  <CountUpOnView
                    to={parseFloat(aboutStat.value)}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                  />
                  <p className="text-sm text-white/80">{aboutStat.label}</p>
                </div>
              </div>
            </GlassCard>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                {aboutStat.description}
              </h2>
              <Panel className="bg-(--primary-color) text-white p-6 rounded-xl">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <CountUpOnView
                      to={parseFloat(aboutHighlight.value)}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                    />
                    <p className="text-white/70">{aboutHighlight.label}</p>
                  </div>
                  <p className="max-w-sm text-white/80 text-sm">
                    {aboutHighlight.description}
                  </p>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
