"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiEye,
  FiFileText,
  FiMonitor,
  FiRadio,
  FiSearch,
} from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import { BlogArticleModal } from "@/components/BlogArticleModal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import {
  brochures,
  clinrtWorldBlogArticles,
  getBrochureHref,
} from "@/data";
import { cn } from "@/lib/cn";

const tabs = ["News", "Events", "Moments", "Blogs", "Brochures"] as const;

const INITIAL_VISIBLE = 6;

type Tab = (typeof tabs)[number];

type ResourceItem = {
  title: string;
  summary: string;
  eyebrow: string;
  meta: string;
  image?: string;
  featured?: boolean;
  href?: string;
  highlights?: readonly string[];
  blog?: BlogArticle;
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

type BlogArticle = (typeof clinrtWorldBlogArticles)[number];

const brochureItems: readonly ResourceItem[] = brochures.map(
  (brochure, index) => ({
    eyebrow: brochure.eyebrow,
    title: brochure.title,
    summary: brochure.summary,
    meta: brochure.meta,
    featured: index === 0,
    href: getBrochureHref(brochure.slug),
    highlights: brochure.highlights,
  }),
);

const blogItems: readonly ResourceItem[] = clinrtWorldBlogArticles.map(
  (article) => ({
    eyebrow: article.eyebrow,
    title: article.title,
    summary: article.summary,
    meta: article.meta,
    featured: article.featured,
    blog: article,
  }),
);

const contentByTab: Record<Tab, TabContent> = {
  News: {
    title: "Latest News",
    description:
      "Product releases, milestones, and industry activity collected in one modern feed.",
    icon: FiRadio,
    items: [
      {
        eyebrow: "Launch",
        title: "iClinRT is now live",
        summary:
          "ClinRT's Interactive Response Technology platform is now live, bringing configurable trial execution, supply oversight, and operational visibility into one system.",
        meta: "Launch update",
        featured: true,
      },
    ],
  },
  Events: {
    title: "Upcoming Events",
    description:
      "Designed to scale well as the library grows, with clear structure for sessions, topics, and follow-up resources.",
    icon: FiMonitor,
    cta: {
      href: "/contact",
      label: "Get Webinar Invites",
    },
    items: [
      {
        eyebrow: "Conference",
        title: "19th Annual ISCR Conference in New Delhi",
        summary:
          "ClinRT was delighted to be part of the 19th Annual ISCR Conference in New Delhi, engaging with industry leaders and clinical research professionals to explore innovative, value-driven solutions in Clinical Research Technology.",
        meta: "Industry event",
        featured: true,
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

  Blogs: {
    title: "Insights and Blogs",
    description:
      "Editorial content arranged for quick scanning, filtering, and future expansion as more articles are added.",
    icon: FiBookOpen,
    items: blogItems,
  },
  Brochures: {
    title: "Brochures",
    description:
      "Open the full brochure in-browser, explore the entire document, and unlock the PDF download through a short community signup.",
    icon: FiFileText,
    items: brochureItems,
  },
};

function isTab(value: string | null): value is Tab {
  return tabs.includes(value as Tab);
}

function getSearchableText(item: ResourceItem) {
  const blogSections =
    item.blog?.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
    ]) ?? [];

  return [
    item.eyebrow,
    item.title,
    item.summary,
    item.meta,
    item.blog?.readTime ?? "",
    ...(item.blog?.lead ?? []),
    ...blogSections,
    ...(item.blog?.closing ?? []),
  ].join(" ");
}

export default function WhatsNewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogArticle | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isPending, startTransition] = useTransition();
  const activeTab =
    selectedTab ?? (isTab(requestedTab) ? requestedTab : "News");
  const activeContent = contentByTab[activeTab];
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredItems = activeContent.items.filter((item) =>
    getSearchableText(item).toLowerCase().includes(normalizedQuery),
  );
  const visibleItems = filteredItems.slice(0, visibleCount);
  const remainingItems = filteredItems.length - visibleItems.length;

  function handleTabSelect(tab: Tab) {
    startTransition(() => {
      setSelectedTab(tab);
      setActiveBlog(null);
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
      <section className="relative min-h-[88svh] overflow-hidden sm:h-screen">
        <Image
          src="/images/iclinrt-world-baner.avif"
          alt="What's new"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,242,254,0.2)_0%,rgba(167,243,208,0.16)_22%,rgba(14,116,144,0.4)_52%,rgba(15,23,42,0.84)_100%)]" />

        <div className="hero-content-lift relative z-10 flex h-full items-end section-shell pb-10 pt-24 text-white sm:pb-14 sm:pt-28 md:pb-20 md:pt-36 lg:pb-24">
          <ScrollReveal className="max-w-3xl">
            <p className="page-banner-title font-semibold">
              Stay connected with our latest updates, resources, and milestones.
            </p>

            <p className="mt-3 type-h4 max-w-2xl font-semibold">
              {" "}
              Here&apos;s everything happening across ClinRT right now.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#content-hub" label="Explore Content Hub" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionWrapper fullBleed id="content-hub">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(15,36,58,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,123,33,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3 shadow-[0_28px_120px_rgba(15,36,58,0.08)] sm:p-4 lg:p-6 xl:p-8">
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

          <div className="relative grid gap-6 lg:grid-cols-[minmax(15.75rem,16.75rem)_minmax(0,1fr)] xl:grid-cols-[280px_1fr] lg:gap-8">
            <aside className="lg:sticky lg:top-10 lg:h-fit xl:top-12">
              <ScrollReveal className="rounded-[1.75rem] border border-black/8 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-6">
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

                <div className="-mx-1 mt-6 flex gap-3 overflow-x-auto px-1 pb-1 no-scrollbar lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
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
                <div className="rounded-[1.75rem] border border-black/8 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-7">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-primary) text-white shadow-lg sm:h-14 sm:w-14">
                          <activeContent.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/40">
                            Active Collection
                          </p>
                          <p className="mt-2 text-2xl font-semibold leading-tight text-black sm:text-3xl md:text-4xl">
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

                  <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
                    "grid gap-4 sm:gap-5 md:grid-cols-2 2xl:grid-cols-3",
                    activeTab === "Moments" && "2xl:auto-rows-[19rem]",
                    activeTab === "Brochures" &&
                      "grid-cols-1 md:grid-cols-1 2xl:grid-cols-1",
                  )}
                >
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item, index) => (
                      <ResourceCard
                        key={`${item.title}-${index}`}
                        item={item}
                        tab={activeTab}
                        index={index}
                        onOpenBlog={setActiveBlog}
                      />
                    ))
                  ) : (
                    <div className="md:col-span-2 2xl:col-span-3">
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

      <AnimatePresence>
        {activeBlog && (
          <BlogArticleModal
            article={activeBlog}
            onClose={() => setActiveBlog(null)}
          />
        )}
      </AnimatePresence>
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
        "group min-w-[13rem] rounded-2xl border px-4 py-3.5 text-left transition duration-300 sm:min-w-55 sm:py-4 lg:min-w-0",
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
  onOpenBlog: (article: BlogArticle) => void;
};

