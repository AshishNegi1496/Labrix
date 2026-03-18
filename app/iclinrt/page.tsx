/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { FullScreenCard } from "@/hooks/FullScreenCard";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/GlassCard";
import GlassSlider from "@/components/GlassSlider";
import {
  FiActivity,
  FiBarChart2,
  FiCheck,
  FiCompass,
  FiCpu,
  FiEye,
  FiGitMerge,
  FiLayers,
  FiSettings,
  FiShield,
  FiShuffle,
  FiTruck,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { useActiveCard } from "@/hooks/useInView";
import StudyFlowSvg from "@/components/StudyFlowSvg";
const phases = [
  { title: "Study Planning", subtitle: "Study Inception Phase" },
  { title: "Study Design", subtitle: "Build Phase" },
  { title: "System Validation", subtitle: "Validation Phase" },
  { title: "Go Live & Support", subtitle: "Execution Phase" },
  { title: "Study Close", subtitle: "Closure Phase" },
];

const serviceMedia = [
  "/images/service1.png",
  "/images/service2.png",
  "/images/service3.png",
  "/images/service4.png",
  "/images/service5.png",
  "/images/service6.png",
  "/images/service-1.jpg",
] as const;

const potentialMedia = [
  "/images/case-study-1.jpg",
  "/images/case-study-2.jpg",
  "/images/case-study-3.jpg",
  "/images/service-1.jpg",
  "/images/about-lab.png",
  "/images/why-choose-image.jpg",
] as const;

const howItWorksMedia = [
  "/images/service-1.jpg",
  "/images/about-lab.png",
  "/images/why-choose-image.jpg",
  "/images/case-study-2.jpg",
] as const;

const howItWorksIcons = [FiCpu, FiShuffle, FiTruck, FiBarChart2] as const;

const uspIcons = [
  FiZap,
  FiUsers,
  FiTruck,
  FiShield,
  FiGitMerge,
  FiActivity,
  FiSettings,
] as const;

const iclinrtServices = [
  {
    title: "Subject Management",
    items: [
      "Supports screening, enrollment, and subject status updates in real time.",
      "Guides sites through protocol-aligned visit workflows (scheduled or unscheduled).",
      "Applies guardrails to reduce deviations and data entry errors.",
      "Provides clear subject timelines (visit due, completed, missed, rescheduled).",
      "Maintains an audit trail for all subject actions.",
    ],
  },
  {
    title: "Subject Randomization and Treatment Assignment",
    items: [
      "Executes unbiased, protocol-aligned allocation across arms, cohorts, and strata.",
      "Preserves blinding integrity and supports emergency unblinding with full logs.",
      "Handles complex designs (block, stratified, cohort expansion) without delays.",
      "Links treatment assignment to visit dosing for operational consistency.",
      "Captures allocation decisions with time and user stamps for inspection readiness.",
    ],
  },
  {
    title: "Kit Management and Assignment",
    items: [
      "Tracks kit creation, status, and location (depot to site to subject).",
      "Matches the right kit to the right subject and visit per protocol.",
      "Uses barcode verification to prevent dispensing errors.",
      "Supports returns, quarantines, replacements, and status changes.",
      "Maintains full traceability for accountability and audits.",
    ],
  },
  {
    title: "Triggers and Auto Shipments",
    items: [
      "Predicts site-level demand using enrollment, dosing cadence, and historical use.",
      "Auto-generates resupply shipments based on predefined buffer rules and thresholds.",
      "Minimizes stock-outs and urgent shipments through proactive planning.",
      "Adjusts to changes in recruitment or dosing with dynamic trigger logic.",
      "Provides shipment visibility (created, dispatched, received, reconciled).",
    ],
  },
  {
    title: "Kit Expiry Date Management",
    items: [
      "Monitors expiry per kit or lot and flags early warning windows.",
      "Supports safe dispense rules (do not assign within X days of expiry).",
      "Guides redistribution and replacement to reduce wastage.",
      "Captures expiry-related actions (quarantine, destroy) with documentation.",
      "Surfaces site-level views of usable vs near-expiry inventory.",
    ],
  },
  {
    title: "Drug and Supply Management",
    items: [
      "Provides end-to-end IMP oversight from packaging to final disposition.",
      "Maintains chain-of-custody across depots, couriers, sites, and subjects.",
      "Supports temperature mapping for cold-chain products and records excursion reviews.",
      "Manages retention samples with custody and location tracking.",
      "Offers planning and reconciliation views for supply teams (by region, site, lot).",
    ],
  },
  {
    title: "Site-Level Inventory Management",
    items: [
      "Shows real-time on-hand inventory by kit, lot, and status at each site.",
      "Highlights reserved, quarantined, and near-expiry stock for quick action.",
      "Enables site-to-site transfers with traceable approvals and receipts.",
      "Reduces manual logs with automatic updates from dispensing and returns.",
      "Aligns inventory readiness with upcoming visit schedules.",
    ],
  },
] as const;

const regulatoryStandards = [
  { label: "ICH GCP", abbr: "ICH" },
  { label: "FDA 21 CFR Part 11", abbr: "FDA" },
  { label: "GAMP 5", abbr: "GAMP" },
  { label: "GXP", abbr: "GXP" },
  { label: "HIPAA", abbr: "HIPAA" },
  { label: "GDPR", abbr: "GDPR" },
  { label: "CDSCO", abbr: "CDSCO" },
  { label: "MedRA", abbr: "MED" },
  { label: "CDISC", abbr: "CDISC" },
  { label: "EU Annex 11", abbr: "EU" },
] as const;

const iclinrtPotential = [
  {
    title: "Management of every Subject",
    items: [
      "Supports screening, enrollment, and visit flow.",
      "Ensures sites follow protocol-aligned steps.",
      "Keeps subject status clear and organized.",
    ],
  },
  {
    title: "Fair Treatment Assignments",
    items: [
      "Assigns subjects to arms without bias.",
      "Handles cohorts, stratification, and multi-arm setups.",
      "Protects allocation integrity.",
    ],
  },
  {
    title: "Supply That Thinks Ahead",
    items: [
      "Tracks inventory at depots and sites.",
      "Predicts supply needs and auto-triggers shipments.",
      "Helps prevent shortages and reduce wastage.",
    ],
  },
  {
    title: "Smart Kit Assignment",
    items: [
      "Ensures the correct physical kit is given to the right participant.",
      "Checks kit status (available, reserved, expired, returned).",
      "Uses barcode scanning for quick, error-free verification.",
      "Matches kits to visit schedules in real time.",
      "Minimizes dispensing mistakes at sites.",
    ],
  },
  {
    title: "Safety First - Expiry Under Control",
    items: [
      "Monitors expiry dates continuously.",
      "Alerts teams before a kit expires.",
      "Ensures expired kits are never used.",
    ],
  },
  {
    title: "Kit Lifecycle Tracking",
    items: [
      "Tracks each kit from creation to destruction.",
      "Logs dispensing, returns, and reconciliation.",
      "Maintains inspection-ready records.",
    ],
  },
  {
    title: "Barcode-Enabled Tracking",
    items: [
      "Supports barcode scanning at sites and depots.",
      "Reduces manual errors in kit selection and handling.",
      "Speeds up dispensing, returns, and accountability workflows.",
    ],
  },
  {
    title: "Controlled Unblinding - For True Emergencies Only",
    items: [
      "Secure unblinding for medical emergencies.",
      "Logs every action for audit trails.",
      "Protects trial integrity.",
    ],
  },
  {
    title: "Reports and Dashboards for Complete Visibility",
    items: [
      "Real-time view of enrollment, supply, and visits.",
      "Role-based filters for sponsors, CROs, sites, and depots.",
      "Supports faster, more confident decisions.",
    ],
  },
  {
    title: "Stay Ahead with Notifications and Alerts",
    items: [
      "Alerts for supply risk, expiries, shipments, or key events.",
      "Helps teams act early and avoid delays.",
      "Keeps stakeholders aligned.",
    ],
  },
  {
    title: "24x7 Expert Assisted Support",
    items: [
      "Dedicated helpdesk for sites and study teams.",
      "Technical and workflow assistance.",
      "Ensures smooth daily operations.",
    ],
  },
  {
    title: "Quick Site-to-Site Transfers",
    items: [
      "Enables safe, traceable transfers of study drug kits between sites.",
      "Helps manage fast enrollment or local shortages.",
      "Maintains complete visibility during movement.",
    ],
  },
  {
    title: "Cold-Chain and Excursion Handling",
    items: [
      "Tracks temperature-sensitive kits.",
      "Flags excursions for review.",
      "Supports usability decisions and compliance.",
    ],
  },
  {
    title: "Retention Sample Management",
    items: [
      "Manages long-term storage samples.",
      "Tracks movement and location.",
      "Supports regulatory and scientific needs.",
    ],
  },
  {
    title: "Study Startup and Go-Live Setup",
    items: [
      "Configuration, testing, validation, and training.",
      "Ensures readiness before first-patient-in.",
      "Smooth transition into conduct.",
    ],
  },
] as const;

const howItWorksLayers = [
  {
    title: "Protocol Intelligence",
    text: "Encode study logic, eligibility, and treatment rules into a single source of truth.",
  },
  {
    title: "Workflow Orchestration",
    text: "Coordinate subject visits, randomization, and site actions with protocol-aligned guardrails.",
  },
  {
    title: "Supply and Inventory Engine",
    text: "Automate kit movement, expiry management, and resupply triggers across depots and sites.",
  },
  {
    title: "Insights and Compliance",
    text: "Deliver real-time dashboards, audit trails, and inspection-ready documentation.",
  },
] as const;

const studyTypes = [
  "Oncology",
  "Rare Diseases",
  "Biologics",
  "Vaccine Trials",
  "Medical Device Trials",
  "Early to Late Phase Studies",
  "Many More Complex Trials",
] as const;

const iclinrtUsps = [
  {
    title: "Fast 4-Week Setup",
    items: [
      "Rapid configuration and validation to support First Patient In timelines.",
      "Handles multi-arm, cohort-based, and stratified designs without delay.",
      "Streamlined user acceptance testing and protocol-aligned setup.",
    ],
  },
  {
    title: "Deep Industry Expertise",
    items: [
      "Led by teams experienced in IRT and clinical trial supply management.",
      "Strong understanding of real clinical workflows across phases and therapeutic areas.",
      "Practical guidance that supports sites, CROs, and Sponsors.",
    ],
  },
  {
    title: "Smarter Supply Management",
    items: [
      "Predicts supply requirements based on enrollment trends and dosing schedules.",
      "Ensures stable IMP inventory across depots and sites.",
      "Supports site-to-site kit transfers, retention sample management, and cold-chain needs.",
    ],
  },
  {
    title: "Compliance Built-In",
    items: [
      "Aligned with ICH-GCP, 21 CFR Part 11, EU Annex 11, GDPR, and HIPAA.",
      "Features complete audit trails, electronic signatures, and validated workflows.",
      "Ensures records meet ALCOA+ principles for data integrity.",
    ],
  },
  {
    title: "Seamless System Integrations",
    items: [
      "Connects with CTMS and EDC platforms.",
      "Reduces manual reconciliation and improves data consistency.",
      "Supports unified oversight similar to leading integrated platforms.",
    ],
  },
  {
    title: "Designed for Users",
    items: [
      "Clear, real-time dashboards for enrollment, visits, supply, and site performance.",
      "Simple, protocol-aligned workflows minimize site burden.",
      "Supported by a responsive helpdesk for operational and technical queries.",
    ],
  },
  {
    title: "Flexible, Scalable, User-Friendly",
    items: [
      "Adapts to early-phase, late-phase, and global multi-region studies.",
      "Easily accommodates mid-study protocol amendments.",
      "Remains intuitive and reliable as study scope grows.",
    ],
  },
] as const;

const problemSolutions = [
  {
    problem: "Imbalanced treatment arms in complex designs",
    solution:
      "Protocol-aligned randomization across arms, cohorts, and strata.",
  },
  {
    problem: "Site stock-outs or over-stock",
    solution: "Predictive resupply and automated depot-to-site shipments.",
  },
  {
    problem: "Dispensing errors at the site",
    solution: "Barcode-verified kit assignment at the right visit.",
  },
  {
    problem: "Poor visibility of kit status and movement",
    solution:
      "End-to-end kit traceability from creation to dispense, return, reconcile, and destroy.",
  },
  {
    problem: "Cold-chain uncertainty during storage or transport",
    solution: "Temperature mapping to record, review, and document integrity.",
  },
  {
    problem: "Kits nearing expiry and late action",
    solution: "Expiry tracking with early alerts and replacement guidance.",
  },
  {
    problem: "Retention samples missed or mishandled",
    solution: "Retention sample tracking with clear custody and status.",
  },
  {
    problem: "Inconsistent visit execution across sites",
    solution: "Protocol-driven subject and visit workflows.",
  },
  {
    problem: "Limited real-time oversight for sponsors and CROs",
    solution: "Live dashboards, configurable reports, and event-based alerts.",
  },
  {
    problem: "Operational disruption after protocol amendments",
    solution:
      "Amendment-friendly configuration that updates logic without derailing sites.",
  },
  {
    problem: "Audit and inspection readiness concerns",
    solution:
      "Audit trails, role-based access, e-signatures, and ALCOA+ records.",
  },
  {
    problem: "Multi-country coordination challenges",
    solution:
      "Unified oversight across regions, depots, and sites in one system.",
  },
  {
    problem: "Slow issue resolution at sites",
    solution: "Responsive helpdesk and study support for operational queries.",
  },
  {
    problem: "Data duplication across systems",
    solution:
      "Seamless integrations with CTMS, EDC, and other eClinical platforms.",
  },
] as const;

const Ping = () => (
  <span className="relative h-2.5 w-2.5">
    <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-orange-500" />
  </span>
);
const Badge = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-4 py-1.5 text-sm">
    <Ping />
    {children}
  </p>
);

