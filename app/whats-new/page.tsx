/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import PageTransition from "@/components/animations/PageTransition";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

/* ---------------- DATA ---------------- */

const tabs = [
  "News",
  "Webinars",
  "Moments",
  "Case Studies",
  "Blogs",
  "Brochures",
  "Factsheets",
] as const;

type Tab = (typeof tabs)[number];

function isTab(value: string | null): value is Tab {
  return tabs.includes(value as Tab);
}

const data = {
  News: [
    "Event: ClinRT at Global Clinical Tech Forum 2026",
    "Media: Featured in Clinical Innovation Review",
    "Announcement: New monitoring capabilities released",
  ],
  Webinars: [
    "Modern Clinical Operations",
    "Implementation patterns for CRO teams",
  ],
  "Case Studies": [
    "Multi-country oncology acceleration",
    "Workflow redesign for rare disease study",
  ],
  Blogs: ["How visibility improves outcomes", "Designing better workflows"],
  Brochures: ["ClinRT Platform Overview", "Clinical Execution Playbook"],
  Factsheets: ["IRT Overview", "CTSM Capabilities"],
  Moments: [
    { src: "/images/case-study-1.jpg", label: "Workshop" },
    { src: "/images/case-study-2.jpg", label: "Client Day" },
    { src: "/images/case-study-3.jpg", label: "Launch Event" },
  ],
};

/* ---------------- PAGE ---------------- */

export default function WhatsNewPage() {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const activeTab = selectedTab ?? (isTab(requestedTab) ? requestedTab : "News");

  return (
    <PageTransition>
      {/* ================= HERO ================= */}
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
              {" "}
              Stay connected with our latest updates, resources, and milestones.
              Here’s everything happening across ClinRT right now
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= CONTENT HUB ================= */}
      <SectionWrapper id="content-hub">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* ---------- LEFT TABS ---------- */}
          <div className="sticky top-24 h-fit">
              <div className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`text-left px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-black text-white shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT CONTENT ---------- */}
          <div className="relative min-h-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TabContent tab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}

/* ---------------- TAB CONTENT ---------------- */

function TabContent({ tab }: { tab: string }) {
  const content = (data as any)[tab];

  /* MOMENTS (GRID IMAGE STYLE) */
  if (tab === "Moments") {
    return (
      <div className="grid md:grid-cols-3 gap-5">
        {content.map((item: any, i: number) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-2xl border"
          >
            <div className="relative h-56">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>
            <p className="p-3 text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  /* DEFAULT LIST STYLE */
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {content.map((item: string, i: number) => (
        <motion.div
          key={i}
          whileHover={{ y: -4 }}
          className="p-5 rounded-xl border bg-white shadow-sm"
        >
          {item}
        </motion.div>
      ))}

      {/* CTA for some tabs */}
      {(tab === "Webinars" || tab === "Brochures") && (
        <div className="col-span-full mt-6">
          <Button
            href="/contact"
            label={
              tab === "Webinars"
                ? "Get Webinar Invites"
                : "Request Brochure Pack"
            }
          />
        </div>
      )}
    </div>
  );
}
