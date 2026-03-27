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
  FiClock,
  FiDownload,
  FiEye,
  FiFileText,
  FiMonitor,
  FiRadio,
  FiSearch,
} from "react-icons/fi";
import PageTransition from "@/components/animations/PageTransition";
import { BrochurePreviewModal } from "@/components/BrochurePreviewModal";
import { BlogArticleModal } from "@/components/BlogArticleModal";
import {
  MomentGalleryModal,
  type MomentGalleryItem,
} from "@/components/MomentGalleryModal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import {
  brochures,
  clinrtWorldBlogArticles,
  getBrochureGateHref,
  type Brochure,
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
  momentImages?: readonly {
    src: string;
    alt: string;
  }[];
  featured?: boolean;
  href?: string;
  highlights?: readonly string[];
  blog?: BlogArticle;
  brochure?: Brochure;
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
    highlights: brochure.highlights,
    brochure,
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
        eyebrow: "upcoming event",
        title:
          "ClinRT is excited to attend the 17th Annual Clinical Trials Summit 2026 in Mumbai",
        summary:
          "Where industry leaders come together to exchange insights, explore emerging trends, and engage in impactful conversations shaping the future of clinical research.",
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
        eyebrow: "Celebration",
        title: "Women’s Day Celebration",
        summary:
          "A heartfelt celebration recognizing the strength, contributions, and achievements of women at ClinRT, reflecting our commitment to inclusion and appreciation.",
        meta: "Photo collage",
        image: "/images/moment4.jpg",
        momentImages: [
          {
            src: "/images/moment4.jpg",
            alt: "Women’s Day celebration highlight at ClinRT",
          },
          {
            src: "/images/moment1.jpg",
            alt: "Team gathering during the Women’s Day celebration",
          },
        ],
        featured: true,
      },

      {
        eyebrow: "Celebration",
        title: "Christmas Celebration",
        summary:
          "A cheerful moment where colleagues came together to celebrate the season, strengthening bonds and creating memorable experiences at ClinRT.",
        meta: "Photo collage",
        image: "/images/moment3.jpg",
        momentImages: [
          {
            src: "/images/moment3.jpg",
            alt: "Christmas celebration moment at ClinRT",
          },
          {
            src: "/images/moment2.jpg",
            alt: "Team sharing festive moments during the Christmas celebration",
          },
        ],
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
      "Open the full brochure in-browser, explore the entire document, and unlock the PDF download through a short contact request.",
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
  const brochureText = item.brochure
    ? [
        item.brochure.description,
        item.brochure.fileName,
        ...item.brochure.highlights,
      ]
    : [];
  const momentText = item.momentImages?.map((image) => image.alt) ?? [];

  return [
    item.eyebrow,
    item.title,
    item.summary,
    item.meta,
    item.blog?.readTime ?? "",
    ...(item.blog?.lead ?? []),
    ...blogSections,
    ...(item.blog?.closing ?? []),
    ...brochureText,
    ...momentText,
  ].join(" ");
}

