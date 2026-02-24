import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Panel } from "@/components/ui/Panel";

const heroImage = "https://picsum.photos/seed/labrix-contact-hero/1600/900";
const contactImage = "https://picsum.photos/seed/labrix-contact/900/700";

export default function Contact() {
  return (
    <PageTransition>
      <HeroBanner
        title="Contact us"
        breadcrumb="Home / Contact Us"
        image={heroImage}
      />
      <Ticker />

      <SectionWrapper>
        <Panel className="bg-[var(--accent-color)]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div className="rounded-3xl bg-white/90 p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
                Start a project
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-[var(--primary-color)]">
                Tell us about your next experiment
              </h2>
              <p className="mt-4 text-sm text-[var(--muted-color)]">
                Share your timeline, scope, and goals. We will follow up with a
                clear plan.
              </p>
              <div className="mt-6 grid gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Project summary"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none"
                />
              </div>
              <div className="mt-6">
                <button type="button" className="btn-default">
                  Send message
                </button>
              </div>
            </div>

            <div className="relative h-80 overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover"
                style={{ backgroundImage: `url(${contactImage})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/60 p-4 text-xs text-white">
                <div className="flex items-center justify-between">
                  <span>Mon - Fri</span>
                  <span>10:00AM - 07:00PM</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Saturday</span>
                  <span>12:00AM - 05:00PM</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]">
              Contact details
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Ready to connect with the team
            </h3>
            <p className="mt-4 text-sm text-[var(--muted-color)]">
              We respond within two business days and can schedule a discovery
              call quickly.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div>hello@labrix.studio</div>
              <div>San Diego + Remote</div>
              <div>+1 (555) 902-4480</div>
            </div>
          </div>
          <div className="h-80 rounded-3xl bg-[var(--primary-color)]" />
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
