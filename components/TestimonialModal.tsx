"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowUpRight, FiPlay, FiX } from "react-icons/fi";

type TestimonialModalProps = {
  testimonial: Readonly<{
    name: string;
    role: string;
    image?: string;
    video?: string;
    quote?: string;
    text?: string;
  }>;
  onClose: () => void;
};

export function TestimonialModal({
  testimonial,
  onClose,
}: TestimonialModalProps) {
  const testimonialBody = testimonial.quote ?? testimonial.text ?? "";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#07121d]/70 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#0b1d30] text-white shadow-[0_30px_100px_rgba(4,10,18,0.45)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_45%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.26),transparent_35%)]" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-(--color-orange)/20 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close testimonial details"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="relative grid max-h-[90vh] overflow-y-auto md:grid-cols-[minmax(260px,320px)_1fr]">
          <div className="border-b border-white/10 bg-white/[0.04] p-6 md:border-b-0 md:border-r md:p-8">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">
              Client Story
            </span>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
              <Image
                src={testimonial.image ?? "/images/default-avatar.jpg"}
                alt={testimonial.name}
                width={560}
                height={720}
                className="h-72 w-full object-cover md:h-[24rem]"
              />
            </div>

            <div className="mt-5">
              <p className="text-2xl font-semibold text-white">
                {testimonial.name}
              </p>
              <p className="mt-1 text-sm text-white/65">{testimonial.role}</p>
            </div>

            {testimonial.video && (
              <a
                href={testimonial.video}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <FiPlay className="h-4 w-4" />
                Watch testimonial
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
              Full Testimonial
            </p>
            <h3
              id="testimonial-modal-title"
              className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Recognized for dependable delivery and transparent execution.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              A closer look at the client perspective behind the headline,
              including the full quote and profile details.
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
              <p className="text-5xl leading-none text-(--color-orange)/80">
                &ldquo;
              </p>
              <p className="mt-3 text-base leading-8 text-white/85 sm:text-lg">
                {testimonialBody}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/65">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                Operational transparency
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                Reliable platform performance
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                Client-first delivery
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
