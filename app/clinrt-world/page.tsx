"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  useDeferredValue,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiBookOpen,
  FiCamera,
  FiFileText,
  FiLayers,
  FiMonitor,
  FiRadio,
  FiSearch,
} from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const tabs = [
  "News",
  "Webinars",
  "Moments",
  "Case Studies",
  "Blogs",
  "Brochures",
] as const;

const INITIAL_VISIBLE = 6;

type Tab = (typeof tabs)[number];

type ResourceItem = {
  title: string;
  summary: string;
  eyebrow: string;
  meta: string;
  image?: string;
  featured?: boolean;
};

type TabContent = {
  title: string;
  description: string;
  icon: IconType;
  cta?: {
    href: string;
    label: string;
  };
  items: readonly ResourceItem[];
};

const contentByTab: Record<Tab, TabContent> = {
  News: {
    title: "Latest News",
    description:
      "Product releases, milestones, and industry activity collected in one modern feed.",
    icon: FiRadio,
    items: [
      {
        eyebrow: "Event",
        title: "ClinRT at Global Clinical Tech Forum 2026",
        summary:
          "Highlights from our presence, conversations with operations leaders, and what teams asked for most.",
        meta: "Conference update",
        featured: true,
      },
      {
        eyebrow: "Media",
        title: "Featured in Clinical Innovation Review",
        summary:
          "A closer look at how modern operational design is reshaping trial delivery across regions.",
        meta: "Press coverage",
      },
      {
        eyebrow: "Release",
        title: "New monitoring capabilities now available",
        summary:
          "Expanded live oversight and faster issue visibility for teams managing complex execution.",
        meta: "Product release",
      },
      {
        eyebrow: "Update",
        title: "Operational dashboard refresh for sponsor teams",
        summary:
          "Sharper summaries, cleaner trend views, and faster access to day-to-day study signals.",
        meta: "Platform update",
      },
      {
        eyebrow: "xyz",
        title: "r sponsor teams",
        summary:
          "Sharper summaries, asdas fasfascleaner trend views, and faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platform update xyz",
      },
      {
        eyebrow: "xyawerwfasz",
        title: "r spdasdonsor wrer",
        summary:
          "Sharper re, asdas fasfascleaner trend views, andsdasdasd faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platformasdsda updatwrwee xyz",
      },
      {
        eyebrow: "xyzsdas",
        title: "r spasdasdonsor tewerweams",
        summary:
          "Sharper suasdasdmmaries, asdas fasfascleaner trend views,werwer and faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasrm werwer xyz",
      },
      {
        eyebrow: "xyzsdawerws",
        title: "r spasdasasfdonsor teawerms",
        summary:
          "Sharper suasdasdmmaries, asdas fasfascleaner trend views, andwertwt faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasrm updasdaate xyz",
      },
      {
        eyebrow: "xywtertwzsdas",
        title: "r spasdasdsdfsonsor teams",
        summary:
          "Sharper suassdfsdasdmmaries, asdas fasfascleaner trend views, and faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasdfsrm update xyz",
      },
      {
        eyebrow: "xyzsdreteras",
        title: "r tert teams",
        summary:
          "Sharper suasdasdmmaries, asdas fasfascleaner trend views, and faster accesfgjhfgs to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasrm update xyz",
      },
      {
        eyebrow: "xyzwerwesdas",
        title: "r spasdwerwasdonsor teams",
        summary:
          "Sharper suasdasdmmaries, asdas fasfasclewterwtaner trend views, and faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasrm werweupdate xyz",
      },
      {
        eyebrow: "xyzstwtsdas",
        title: "r spaswtdasdonsor teams",
        summary:
          "Sharper suasdasdmmaries, asdas fasfascleaner trend sasfafdafviews, and faster access to day-to-day study signalsasdasd fasa.",
        meta: "Platfoasdasrm updafasgate xyz",
      },
    ],
  },
  Webinars: {
    title: "Upcoming Webinars",
    description:
      "Designed to scale well as the library grows, with clear structure for sessions, topics, and follow-up resources.",
    icon: FiMonitor,
    cta: {
      href: "/contact",
      label: "Get Webinar Invites",
    },
    items: [
      {
        eyebrow: "Live Session",
        title: "Modern Clinical Operations",
        summary:
          "How sponsors and CRO teams can simplify oversight without losing control or compliance.",
        meta: "45 min session",
        featured: true,
      },
      {
        eyebrow: "Roundtable",
        title: "Implementation patterns for CRO teams",
        summary:
          "A practical discussion on rollout decisions, configuration velocity, and stakeholder alignment.",
        meta: "Panel discussion",
      },
      {
        eyebrow: "Deep Dive",
        title: "Randomization design without operational drag",
        summary:
          "Patterns for supporting stratification, cohorts, and complex protocol logic more smoothly.",
        meta: "Technical webinar",
      },
      {
        eyebrow: "Operations",
        title: "Inspection-ready supply visibility",
        summary:
          "What strong inventory traceability looks like across depots, sites, and real-time reporting.",
        meta: "Best practices",
      },
    ],
  },
  Moments: {
    title: "ClinRT Moments",
    description:
      "A more visual stream for culture, events, launches, and the shared moments behind the work.",
    icon: FiCamera,
    items: [
      {
        eyebrow: "Workshop",
        title: "Hands-on product workshop",
        summary:
          "Teams came together to map workflows, refine ideas, and pressure-test product directions.",
        meta: "Internal collaboration",
        image: "/images/case-study-1.jpg",
        featured: true,
      },
      {
        eyebrow: "Client Day",
        title: "Celebrating partnership milestones",
        summary:
          "Snapshots from a day focused on long-term relationships, feedback, and shared wins.",
        meta: "Customer moments",
        image: "/images/case-study-2.jpg",
      },
      {
        eyebrow: "Launch Event",
        title: "A new phase for the platform",
        summary:
          "Key moments from a launch that marked stronger visibility, coordination, and readiness.",
        meta: "Product milestone",
        image: "/images/case-study-3.jpg",
      },
      {
        eyebrow: "Team",
        title: "Cross-functional planning sprint",
        summary:
          "Engineers, delivery teams, and domain experts aligning around execution priorities.",
        meta: "Team culture",
        image: "/images/operations.avif",
      },
      {
        eyebrow: "Showcase",
        title: "Clinical workflow demo day",
        summary:
          "A closer look at real operating scenarios, decision flows, and platform capability in action.",
        meta: "Experience session",
        image: "/images/workflow.avif",
      },
    ],
  },
  "Case Studies": {
    title: "Case Studies",
    description:
      "Outcome-led stories organized in a way that stays readable even with a larger and growing library.",
    icon: FiLayers,
    items: [
      {
        eyebrow: "Oncology",
        title: "Multi-country acceleration across oncology sites",
        summary:
          "How cleaner coordination and stronger operational visibility reduced friction across regions.",
        meta: "Global program",
        featured: true,
      },
      {
        eyebrow: "Rare Disease",
        title: "Workflow redesign for a rare disease study",
        summary:
          "A focused redesign that improved team clarity while protecting protocol discipline.",
        meta: "Process redesign",
      },
      {
        eyebrow: "Supply",
        title: "Regional IMP visibility across site networks",
        summary:
          "Improved accountability, faster reactions, and clearer oversight for distributed supply teams.",
        meta: "Supply operations",
      },
      {
        eyebrow: "Inventory",
        title: "Standardizing site-level inventory execution",
        summary:
          "Reducing manual work while strengthening operational confidence at the site layer.",
        meta: "Operational control",
      },
    ],
  },
  Blogs: {
    title: "Insights and Blogs",
    description:
      "Editorial content arranged for quick scanning, filtering, and future expansion as more articles are added.",
    icon: FiBookOpen,
    items: [
      {
        eyebrow: "Insight",
        title: "How better visibility improves outcomes",
        summary:
          "Why decision quality rises when teams can see operational realities earlier and more clearly.",
        meta: "Operations insight",
        featured: true,
      },
      {
        eyebrow: "Design",
        title: "Designing better workflows for study teams",
        summary:
          "Practical design patterns that reduce friction without adding unnecessary complexity.",
        meta: "Workflow design",
      },
      {
        eyebrow: "Delivery",
        title: "Reducing reconciliation effort across programs",
        summary:
          "Simple operational guardrails that can remove repetitive work from delivery teams.",
        meta: "Execution article",
      },
      {
        eyebrow: "Compliance",
        title: "Building inspection-ready processes from the start",
        summary:
          "How preparation, traceability, and documentation fit naturally into modern execution.",
        meta: "Quality perspective",
      },
    ],
  },
  Brochures: {
    title: "Brochures",
    description:
      "Product and service overviews presented as a clear catalog, ready for larger document collections.",
    icon: FiFileText,
    cta: {
      href: "/contact",
      label: "Request Brochure Pack",
    },
    items: [
      {
        eyebrow: "Overview",
        title: "ClinRT platform overview",
        summary:
          "A high-level introduction to platform capabilities, delivery model, and operational value.",
        meta: "Platform brochure",
        featured: true,
      },
      {
        eyebrow: "IRT",
        title: "Randomization and trial supply brochure",
        summary:
          "A concise guide to allocation logic, kit flows, and supply visibility across studies.",
        meta: "Solution brochure",
      },
      {
        eyebrow: "Delivery",
        title: "Global implementation model",
        summary:
          "How programs move from planning to go-live with speed, clarity, and governance.",
        meta: "Delivery brochure",
      },
      {
        eyebrow: "Quality",
        title: "Validation and compliance overview",
        summary:
          "A summary of control frameworks, documentation readiness, and quality practices.",
        meta: "Quality brochure",
      },
    ],
  },
};