function ResourceCard({ item, tab, index, onOpenBlog }: ResourceCardProps) {
  const reduceMotion = useReducedMotion();

  if (tab === "Brochures" && item.href) {
    return <BrochureCard item={{ ...item, href: item.href }} index={index} />;
  }

  if (tab === "Blogs" && item.blog) {
    const article = item.blog;

    return (
      <BlogCard item={{ ...item, blog: article }} index={index} onOpen={() => onOpenBlog(article)} />
    );
  }

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
          item.featured && "md:col-span-2 2xl:row-span-2",
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
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/75">
            {item.eyebrow}
          </span>
          <div>
            <p className="text-xl font-semibold leading-tight sm:text-2xl">
              {item.title}
            </p>
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
        "group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,36,58,0.08)] sm:p-6",
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
        <p className="mt-6 text-xl font-semibold leading-tight text-black sm:mt-8 sm:text-2xl">
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

function BlogCard({
  item,
  index,
  onOpen,
}: {
  item: ResourceItem & { blog: BlogArticle };
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: reduceMotion ? 0 : index * 0.04,
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-black/8 bg-white/88 p-5 text-left shadow-[0_18px_50px_rgba(15,36,58,0.08)] transition duration-300 hover:border-black/14 hover:shadow-[0_22px_60px_rgba(15,36,58,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 sm:p-6",
        item.featured && "md:col-span-2",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(167,243,208,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.92)_100%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/55">
              {item.eyebrow}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-sky-700">
              <FiClock className="h-3.5 w-3.5" />
              {item.blog.readTime}
            </span>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-md transition duration-300 group-hover:-translate-y-0.5">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-6 text-xl font-semibold leading-tight text-black transition group-hover:text-(--color-primary) sm:mt-8 sm:text-2xl md:text-[2rem]">
          {item.title}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
          {item.summary}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-black/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] uppercase tracking-[0.32em] text-black/40">
            {item.meta}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-primary)">
            Read full article
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function BrochureCard({
  item,
  index,
}: {
  item: ResourceItem & { href: string };
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <Link
        href={item.href}
        className="group relative block overflow-hidden rounded-4xl border border-black/8 bg-white/90 p-5 shadow-[0_24px_80px_rgba(15,36,58,0.1)] transition duration-300 hover:border-black/14 hover:shadow-[0_30px_90px_rgba(15,36,58,0.14)] sm:p-6 xl:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,36,58,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,123,33,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)]" />
        <div className="pointer-events-none absolute right-8 top-7 hidden w-36 rotate-6 rounded-[1.6rem] border border-slate-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,36,58,0.12)] xl:block">
          <div className="rounded-[1.1rem] bg-[#0f243a] px-4 py-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
              ClinRT
            </p>
            <p className="mt-3 text-lg font-semibold leading-tight">iClinRT</p>
            <p className="mt-2 text-xs leading-5 text-white/72">
              Platform overview brochure
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="h-2 w-4/5 rounded-full bg-slate-200" />
            <div className="h-2 w-3/5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="relative flex h-full flex-col gap-6 xl:gap-8">
          <div className="max-w-4xl xl:pr-44">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/50">
                {item.eyebrow}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-emerald-700">
                <FiDownload className="h-3.5 w-3.5" />
                Gated download
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-2xl font-semibold leading-tight text-black sm:mt-6 sm:text-3xl xl:text-4xl">
              {item.title}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65 md:text-base">
              {item.summary}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3">
              {item.highlights?.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-[1.35rem] border border-black/8 bg-white/78 px-3.5 py-4 shadow-sm sm:px-4"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#0f243a] text-white">
                    <FiCheckCircle className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-6 text-black/70">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.6rem] border border-black/8 bg-white/82 p-4 shadow-sm sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/45">
                Access Flow
              </p>
              <div className="mt-5 grid gap-3">
                <FlowStep
                  icon={FiEye}
                  title="Open full brochure"
                  summary="Read the complete PDF inside a polished browser preview."
                />
                <FlowStep
                  icon={FiDownload}
                  title="Unlock download"
                  summary="Join the ClinRT community once before the file download starts."
                />
                <FlowStep
                  icon={FiCheckCircle}
                  title="Instant handoff"
                  summary="After the form is submitted, the PDF download begins automatically."
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-black/8 pt-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-black/45">
              <span className="rounded-full border border-black/8 bg-slate-50 px-4 py-2">
                {item.meta}
              </span>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                Industry-style brochure preview
              </span>
            </div>

            <span className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-(--color-primary) px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 group-hover:translate-x-1 sm:w-auto">
              Preview brochure
              <FiArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FlowStep({
  icon: Icon,
  title,
  summary,
}: {
  icon: IconType;
  title: string;
  summary: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[1.25rem] border border-black/8 bg-slate-50/85 px-3.5 py-3 sm:px-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-white text-[#0f243a]">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="mt-1 text-sm leading-6 text-black/60">{summary}</p>
      </div>
    </div>
  );
}
