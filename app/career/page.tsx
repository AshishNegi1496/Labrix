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
        <div className="text-center max-w-3xl mx-auto">
          <Badge>Join Us</Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold">
            Shape the Future of Science
          </h2>
          <p className="mt-6 ">
            We&apos;re building a team of passionate scientists, engineers, and
            problem-solvers dedicated to advancing research and improving lives.
          </p>
        </div>
      </SectionWrapper>

      {/* Open Positions */}
      <SectionWrapper fullBleed>
        <Panel className="bg-(--primary-color)">
          <div className="text-center mb-12">
            <p className="type-h5 uppercase tracking-[0.3em] text-white/60">
              Open Positions
            </p>
            <p className="mt-2 type-h3 sm:text-3xl md:text-4xl font-semibold text-white">
              Join Our Team
            </p>
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
          <div className="max-w-4xl mx-auto space-y-4 ">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="type-h5 font-semibold text-white group-hover:text-(--color-accent)  transition">
                      {job.title}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 type-h6 text-white/60">
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
                  <FiChevronRight className="text-white/40 group-hover:text-(--color-accent) text-2xl transition" />
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
