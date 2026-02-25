"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMapPin, FiClock, FiBriefcase, FiChevronRight } from "react-icons/fi";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import GlassCard from "@/components/GlassCard";
import { Panel } from "@/components/ui/Panel";
import Button from "@/components/ui/Button";

// Types
type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  description: string;
};

type Benefit = {
  icon: string;
  title: string;
  description: string;
};

// Data
const careerHero = {
  title: "Join Our Team",
  breadcrumb: "Home / Careers",
  image: "/images/careers-hero.jpg",
};

const departments = [
  "All",
  "Research",
  "Engineering",
  "Operations",
  "Sales",
  "Marketing",
];

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Research Scientist",
    department: "Research",
    location: "Boston, MA",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead groundbreaking research in molecular diagnostics and assay development.",
  },
  {
    id: "2",
    title: "Lab Operations Manager",
    department: "Operations",
    location: "Cambridge, MA",
    type: "Full-time",
    experience: "7+ years",
    description:
      "Oversee daily lab operations, ensure compliance, and optimize workflows.",
  },
  {
    id: "3",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Remote",
    experience: "3+ years",
    description:
      "Build beautiful, responsive interfaces for our laboratory management platform.",
  },
  {
    id: "4",
    title: "Sales Director",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    experience: "8+ years",
    description:
      "Drive revenue growth and build strategic partnerships with research institutions.",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Create compelling content and campaigns for the scientific community.",
  },
  {
    id: "6",
    title: "Research Associate",
    department: "Research",
    location: "Boston, MA",
    type: "Full-time",
    experience: "1-2 years",
    description:
      "Support senior scientists in experimental design and data analysis.",
  },
];

const benefits: Benefit[] = [
  {
    icon: "🧬",
    title: "Cutting-edge Research",
    description: "Work with the latest technology and publish in top journals.",
  },
  {
    icon: "🌎",
    title: "Remote-first Culture",
    description: "Flexible work arrangements across multiple time zones.",
  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "$5,000 annual budget for conferences, courses, and books.",
  },
  {
    icon: "🏥",
    title: "Comprehensive Benefits",
    description: "Health, dental, vision, and 401k with 6% matching.",
  },
  {
    icon: "⚖️",
    title: "Work-life Balance",
    description: "Unlimited PTO and flexible hours that work for you.",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    description: "Clear progression paths and mentorship programs.",
  },
];

const cultureImages = [
  "/images/culture-1.jpg",
  "/images/culture-2.jpg",
  "/images/culture-3.jpg",
  "/images/culture-4.jpg",
];

export default function Careers() {
  const [department, setDepartment] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs =
    department === "All"
      ? jobs
      : jobs.filter((j) => j.department === department);

  return (
    <PageTransition>
      <HeroBanner
        title={careerHero.title}
        breadcrumb={careerHero.breadcrumb}
        image={careerHero.image}
      />
      <Ticker />

      {/* Why Join Us */}
      <SectionWrapper>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-(--primary-color)">
            Join Us
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold">
            Shape the Future of Science
          </h2>
          <p className="mt-6 text-white/70">
            We&apos;re building a team of passionate scientists, engineers, and
            problem-solvers dedicated to advancing research and improving lives.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-3 mb-20">
          {[
            { value: "50+", label: "Team Members" },
            { value: "8", label: "Countries" },
            { value: "92%", label: "Employee Satisfaction" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-3xl sm:text-4xl font-bold text-(--primary-color)">
                {stat.value}
              </p>
              <p className="mt-2 text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Culture Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {cultureImages.map((img, i) => (
            <div key={i} className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src={img}
                alt={`Culture ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <GlassCard key={i} className="p-6 border-white/10">
              <div className="text-3xl sm:text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-white/60 text-sm">{b.description}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Open Positions */}
      <SectionWrapper fullBleed>
        <Panel className="bg-(--primary-color)">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Open Positions
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Join Our Team
            </h2>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(d)}
                className={`px-5 py-2 rounded-full text-xs tracking-wide transition-all ${department === d ? "bg-white text-(--primary-color)" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-(--primary-color) transition">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <FiBriefcase /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock /> {job.type} · {job.experience}
                      </span>
                    </div>
                  </div>
                  <FiChevronRight className="text-white/40 group-hover:text-(--primary-color) text-xl transition" />
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <p className="text-center text-white/60 py-12">
              No open positions in this department
            </p>
          )}
        </Panel>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Don&apos;t See Your Role?
          </h2>
          <p className="mt-4 text-white/70">
            We&apos;re always looking for talented individuals. Send us your
            resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <div className="mt-8">
            <Button href="/contact" label="Get in Touch" size="lg" />
          </div>
        </div>
      </SectionWrapper>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-(--primary-color) rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white">
              {selectedJob.title}
            </h3>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/70">
              <span>{selectedJob.department}</span>
              <span>•</span>
              <span>{selectedJob.location}</span>
              <span>•</span>
              <span>{selectedJob.type}</span>
              <span>•</span>
              <span>{selectedJob.experience}</span>
            </div>
            <p className="mt-6 text-white/80">{selectedJob.description}</p>
            <p className="mt-6 text-white/60 text-sm">
              Interested? Send your resume and cover letter to
              careers@labrix.com
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                label="Apply Now"
                size="sm"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