function isTab(value: string | null): value is Tab {
  return tabs.includes(value as Tab);
}

export default function WhatsNewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isPending, startTransition] = useTransition();
  const activeTab =
    selectedTab ?? (isTab(requestedTab) ? requestedTab : "News");
  const activeContent = contentByTab[activeTab];
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredItems = activeContent.items.filter((item) =>
    [item.eyebrow, item.title, item.summary, item.meta]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const visibleItems = filteredItems.slice(0, visibleCount);
  const remainingItems = filteredItems.length - visibleItems.length;

  function handleTabSelect(tab: Tab) {
    startTransition(() => {
      setSelectedTab(tab);
      setQuery("");
      setVisibleCount(INITIAL_VISIBLE);
    });
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setVisibleCount(INITIAL_VISIBLE);
  }

  return (
    <PageTransition>
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/images/why-choose-image.jpg"
          alt="What's new"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/95" />

        <div className="relative z-10 h-full flex items-center section-shell pb-20 text-white">
          <ScrollReveal className="max-w-3xl">
            <p className="type-h1 md:text-6xl font-semibold">
              Stay connected with our latest updates, resources, and milestones.
              Here&apos;s everything happening across ClinRT right now.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper fullBleed id="content-hub">
        <div className="relative overflow-hidden rounded-4xl border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(15,36,58,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,123,33,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_28px_120px_rgba(15,36,58,0.08)] md:p-8">
          <motion.div
            className="pointer-events-none absolute -left-14 top-12 h-44 w-44 rounded-full bg-sky-200/35 blur-3xl"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -right-10 bottom-8 h-52 w-52 rounded-full bg-orange-200/40 blur-3xl"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
          />

          <div className="relative grid gap-8 xl:grid-cols-[280px_1fr]">
            <aside className="xl:sticky xl:top-12 xl:h-fit">
              <ScrollReveal className="rounded-[1.75rem] border border-black/8 bg-white/75 p-5 shadow-[0_20px_60px_rgba(15,36,58,0.08)] backdrop-blur md:p-6">
                <p className="type-h6 font-semibold uppercase tracking-[0.35em] text-black/45">
                  Content Hub
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-(--color-primary) p-4 text-white">
                    <p className="text-2xl font-semibold">{tabs.length}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Channels
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/8 bg-white/80 p-4">
                    <p className="text-2xl font-semibold text-black">
                      {activeContent.items.length}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-black/40">
                      In View
                    </p>
                  </div>
                </div>

                <div className="-mx-1 mt-6 flex gap-3 overflow-x-auto px-1 pb-1 no-scrollbar xl:mx-0 xl:flex-col xl:overflow-visible xl:px-0">
                  {tabs.map((tab) => (
                    <TabButton
                      key={tab}
                      tab={tab}
                      isActive={activeTab === tab}
                      itemCount={contentByTab[tab].items.length}
                      icon={contentByTab[tab].icon}
                      onClick={() => handleTabSelect(tab)}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </aside>

            <div className="space-y-6">
              <ScrollReveal>
                <div className="rounded-[1.75rem] border border-black/8 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,36,58,0.08)] backdrop-blur md:p-7">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-(--color-primary) text-white shadow-lg">
                          <activeContent.icon className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/40">
                            Active Collection
                          </p>
                          <p className="mt-2 text-3xl font-semibold leading-tight text-black md:text-4xl">
                            {activeContent.title}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-black/60 md:text-base">
                            {activeContent.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:max-w-sm">
                      <label className="relative block">
                        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                        <input
                          value={query}
                          onChange={handleSearchChange}
                          placeholder={`Search in ${activeTab.toLowerCase()}`}
                          className="h-13 w-full rounded-2xl border border-black/10 bg-slate-50 pl-11 pr-4 text-sm text-black outline-none transition focus:border-black/20 focus:bg-white"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-black/45">
                      <span className="rounded-full border border-black/8 bg-slate-50 px-4 py-2">
                        {filteredItems.length} results
                      </span>
                      <span className="rounded-full border border-black/8 bg-slate-50 px-4 py-2">
                        Showing {visibleItems.length}
                      </span>
                      {normalizedQuery && (
                        <span className="rounded-full border border-black/8 bg-orange-50 px-4 py-2 text-orange-700">
                          Filtered by &quot;{deferredQuery}&quot;
                        </span>
                      )}
                      {isPending && (
                        <span className="rounded-full border border-black/8 bg-slate-950 px-4 py-2 text-white">
                          Updating
                        </span>
                      )}
                    </div>

                    {activeContent.cta && (
                      <Button
                        href={activeContent.cta.href}
                        label={activeContent.cta.label}
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
                    activeTab === "Moments" && "xl:auto-rows-[19rem]",
                  )}
                >
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item, index) => (
                      <ResourceCard
                        key={`${item.title}-${index}`}
                        item={item}
                        tab={activeTab}
                        index={index}
                      />
                    ))
                  ) : (
                    <div className="md:col-span-2 xl:col-span-3">
                      <div className="rounded-[1.75rem] border border-dashed border-black/12 bg-white/75 p-10 text-center shadow-sm">
                        <p className="text-xl font-semibold text-black">
                          No matches yet
                        </p>
                        <p className="mt-3 text-sm leading-7 text-black/60">
                          Try a different keyword or switch to another content
                          channel.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {remainingItems > 0 && (
                <div className="flex justify-center pt-2">
                  <Button
                    label={`Load ${Math.min(INITIAL_VISIBLE, remainingItems)} More`}
                    size="sm"
                    onClick={() =>
                      setVisibleCount((current) => current + INITIAL_VISIBLE)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}

type TabButtonProps = {
  tab: Tab;
  isActive: boolean;
  itemCount: number;
  icon: IconType;
  onClick: () => void;
};

function TabButton({
  tab,
  isActive,
  itemCount,
  icon: Icon,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group min-w-55 rounded-2xl border px-4 py-4 text-left transition duration-300 xl:min-w-0",
        isActive
          ? " bg-(--color-primary) text-white shadow-lg"
          : "border-black/8 bg-white/75 text-black hover:-translate-y-0.5 hover:border-black/18 hover:bg-white",
      )}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-2xl border",
              isActive
                ? "border-white/10 bg-white/10"
                : "border-black/8 bg-slate-50",
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">{tab}</p>
            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.3em]",
                isActive ? "text-white/55" : "text-black/35",
              )}
            >
              {itemCount} items
            </p>
          </div>
        </div>
        <FiArrowRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isActive
              ? "translate-x-0"
              : "text-black/35 group-hover:translate-x-1",
          )}
        />
      </div>
    </button>
  );
}