export default function WhatsNewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogArticle | null>(null);
  const [activeBrochure, setActiveBrochure] = useState<Brochure | null>(null);
  const [activeMoment, setActiveMoment] = useState<MomentGalleryItem | null>(
    null,
  );
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
      setActiveBrochure(null);
      setActiveMoment(null);
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
        <div className="relative overflow-hidden rounded-4xl border border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(15,36,58,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(243,123,33,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3 shadow-[0_28px_120px_rgba(15,36,58,0.08)] sm:p-4 lg:p-6 xl:p-8">
          <div className="pointer-events-none absolute inset-[1.1rem] rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(253,186,116,0.12),transparent_34%),linear-gradient(135deg,rgba(255,248,243,0.78)_0%,rgba(255,255,255,0.38)_52%,rgba(255,244,236,0.64)_100%)]" />
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
              <ScrollReveal className="rounded-[1.75rem] border border-orange-100/80 bg-[linear-gradient(180deg,rgba(255,248,243,0.96)_0%,rgba(255,255,255,0.86)_100%)] p-4 shadow-[0_20px_60px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-6">
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
                <div className="rounded-[1.75rem] border border-orange-100/75 bg-[linear-gradient(180deg,rgba(255,248,243,0.94)_0%,rgba(255,255,255,0.88)_100%)] p-4 shadow-[0_18px_50px_rgba(15,36,58,0.08)] backdrop-blur sm:p-5 xl:p-7">
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
                          className="h-13 w-full rounded-2xl border border-orange-100/80 bg-white/86 pl-11 pr-4 text-sm text-black outline-none transition focus:border-orange-200 focus:bg-white"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-black/45">
                      <span className="rounded-full border border-orange-100/70 bg-white/88 px-4 py-2">
                        {filteredItems.length} results
                      </span>
                      <span className="rounded-full border border-orange-100/70 bg-white/88 px-4 py-2">
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
                        onOpenBrochure={setActiveBrochure}
                        onOpenMoment={setActiveMoment}
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
        {activeBrochure && (
          <BrochurePreviewModal
            brochure={activeBrochure}
            onClose={() => setActiveBrochure(null)}
          />
        )}
        {activeMoment && (
          <MomentGalleryModal
            moment={activeMoment}
            onClose={() => setActiveMoment(null)}
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
        "group min-w-52 rounded-2xl border px-4 py-3.5 text-left transition duration-300 sm:min-w-55 sm:py-4 lg:min-w-0",
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
  onOpenBrochure: (brochure: Brochure) => void;
  onOpenMoment: (moment: MomentGalleryItem) => void;
};

function ResourceCard({
  item,
  tab,
  index,
  onOpenBlog,
  onOpenBrochure,
  onOpenMoment,
}: ResourceCardProps) {
  const reduceMotion = useReducedMotion();

  if (tab === "Brochures" && item.brochure) {
    const brochure = item.brochure;

    return (
      <BrochureCard
        item={{ ...item, brochure }}
        index={index}
        onOpen={() => onOpenBrochure(brochure)}
      />
    );
  }

  if (tab === "Blogs" && item.blog) {
    const article = item.blog;

    return (
      <BlogCard
        item={{ ...item, blog: article }}
        index={index}
        onOpen={() => onOpenBlog(article)}
      />
    );
  }

  if (tab === "Moments" && item.image && item.momentImages?.length) {
    const moment: MomentGalleryItem = {
      eyebrow: item.eyebrow,
      title: item.title,
      summary: item.summary,
      meta: item.meta,
      image: item.image,
      momentImages: item.momentImages,
    };

    return (
      <motion.button
        type="button"
        onClick={() => onOpenMoment(moment)}
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: reduceMotion ? 0 : index * 0.04,
        }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        className={cn(
          "group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950 text-left text-white shadow-[0_24px_70px_rgba(15,36,58,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081423]",
          item.featured && "md:col-span-2 2xl:row-span-2",
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={moment.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover scale-[1.06] blur-[6px] transition duration-700 group-hover:scale-[1.1] group-hover:blur-[5px]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_28%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/50 to-black/12" />
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/75">
              {item.eyebrow}
            </span>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/72">
              {moment.momentImages.length} photos
            </span>
          </div>
          <div>
            <p className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
              {item.title}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
              {item.summary}
            </p>
            <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/55">
              <span>{item.meta || "Click to view collage"}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/80">
                See all pics
                <FiArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.button>
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
  onOpen,
}: {
  item: ResourceItem & { brochure: Brochure };
  index: number;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const downloadHref = getBrochureGateHref(item.brochure.slug);

  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduceMotion ? 0 : index * 0.05,
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="relative overflow-hidden rounded-[1.9rem] border border-black/8 bg-white/88 p-5 shadow-[0_22px_70px_rgba(15,36,58,0.08)] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.2),transparent_35%),radial-gradient(circle_at_top_right,rgba(167,243,208,0.16),transparent_28%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-black/8 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-black/50">
              {item.eyebrow}
            </span>
            <span className="rounded-full border border-black/8 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-black/45">
              {item.meta}
            </span>
          </div>

          <p className="mt-5 text-2xl font-semibold leading-tight text-black sm:text-3xl">
            {item.title}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
            {item.summary}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:min-w-[14rem] lg:flex-col">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-[#0f243a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#163451]"
          >
            <FiEye className="h-4 w-4" />
            Preview brochure
          </button>
          <Link
            href={downloadHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[#0f243a] transition hover:border-black/18 hover:bg-slate-50"
          >
            <FiDownload className="h-4 w-4" />
            Join & Download
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