// IclinrtUspsSection.tsx

type StickyCardsProps = {
  iclinrtUsps: typeof iclinrtUsps;
  sectionRef: RefObject<HTMLDivElement | null>;
};

const StickyCards = ({ iclinrtUsps, sectionRef }: StickyCardsProps) => {
  const activeIndex = useActiveCard(iclinrtUsps.length, sectionRef);

  return (
    <div className="sticky top-0 h-screen overflow-hidden">
      {iclinrtUsps.map((item: any, index: number) => {
        const Icon = uspIcons[index % uspIcons.length] || FiZap;

        return (
          <FullScreenCard
            key={item.title}
            item={item}
            index={index}
            activeIndex={activeIndex}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
};

function IclinrtMedia({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative h-full min-h-80 overflow-hidden rounded-3xl border border-slate-200 bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/homePageVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-56 w-56">
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.2),rgba(0,0,0,0))]" />
          <motion.span
            className="absolute inset-0 rounded-full border border-white/25 border-dashed"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 46, repeat: Infinity, ease: "linear" }
            }
          />
          <motion.span
            className="absolute inset-3 rounded-full bg-[conic-gradient(from_90deg,rgba(255,255,255,0)_0deg,rgba(255,255,255,0.55)_45deg,rgba(255,153,51,0.95)_90deg,rgba(255,255,255,0)_160deg)]"
            style={{
              WebkitMask:
                "radial-gradient(transparent 58%, #000 60%, #000 63%, transparent 65%)",
              mask: "radial-gradient(transparent 58%, #000 60%, #000 63%, transparent 65%)",
            }}
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 28, repeat: Infinity, ease: "linear" }
            }
          />
          <motion.span
            className="absolute inset-8 rounded-full bg-[conic-gradient(from_220deg,rgba(255,255,255,0)_0deg,rgba(255,255,255,0.35)_30deg,rgba(255,153,51,0.75)_60deg,rgba(255,255,255,0)_120deg)]"
            style={{
              WebkitMask:
                "radial-gradient(transparent 60%, #000 62%, #000 64%, transparent 66%)",
              mask: "radial-gradient(transparent 60%, #000 62%, #000 64%, transparent 66%)",
            }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 18, repeat: Infinity, ease: "linear" }
            }
          />
          <motion.span
            className="absolute inset-10 rounded-full border border-white/15"
            animate={
              reduceMotion ? undefined : { scale: [1, 1.18], opacity: [0.5, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.8, repeat: Infinity, ease: "easeOut" }
            }
          />
          <motion.span
            className="absolute inset-12 rounded-full border border-(--color-orange)/35"
            animate={
              reduceMotion ? undefined : { scale: [1, 1.3], opacity: [0.5, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.6,
                  }
            }
          />
          <motion.div
            className="absolute inset-2"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 20, repeat: Infinity, ease: "linear" }
            }
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-(--color-orange) shadow-[0_0_16px_rgba(255,153,51,0.8)]" />
          </motion.div>
          <motion.div
            className="absolute inset-10"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 14, repeat: Infinity, ease: "linear" }
            }
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </motion.div>
          <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,153,51,0.6),rgba(0,0,0,0))]" />
        </div>
      </div>
      <div className="absolute left-6 top-6 rounded-full bg-white/15 px-3 py-1 type-h6 font-semibold text-white">
        Protocol Logic
      </div>
      <div className="absolute right-6 top-14 rounded-full bg-white/15 px-3 py-1 type-h6 font-semibold text-white">
        Treatment Flow
      </div>
      <div className="absolute bottom-8 left-6 rounded-full bg-white/15 px-3 py-1 type-h6 font-semibold text-white">
        Supply Engine
      </div>
      <div className="absolute bottom-6 right-6 rounded-full bg-white/15 px-3 py-1 type-h6 font-semibold text-white">
        Live Insights
      </div>
    </div>
  );
}