type ResourceCardProps = {
  item: ResourceItem;
  tab: Tab;
  index: number;
};

function ResourceCard({ item, tab, index }: ResourceCardProps) {
  const reduceMotion = useReducedMotion();

  if (tab === "Moments" && item.image) {
    return (
      <motion.article
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: reduceMotion ? 0 : index * 0.04,
        }}
        className={cn(
          "group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,36,58,0.16)]",
          item.featured && "md:col-span-2 xl:row-span-2",
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-6">
          <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/75">
            {item.eyebrow}
          </span>
          <div>
            <p className="text-2xl font-semibold leading-tight">{item.title}</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
              {item.summary}
            </p>
            <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/55">
              <span>{item.meta}</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <FiArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,36,58,0.08)]",
        item.featured && "md:col-span-2",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-sky-100/60 via-orange-50/70 to-transparent" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/55">
            {item.eyebrow}
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-md transition duration-300 group-hover:-translate-y-0.5">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-8 text-2xl font-semibold leading-tight text-black">
          {item.title}
        </p>
        <p className="mt-4 text-sm leading-7 text-black/65">{item.summary}</p>
        <div className="mt-8 border-t border-black/8 pt-4 text-[11px] uppercase tracking-[0.32em] text-black/40">
          {item.meta}
        </div>
      </div>
    </motion.article>
  );
}
