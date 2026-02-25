import { FiActivity, FiClipboard, FiBarChart2, FiUsers } from "react-icons/fi";
import { makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type {
  BlogPost,
  CaseStudy,
  FaqItem,
  HomeHero,
  ImageCard,
  ResearchField,
  TeamMember,
  Testimonial,
  WhatWeDoData,
} from "../types";
import {
  validateBlogPosts,
  validateCaseStudies,
  validateFaqs,
  validateHomeHero,
  validateImageCards,
  validateResearchFields,
  validateTeamMembers,
  validateTestimonials,
  validateWhatWeDo,
} from "../validators";

/** Home page hero and card imagery. */
export const homeImages = deepFreeze({
  hero: makeSeedImage("labrix-hero", 1600, 900),
  feature1: makeSeedImage("labrix-feature-1", 640, 480),
  feature2: makeSeedImage("labrix-feature-2", 640, 480),
  feature3: makeSeedImage("labrix-feature-3", 640, 480),
  feature4: makeSeedImage("labrix-feature-4", 640, 480),
  wide: makeSeedImage("labrix-wide", 1400, 700),
  lab: makeSeedImage("labrix-lab", 1200, 800),
  sample: makeSeedImage("labrix-sample", 800, 600),
});

/** Hero content and CTAs. */
export const homeHero: HomeHero = validateHomeHero(
  deepFreeze({
    eyebrow: "The Science Behind Smarter Solutions",
    title: "Trusted Scientific Solutions for a Smarter, Safer World",
    description: "Accurate testing, custom research, and expert consultation.",
    primaryCta: { href: "/services", label: "Get Started" },
    secondaryCta: { href: "/contact", label: "Explore" },
    videoSrc: "/videos/homePageVideo.mp4",
    stats: [
      { value: 16, suffix: "+", label: "years" },
      { value: 1200, suffix: "+", label: "clients" },
    ],
    statsSeparator: ".",
    videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  }),
);

/** About section copy. */
export const homeAbout = deepFreeze({
  badge: "About our Laboratory",
  title: "Pioneering scientific research into real-world solutions",
  description: "Translating complex science into practical outcomes.",
});

/** Research fields section copy. */
export const homeResearch = deepFreeze({
  badge: "Key Research Fields",
  title: "Leading innovation across",
  titleEmphasis: "critical research fields",
  description:
    "Each research field is supported by expert teams and cutting-edge technologies, ensuring precision, innovation, and real-world relevance.",
});

/** Why choose us section copy. */
export const homeWhyChoose = deepFreeze({
  badge: "Why choose us",
  title: "Powered by technology, driven by curiosity",
  description: "Accurate, innovative, future-ready research solutions.",
  items: [
    { title: "Proven Track Record", text: "Successful studies & outcomes" },
    { title: "Collaborative Approach", text: "Clients at every step" },
  ],
  image: "/images/why-choose-body-image.jpg",
});

/** Case studies section copy. */
export const homeCaseStudies = deepFreeze({
  badge: "Our Case Studies",
  title: "Innovative solutions backed by scientific rigor",
  cta: { href: "/case-studies", label: "Explore All Studies" },
});

/** FAQ section copy. */
export const homeFaq = deepFreeze({
  badge: "Frequently Asked Questions",
  title: "Browse our most asked questions",
  description:
    "Weâ€™ve compiled answers common questions about our lab services and research.",
  cta: { href: "/faqs", label: "View All FAQs" },
});

/** Testimonials section copy. */
export const homeTestimonials = deepFreeze({
  badge: "Our Testimonials",
  title: "What our clients say about us",
});

/** Team section copy. */
export const homeTeam = deepFreeze({
  badge: "Our Team",
  title: "The brilliant minds powering our research team",
});

/** Feature cards beneath the hero. */
export const featureCards: ReadonlyArray<ImageCard> = validateImageCards(
  deepFreeze([
    {
      title: "How does it work",
      text: "From sample intake to reporting, every step is documented and verified.",
      image: homeImages.feature1,
    },
    {
      title: "Clinical diagnostics",
      text: "Validated assays and fast turnaround for patient-critical data.",
      image: homeImages.feature2,
    },
  ]),
  "featureCards",
);

/** Additional research cards (currently unused in UI). */
export const researchCards: ReadonlyArray<ImageCard> = validateImageCards(
  deepFreeze([
    {
      title: "Precision analytics",
      text: "Signal processing, high-throughput screening, and deep data analysis.",
      image: homeImages.feature3,
    },
    {
      title: "Cellular systems",
      text: "Human-cell models and controlled environments for repeatable results.",
      image: homeImages.feature4,
    },
    {
      title: "Translational science",
      text: "We bridge discovery with real-world delivery for scaled impact.",
      image: homeImages.feature1,
    },
  ]),
  "researchCards",
);

/** Innovation cards (currently unused in UI). */
export const innovationCards = deepFreeze([
  { title: "Biotech", text: "From discovery to commercialization support." },
  {
    title: "Environment",
    text: "Monitoring and compliance with clear insights.",
  },
  { title: "Testing", text: "Validated, repeatable protocols across labs." },
  { title: "Research", text: "Custom programs tailored to your objectives." },
]);

/** Solution cards (currently unused in UI). */
export const solutionCards = validateImageCards(
  deepFreeze([
    {
      title: "Analytical testing",
      text: "Precision chemistry and assay development.",
      image: homeImages.feature2,
    },
    {
      title: "Toxicology analysis",
      text: "Safety testing across complex compounds.",
      image: homeImages.feature3,
    },
    {
      title: "Pharmaceutical testing",
      text: "Regulatory-ready data and reporting.",
      image: homeImages.feature4,
    },
  ]),
  "solutionCards",
);

/** FAQ titles (currently unused in UI). */
export const faqTitles = deepFreeze([
  "How quickly can we start a project?",
  "Do you provide custom research programs?",
  "Can we combine testing and product strategy?",
  "What does onboarding look like?",
]);

/** Blog post teasers (currently unused in UI). */
export const homeBlogPosts: ReadonlyArray<BlogPost> = validateBlogPosts(
  deepFreeze([
    {
      title: "What it takes to ship safer diagnostics",
      date: "Feb 12, 2026",
      image: homeImages.feature2,
    },
    {
      title: "Building data pipelines you can trust",
      date: "Jan 26, 2026",
      image: homeImages.feature3,
    },
    {
      title: "Why lab partnerships need clarity early",
      date: "Jan 08, 2026",
      image: homeImages.feature4,
    },
  ]),
);

/** Research fields shown in the innovation section. */
export const researchFields: ReadonlyArray<ResearchField> =
  validateResearchFields(
    deepFreeze([
      {
        title: "Biomedical Research",
        description: "Applying biological systems and organisms",
        image: "/images/service-1.jpg",
        icon: "/images/icon-service-1.svg",
      },
      {
        title: "Materials Science",
        description: "Investigating advanced material properties",
        image: "/images/service-1.jpg",
        icon: "/images/icon-service-2.svg",
      },
      {
        title: "Chemical Safety",
        description: "Assessing substance impact and compliance",
        image: "/images/service-1.jpg",
        icon: "/images/icon-service-3.svg",
      },
      {
        title: "Diagnostic Sciences",
        description: "Scientific methods for diagnostics",
        image: "/images/service-1.jpg",
        icon: "/images/icon-service-4.svg",
      },
    ]),
  );

/** "What we do" section content. */
export const whatWeDoData: WhatWeDoData = validateWhatWeDo(
  deepFreeze({
    label: "What We Do",
    title: (
      <>
        Transforming scientific questions <br />
        into real-world results
      </>
    ),
    description:
      "At our core, we are dedicated to advancing scientific understanding through purposeful research tailored to address todayâ€™s most pressing challenges.",
    cta: {
      label: "Contact us",
      href: "/contact",
    },
    counter: {
      value: 98,
      suffix: "%",
      title: "Environmental Science",
      text: "Our lab delivers data-driven insights that help protect natural.",
    },
    items: [
      {
        icon: FiActivity,
        title: "Comprehensive Laboratory Testing",
        text: "Advanced testing across scientific disciplines with validated results.",
      },
      {
        icon: FiClipboard,
        title: "Research Design & Methodology",
        text: "Tailored strategies aligned with scientific best practices.",
      },
      {
        icon: FiBarChart2,
        title: "Data Analysis & Interpretation",
        text: "Turning complex datasets into clear, actionable insights.",
      },
      {
        icon: FiUsers,
        title: "Collaborative Partnerships",
        text: "Working with institutions, industry, and government agencies.",
      },
    ],
  }),
);

/** Case studies showcased on the home page. */
export const caseStudies: ReadonlyArray<CaseStudy> = validateCaseStudies(
  deepFreeze([
    {
      title: "Genomic Research Unlocks Drought-Resistant Crop Varieties",
      image: "/images/case-study-1.jpg",
      href: "/case-studies/genomic-research",
    },
    {
      title: "Detecting Water Contaminants Using Advanced Spectroscopy",
      image: "/images/case-study-2.jpg",
      href: "/case-studies/water-contaminants",
    },
    {
      title: "Accelerating Vaccine Development with Rapid Antigen Testing",
      image: "/images/case-study-3.jpg",
      href: "/case-studies/vaccine-development",
    },
  ]),
);

/** FAQs used in the accordion. */
export const faqs: ReadonlyArray<FaqItem> = validateFaqs(
  deepFreeze([
    {
      q: "What types of research services do you offer?",
      a: "We specialize in laboratory testing, analytical research, custom experiments, and scientific data interpretation.",
    },
    {
      q: "Can I request a custom research project?",
      a: "Yes, we design tailored research projects aligned with your specific goals and requirements.",
    },
    {
      q: "How long does a typical research project take?",
      a: "Project timelines vary based on scope and complexity, but we always provide clear estimates upfront.",
    },
    {
      q: "Are your labs certified or accredited?",
      a: "Yes, our laboratories follow certified procedures and comply with industry accreditation standards.",
    },
    {
      q: "How do I submit a sample or start a project?",
      a: "You can contact us directly or submit a request through our website to begin the process.",
    },
  ]),
);

/** Testimonials displayed in the home slider. */
export const testimonials: ReadonlyArray<Testimonial> = validateTestimonials(
  deepFreeze([
    {
      name: "Jenny Wilson",
      role: "Research Analyst",
      image: "/images/author-1.jpg",
      quote:
        "You'll meet with our scientific advisors to define your research goals, scope, and budget with complete transparency.",
      video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
    },
    {
      name: "Grace Martin",
      role: "Lab Supervisor",
      image: "/images/author-2.jpg",
      quote:
        "Their analytical depth and scientific rigor helped us accelerate results without compromising accuracy.",
      video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
    },
    {
      name: "Emma Davis",
      role: "Project Coordinator",
      image: "/images/author-3.jpg",
      quote:
        "From planning to execution, the entire experience felt structured, professional, and results-driven.",
      video: "https://www.youtube.com/watch?v=Y-x0efG1seA",
    },
  ]),
);

/** Team member profiles showcased on the home page. */
export const teamMembers: ReadonlyArray<TeamMember> = validateTeamMembers(
  deepFreeze([
    {
      name: "Darlene Robertson",
      role: "Molecular Biologist",
      image: "/images/team-1.jpg",
    },
    {
      name: "Dr. Olivia Hughes",
      role: "Research Chemist",
      image: "/images/team-2.jpg",
    },
    {
      name: "Cameron Williamson",
      role: "Project Lead",
      image: "/images/team-3.jpg",
    },
    {
      name: "Leslie Alexander",
      role: "Lab Manager",
      image: "/images/team-4.jpg",
    },
  ]),
);
