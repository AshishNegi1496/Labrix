import { deepFreeze } from "../utils";

export const homeWhyChoosePoints = deepFreeze([
  {
    title: "Deep Clinical Domain Expertise",
    description:
      "Strong experience across clinical trial systems, operational workflows, and regulatory expectations, ensuring technology that fits real-world trial execution.",
  },
  {
    title: "Reliable, Structured Digital Foundations",
    description:
      "Protocol-aligned platforms designed for operational stability, continuity, and consistent performance across the full clinical lifecycle.",
  },
  {
    title: "Integrated and Connected Trial Ecosystems",
    description:
      "Seamless integration with existing clinical platforms and unified workflows that improve coordination between sponsors, CROs, sites, and partners, reducing data silos and fragmentation.",
  },
  {
    title: "Data Integrity and Compliance by Design",
    description:
      "Technology built to support clean, consistent, audit-ready data across systems from enrollment through close-out, aligned with global research standards.",
  },
  {
    title: "Scalable, Collaborative Global Delivery",
    description:
      "Flexible systems that adapt to protocol changes, multi-country studies, and evolving needs, delivered through close partnership and global trial experience.",
  },
] as const);

export const homeResearchFields = deepFreeze([
  {
    title: "Precision Randomization & Treatment Control",
    description:
      "Balanced allocation across arms and cohorts, with safeguarded emergency unblinding.",
    image: "/images/treatment.avif",
  },
  {
    title: "Integrated IP Supply & Kit Operations",
    description:
      "Unified oversight of inventory, resupply, kit assignment, expiry, transfers, and temperature mapping.",
    image: "/images/kit-ops.avif",
  },
  {
    title: "Full Chain of Custody Accountability",
    description:
      "Complete traceability of every kit from creation to final reconciliation and destruction.",
    image: "/images/custody.avif",
  },
  {
    title: " Streamlined Participant & Visit Workflow",
    description:
      "Protocol aligned configuration for screening, enrolment, and visit execution across all sites.",
    image: "/images/workflow.avif",
  },
  {
    title: "Real Time Operational Intelligence",
    description:
      "Dynamic dashboards, detailed reports, and event driven alerts for confident oversight.",
    image: "/images/operations.avif",
  },
  {
    title: "Compliance Ready, Connected, and Scalable",
    description:
      "Aligned with global regulations and seamlessly integrated with CTMS/EDC for multi region, multi phase trials.",
    image: "/images/complaince.avif",
  },
] as const);

export const homePageTestimonials = deepFreeze([
  {
    name: "Grace Martin",
    role: "Lab Supervisor",
    text: "ClinRT helped us streamline trial logistics and maintain full oversight across multiple study sites.",
    image: "/images/author-2.jpg",
  },
  {
    name: "Emma Davis",
    role: "Project Coordinator",
    text: "The platform simplified our coordination between research teams and improved operational clarity.",
    image: "/images/author-3.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
  },
  {
    name: "Ashish Sharma",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
  },
  {
    name: "Dennis Levi",
    role: "Research Analyst",
    text: "From planning to execution, the tools allowed us to track every stage of our trials confidently.",
    image: "/images/author-1.jpg",
  },
] as const);

export const homeMovingWords = deepFreeze([
  "Interactive Response Technology",
  "Randomization & Trial Supply Management",
  "Subject Management",
  "Drug Supply Management",
  "Auto Shipments",
  "Kit Management",
  "Drug Accountability",
  "Subject Unblinding",
  "Visit Schedule Management",
  "Inventory Tracking",
  "Dynamic Dashboards",
  "Real-Time Reporting",
  "Notifications & Alerts",
  "Supply Prediction Engine",
  "Buffer Stock Strategy",
  "Retention Sample Management",
  "Kit Expiry Tracking",
  "Cohort & Strata-Based Randomization",
  "Adaptive Trial Support",
  "Regulatory-Compliant Workflows",
] as const);

export const homePosterItems = deepFreeze([
  {
    title: "Protocol-Ready IRT Stack",
    tag: "Launch",
    image: "/images/case-study-1.jpg",
    href: "/what-we-build",
  },
  {
    title: "Supply Forecasting Console",
    tag: "Update",
    image: "/images/case-study-2.jpg",
    href: "/clinrt-world",
  },
  {
    title: "Live Trial Dashboards",
    tag: "Insight",
    image: "/images/case-study-3.jpg",
    href: "/clinrt-world",
  },
  {
    title: "Demo at Home",
    tag: "Insight",
    image: "/images/case-study-3.jpg",
    href: "/clinrt-world",
  },
  {
    title: "Trial at Lab",
    tag: "Research",
    image: "/images/case-study-3.jpg",
    href: "/clinrt-world",
  },
] as const);