export default function IclinrtPage() {
  const reduceMotion = useReducedMotion();
  const uspsSectionRef = useRef<HTMLDivElement | null>(null);
  const regulatoryTrack = [...regulatoryStandards, ...regulatoryStandards];
  const problemTrack = [...problemSolutions, ...problemSolutions];
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null,
  );
  const [activePotentialIndex, setActivePotentialIndex] = useState<
    number | null
  >(null);

  const activeService =
    activeServiceIndex !== null ? iclinrtServices[activeServiceIndex] : null;
  const activeServiceMedia =
    activeServiceIndex !== null
      ? serviceMedia[activeServiceIndex % serviceMedia.length]
      : null;
  const activePotential =
    activePotentialIndex !== null
      ? iclinrtPotential[activePotentialIndex]
      : null;
  const activePotentialMedia =
    activePotentialIndex !== null
      ? potentialMedia[activePotentialIndex % potentialMedia.length]
      : null;

  useEffect(() => {
    if (activeServiceIndex === null && activePotentialIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveServiceIndex(null);
        setActivePotentialIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeServiceIndex, activePotentialIndex]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (activeServiceIndex !== null || activePotentialIndex !== null) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeServiceIndex, activePotentialIndex]);
  return (
    <PageTransition>
      <section className="relative min-h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homePageVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/45 to-black/70" />
        <div className="relative z-10 section-shell flex min-h-[70vh] flex-col justify-center gap-8 px-6 py-20 md:px-10">
          <ScrollReveal className="max-w-3xl text-white">
            <Badge>iClinRT</Badge>
            <p className="mt-4 type-h2 font-semibold text-white">
              Configuration That Matters
            </p>
            <p className="mt-4 text-white/85">
              Your Trial&apos;s Operational Control Center.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                href="/contact"
                label="See it in action - request a demo"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper
        id="iclinrt-overview"
        fullBleed
        className="bg-(--color-primary)"
      >
        <div className="mx-auto rounded-3xl bg-white px-6 py-14 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <ScrollReveal>
              <Badge>What is iClinRT</Badge>
              <p className="mt-3 type-h2 font-semibold">
                Your Trial&apos;s Operational Control Center.
              </p>

              <p className="mt-3 type-h6 text-(--muted-color)">
                iClinRT is ClinRT&apos;s dynamic, fully configurable Interactive
                Response Technology platform designed to streamline and
                safeguard clinical trial execution across the globe. It serves
                as the central coordination engine that connects subject
                workflows, treatment allocation logic, supply movement, site
                actions, and real-time insights ensuring your trial runs exactly
                as designed.
              </p>
              <p className="mt-3 text-sm text-(--muted-color)">
                It understands your protocol, adapts to study complexity, and
                ensures each operational step is executed with precision,
                visibility, and compliance.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/contact" label="Contact Us" />
              </div>
              <Link className="link text-sm" href="/contact">
                Your Trial&apos;s Operational Control Center.
              </Link>

              <Link className="link text-sm" href="/">
                {" "}
                Discover What Sets Us Apart
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <IclinrtMedia reduceMotion={!!reduceMotion} />
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <LayoutGroup id="iclinrt-services">
          <GlassSlider
            ariaLabel="iClinRT services slider"
            header={
              <ScrollReveal>
                <Badge>Services iClinRT Delivers</Badge>
                <h2 className="mt-3 type-h2 font-semibold">
                  Operational depth for every subject and kit movement
                </h2>
              </ScrollReveal>
            }
            items={iclinrtServices}
            renderItem={(service, index) => (
              <ScrollReveal delay={index * 80}>
                <motion.div
                  layoutId={`service-card-${index}`}
                  className="group relative"
                >
                  {/* BACKDROP DIM (modal feel) */}
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-black/0 backdrop-blur-0 transition-all duration-500 group-hover:bg-black/40 group-hover:backdrop-blur-sm" />

                  <GlassCard
                    image={serviceMedia[index % serviceMedia.length]}
                    height="h-92 lg:h-102"
                    contentPadding="p-6"
                    overlayOpacity="bg-gradient-to-b from-black/30 via-black/60 to-black/90"
                    borderColor="border-white/20"
                    className="
          relative z-10
          min-w-62.5 sm:min-w-75 lg:min-w-85
          bg-white/10 backdrop-blur-2xl shadow-lg cursor-pointer

          transition-all duration-500 ease-out
          group-hover:scale-105
          group-hover:-translate-y-4
          group-hover:z-20
          group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]
        "
                    imageClassName="
          duration-700 ease-out
          group-hover:scale-110
          group-hover:-translate-y-3
        "
                    contentClassName="transition-all duration-500"
                    tabIndex={0}
                    role="button"
                    aria-haspopup="dialog"
                    aria-expanded={activeServiceIndex === index}
                    onClick={() => setActiveServiceIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveServiceIndex(index);
                      }
                    }}
                  >
                    {/* HEADER */}
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <span>{`Service ${String(index + 1).padStart(2, "0")}`}</span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        iClinRT
                      </span>
                    </div>

                    {/* TITLE */}
                    <p className="mt-3 type-h4 font-semibold text-white">
                      {service.title}
                    </p>

                    {/* LOADING SKELETON (fade out) */}
                    <div className="mt-4 space-y-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-white/25 animate-pulse" />
                      <div className="h-2 w-1/2 rounded-full bg-white/15 animate-pulse [animation-delay:200ms]" />
                    </div>

                    {/* EXPANDED CONTENT */}
                    <div
                      className="
          mt-4
          max-h-0 opacity-0 overflow-hidden

          transition-all duration-500 ease-out

          group-hover:max-h-60
          group-hover:opacity-100
          group-hover:translate-y-0
        "
                    >
                      <ul className="space-y-2 text-sm text-white/90">
                        {service.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* GLOW RING (premium effect) */}
                    <div
                      className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0 
          transition-opacity duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_center,rgba(131,133,188,0.25),transparent_70%)]
        "
                    />
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            )}
          />
          <AnimatePresence>
            {activeService && activeServiceMedia && (
              <motion.div
                className="fixed inset-0 z-60 flex items-center justify-center px-4 py-8 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setActiveServiceIndex(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  layoutId={`service-card-${activeServiceIndex}`}
                  className="relative z-10 w-full max-w-5xl"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 160, damping: 22 }
                  }
                  onClick={(event) => event.stopPropagation()}
                >
                  <GlassCard
                    image={activeServiceMedia}
                    height="min-h-[70vh] md:min-h-[75vh]"
                    contentPadding="p-6 sm:p-8 md:p-10"
                    contentPosition="top"
                    overlayOpacity="bg-gradient-to-b from-black/40 via-black/70 to-black/95"
                    borderColor="border-white/20"
                    hoverEffect="none"
                    className="bg-white/10 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.6)]"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveServiceIndex(null)}
                      className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20"
                      aria-label="Close modal"
                    >
                      X
                    </button>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <span>
                        {`Service ${String((activeServiceIndex ?? 0) + 1).padStart(2, "0")}`}
                      </span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        iClinRT
                      </span>
                    </div>
                    <p className="mt-3 type-h2 font-semibold text-white">
                      {activeService.title}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Full operational detail and protocol-ready execution for
                      your clinical teams.
                    </p>
                    <div className="mt-6 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                      <ul className="space-y-3 type-h4 text-white/90">
                        {activeService.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-white/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href="/contact" label="Talk to ClinRT" />
                      <Button href="/what-we-build" label="See What We Build" />
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="mx-auto rounded-3xl bg-(--primary-color) px-6 py-14 text-white md:px-10">
          <ScrollReveal>
            <Badge>Global Compliance</Badge>
            <p className="mt-3 type-h2 font-semibold text-white">
              Built to meet global regulatory and data-integrity requirements
            </p>
          </ScrollReveal>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/5">
            <div className="flex w-max animate-[ticker_30s_linear_infinite] items-center gap-4 px-6 py-5">
              {regulatoryTrack.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/90"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-[10px] font-semibold">
                    {item.abbr}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="iclinrt-potential">
        <LayoutGroup id="iclinrt-potential">
          <GlassSlider
            ariaLabel="iClinRT potential slider"
            header={
              <ScrollReveal>
                <Badge>iClinRT&apos;s Potential</Badge>
                <h2 className="mt-3 type-h2 font-semibold">
                  Features that unlock clarity, control, and speed
                </h2>
              </ScrollReveal>
            }
            items={iclinrtPotential}
            renderItem={(item, index) => (
              <ScrollReveal delay={index * 60}>
                <motion.div
                  layoutId={`potential-card-${index}`}
                  className="group relative"
                >
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-black/0 backdrop-blur-0 transition-all duration-500 group-hover:bg-black/40 group-hover:backdrop-blur-sm" />
                  <GlassCard
                    image={potentialMedia[index % potentialMedia.length]}
                    height="h-72 lg:h-80"
                    contentPadding="p-6"
                    overlayOpacity="bg-gradient-to-b from-black/30 via-black/60 to-black/85"
                    hoverEffect="glow"
                    borderColor="border-white/20"
                    glowColor="bg-[rgba(201,247,229,0.35)]"
                    className="min-w-[250px] sm:min-w-[300px] lg:min-w-[340px] bg-white/10 backdrop-blur-2xl shadow-lg transition duration-300 group-hover:-translate-y-3 group-hover:scale-[1.04] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] cursor-pointer"
                    imageClassName="duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                    contentClassName="transition-transform duration-500 group-hover:-translate-y-1"
                    tabIndex={0}
                    role="button"
                    aria-haspopup="dialog"
                    aria-expanded={activePotentialIndex === index}
                    onClick={() => setActivePotentialIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActivePotentialIndex(index);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <span>{`Potential ${String(index + 1).padStart(2, "0")}`}</span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        iClinRT
                      </span>
                    </div>
                    <p className="mt-3 type-h5 font-semibold text-white">
                      {item.title}
                    </p>
                    <div className="mt-4 space-y-2 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                      <div className="h-2 w-3/4 rounded-full bg-white/25 animate-pulse" />
                      <div className="h-2 w-1/2 rounded-full bg-white/15 animate-pulse [animation-delay:200ms]" />
                    </div>
                    <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-48 group-hover:opacity-100 group-focus-within:max-h-48 group-focus-within:opacity-100">
                      <ul className="space-y-1 text-xs text-white/85">
                        {item.items.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            )}
          />

          <AnimatePresence>
            {activePotential && activePotentialMedia && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setActivePotentialIndex(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  layoutId={`potential-card-${activePotentialIndex}`}
                  className="relative z-10 w-full max-w-5xl"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 160, damping: 22 }
                  }
                  onClick={(event) => event.stopPropagation()}
                >
                  <GlassCard
                    image={activePotentialMedia}
                    height="min-h-[70vh] md:min-h-[75vh]"
                    contentPadding="p-6 sm:p-8 md:p-10"
                    contentPosition="top"
                    overlayOpacity="bg-gradient-to-b from-black/40 via-black/70 to-black/95"
                    borderColor="border-white/20"
                    hoverEffect="none"
                    className="bg-white/10 backdrop-blur-2xl shadow-[0_35px_120px_rgba(0,0,0,0.6)]"
                  >
                    <button
                      type="button"
                      onClick={() => setActivePotentialIndex(null)}
                      className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20"
                      aria-label="Close modal"
                    >
                      X
                    </button>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
                      <span>{`Potential ${String((activePotentialIndex ?? 0) + 1).padStart(2, "0")}`}</span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        iClinRT
                      </span>
                    </div>
                    <p className="mt-3 type-h2 font-semibold text-white">
                      {activePotential.title}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Built to deliver clarity, control, and speed across every
                      operational layer.
                    </p>
                    <div className="mt-6 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                      <ul className="space-y-3 text-sm text-white/90">
                        {activePotential.items.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-white/70" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href="/contact" label="Request a Demo" />
                      <Button
                        href="/what-we-build"
                        label="Explore Capabilities"
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
        <div className="mt-10">
          <Link href="/coming-soon" className="link text-sm">
            View factsheets
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-10 border shadow-xl">
          <Badge>How it works</Badge>
          <StudyFlowSvg />
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <ScrollReveal delay={120}>
          <div className="mt-6">
            <Badge>
              <span className="inline-flex items-center gap-2">
                Study Types We Support
              </span>
            </Badge>
            <p className="mt-3 type-h4 font-semibold">
              Built for complex programs across phases and regions
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {studyTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/40 bg-white/70 px-4 py-2 text-sm shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm backdrop-blur">
              <p className="text-sm text-(--muted-color)">
                iClinRT supports early to late phase studies, adaptive designs,
                and global programs that require precision supply, protocol
                control, and inspection-ready documentation.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper id="iclinrt-usps">
        {/* <div className="relative bg-(--primary-color) text-white"> */}
        <div
          ref={uspsSectionRef}
          className="relative"
          style={{ height: `${iclinrtUsps.length * 100}vh` }}
        >
          <StickyCards iclinrtUsps={iclinrtUsps} sectionRef={uspsSectionRef} />
          {/* </div> */}
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-white/40 bg-white/70 px-6 py-14 shadow-xl backdrop-blur-2xl md:px-10">
          <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-(--color-accent)/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-6 h-64 w-64 rounded-full bg-(--color-orange)/25 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ScrollReveal>
              <Badge>
                <span className="inline-flex items-center gap-2">
                  Problem to Solution
                </span>
              </Badge>
              <p className="mt-3 type-h2 font-semibold">
                Solve operational bottlenecks with iClinRT
              </p>
              <p className="mt-4 text-(--muted-color)">
                Each real-world problem is matched to a concrete operational
                solution, rolling continuously for quick scanning.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/contact" label="Talk to the ClinRT team" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="relative h-120 overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/80 via-white/40 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/80 via-white/40 to-transparent" />

                <motion.div
                  className="space-y-4 pr-1"
                  animate={reduceMotion ? undefined : { y: ["0%", "-50%"] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 40, repeat: Infinity, ease: "linear" }
                  }
                >
                  {problemTrack.map((item, index) => (
                    <div
                      key={`${item.problem}-${index}`}
                      className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-(--color-accent)/25 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-(--color-orange)/20 blur-2xl" />
                      </div>
                      <div className="relative z-10 flex items-start gap-3">
                        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-(--color-orange)/30 bg-(--color-orange)/10 text-(--color-orange)">
                          <FiActivity className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-(--muted-color)">
                            Problem
                          </p>
                          <p className="mt-1 text-sm font-semibold text-(--primary-color)">
                            {item.problem}
                          </p>
                          <div className="mt-3 flex items-start gap-2 text-sm text-(--muted-color)">
                            <FiCheck className="mt-0.5 h-4 w-4 text-(--color-accent)" />
                            <span>{item.solution}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper fullBleed>
        <div className="relative mx-auto overflow-hidden rounded-3xl border border-white/25 bg-(--color-primary) px-6 py-14 text-white shadow-2xl md:px-10">
          <div className="pointer-events-none absolute -left-16 top-6 h-56 w-56 rounded-full bg-(--color-accent)/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-(--color-orange)/30 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ScrollReveal>
              <Badge>
                <span className="inline-flex items-center gap-2">
                  Ready to See iClinRT
                </span>
              </Badge>
              <p className="mt-3 type-h2 font-semibold text-(--text-invert)">
                Bring operational clarity to every trial milestone
              </p>
              <p className="mt-4 max-w-2xl text-(--text-invert)">
                Connect your teams, sites, and supply workflows with a platform
                designed for protocol fidelity, compliance, and real-time
                insight.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href="/contact" label="Request iClinRT Demo" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-2xl">
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60">
                  <video
                    className="h-64 w-full object-cover"
                    src="/videos/homePageVideo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <motion.div
                    className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur"
                    animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    Live Q&amp;A
                  </motion.div>
                  <motion.div
                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur"
                    animate={
                      reduceMotion
                        ? undefined
                        : { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs text-white/85">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <FiActivity className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                        Question
                      </p>
                      <p className="mt-1">
                        How fast can we go live with iClinRT?
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs text-white/85"
                    animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <FiCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                        Answer
                      </p>
                      <p className="mt-1">
                        Most programs are configured and validated in about four
                        weeks.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
