"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiLoader, FiPlay, FiX } from "react-icons/fi";
import GlassCard from "@/components/GlassCard";
import HeroBanner from "@/components/HeroBanner";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import {
  galleryCategories,
  galleryConfig,
  galleryHero,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/data";

export default function Gallery() {
  const perPage = galleryConfig.perPage;
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [visibleCount, setVisibleCount] = useState(perPage);
  const [loading, setLoading] = useState(false);
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredItems = useMemo(
    () =>
      category === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category),
    [category, galleryItems],
  );
  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = useCallback(
    (nextCategory: GalleryCategory) => {
      if (nextCategory === category) return;
      setCategory(nextCategory);
      setVisibleCount(perPage);
      setLoading(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [category, perPage],
  );

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + perPage, filteredItems.length));
      setLoading(false);
    }, 300);
  }, [filteredItems.length, hasMore, loading, perPage]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    if (!modalItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalItem]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <PageTransition>
      <HeroBanner
        title={galleryHero.title}
        breadcrumb={galleryHero.breadcrumb}
        image={galleryHero.image}
      />

      <SectionWrapper>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              type="button"
              aria-pressed={category === c}
              className={`px-5 py-2 rounded-full text-xs tracking-wide transition-all ${
                category === c
                  ? "bg-(--primary-color) text-white shadow-lg"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {visibleItems.length === 0 && !loading ? (
          <p className="text-center text-white/40 py-20">No items found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <GlassCard
                key={item.id}
                image={item.type === "video" ? item.thumb! : item.src}
                height="h-72"
                className="cursor-pointer border-none group"
                overlayOpacity="bg-black/30"
                hoverEffect="scale"
                onClick={() => setModalItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setModalItem(item);
                  }
                }}
              >
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition">
                      <FiPlay className="text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-white/50 text-xs mt-1">{item.category}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div
          ref={loaderRef}
          className="flex justify-center items-center h-32 mt-8"
        >
          {loading && (
            <FiLoader className="animate-spin text-white/40 text-2xl" />
          )}
          {!hasMore && visibleItems.length > 0 && (
            <p className="text-white/30 text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-white/20" /> End of gallery{" "}
              <span className="w-8 h-px bg-white/20" />
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* Lightbox Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalItem(null)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition p-2"
            >
              <FiX size={24} />
            </button>

            {modalItem.type === "video" ? (
              <video
                src={modalItem.src}
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <Image
                src={modalItem.src}
                alt={modalItem.title}
                width={1200}
                height={800}
                className="w-full rounded-2xl shadow-2xl"
              />
            )}

            <div className="mt-4 text-white/80">
              <p className="text-xl font-light">{modalItem.title}</p>
              <p className="text-white/40 text-sm mt-1">{modalItem.category}</p>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