export const homeNewsItems = deepFreeze([
  {
    title: "Adaptive randomization workflows now supported across cohorts.",
    date: "Mar 2026",
  },
] as const);

export const homeFaqItems = deepFreeze([
  {
    q: "What is iClinRT?",
    a: "iClinRT is our configurable Interactive Response Technology platform that supports clinical trials with subject management, randomization, drug supply oversight, real-time dashboards, automated alerts, and end-to-end kit tracking. It is built to handle complex study designs and streamline day-to-day trial execution.",
  },
  {
    q: "How long does it take to set up an IRT system for a new study?",
    a: "Our standard build-to-go-live timeline is approximately 4 weeks, even for complex randomization and supply requirements. This includes configuration, validation, training, and study readiness.",
  },
  {
    q: "Does iClinRT support complex randomization designs?",
    a: "Yes. iClinRT is built to support stratified, cohort-based, site-based, block, and multi-arm randomization approaches. It can adapt to protocol amendments and can manage subject subgroups and complex visit schedules.",
  },
  {
    q: "Can iClinRT manage drug supplies and auto-shipments?",
    a: "Absolutely. The system tracks kits from origin to destruction, handles expiry updates, supports cold-chain and temperature excursion assessment, and automates shipments based on predefined triggers and predictive logic. It also manages site-to-site transfers and retention samples.",
  },
  {
    q: "Is emergency unblinding supported?",
    a: "Yes. iClinRT provides a secure, audit-ready emergency unblinding process for use during medical emergencies or safety concerns. Access is controlled and fully traceable.",
  },
  {
    q: "What kind of reports and dashboards does iClinRT provide?",
    a: "The platform offers real-time dashboards and configurable reports covering enrollment, randomization, subject visits, supply status, compliance, site performance, and more. Reports can be filtered by country, site, depot, or user role.",
  },
  {
    q: "How does iClinRT maintain data integrity and compliance?",
    a: "iClinRT complies with 21 CFR Part 11, GCP requirements, and global data privacy standards like GDPR and HIPAA. It maintains full audit trails, access controls, encryption, and complete validation documentation.",
  },
  {
    q: "Can iClinRT integrate with EDC, CTMS, or other systems?",
    a: "Yes. iClinRT can integrate with external clinical systems such as EDC and CTMS to support seamless data flow and reduce operational duplication.",
  },
  {
    q: "What kind of support does ClinRT offer?",
    a: "We offer 24x7 helpdesk support, backed by domain experts in IRT and clinical trial supply management. Our team assists with technical troubleshooting, protocol queries, site support, and ongoing study monitoring.",
  },
  {
    q: "Can the system handle protocol amendments?",
    a: "Yes. iClinRT is built to accommodate changes such as visit schedule updates, randomization modifications, and supply logic adjustments without disrupting ongoing study activities.",
  },
  {
    q: "Does iClinRT support global, multi-site trials?",
    a: "Yes. The platform is designed for global scalability across programs, phases, and regions. It handles multi-country supply logic, depot structures, time-zone alignment, and role-based access for global teams.",
  },
  {
    q: "What distinguishes ClinRT from other IRT providers?",
    a: "We combine a highly configurable platform with deep domain expertise over 50 years of leadership experience, support for 1000+ trials, and 500+ global clients. Our strength lies in fast deployment, strong supply chain capabilities, and 24x7 expert support.",
  },
  {
    q: "How secure is my study data?",
    a: "All study data is encrypted, access-controlled, and fully audit-tracked. We follow secure architecture practices and jurisdiction specific data protection requirements to ensure privacy and compliance.",
  },
  {
    q: "Do you offer demos or consultations?",
    a: "Yes. You can request a live demo through our enquiry form, and our team will walk you through the platform, discuss your protocol needs, and address any questions.",
  },
  {
    q: "How do I get started?",
    a: "Simply submit an enquiry or request a demo. Our team will gather your study details, propose a configuration plan, and guide you through the build, validation, training, and go-live process.",
  },
] as const);
