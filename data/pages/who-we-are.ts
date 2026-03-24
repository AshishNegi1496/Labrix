import { deepFreeze } from "../utils";

export const whoWeAreMeaningPoints = deepFreeze([
  "Deep understanding of clinical trial operations",
  "Calm execution in complex, regulated environments",
  "Clear ownership and reliable delivery",
  "Long term partnerships built on trust",
] as const);

export const whoWeAreWhatThisMeansPoints = deepFreeze([
  "Stay aligned across teams, sites, and stakeholders",
  "Make decisions with better clarity and visibility",
  "Maintain consistency and readiness across studies",
  "Reduce day to day operational complexity",
] as const);

export const whoWeAreLeadership = deepFreeze([
  {
    name: "Dr. Maya Srinivasan",
    role: "Chief Executive Officer",
    image: "/images/author-1.jpg",
    summary:
      "Sets the strategic direction for the organization with a strong focus on dependable delivery, and partner trust across complex clinical programs.",
    highlights: ["Strategy & governance", "Operational quality"],
  },
  {
    name: "Rahul Deshmukh",
    role: "Chief Product Officer",
    image: "/images/author-2.jpg",
    summary:
      "Leads product vision and platform decisions around real-world study workflows, scalable architecture, and clear operational usability for trial teams.",
    highlights: ["Product strategy", "Workflow design", "Platform scale"],
  },
  {
    name: "Emily Carter",
    role: "Head of Clinical Solutions",
    image: "/images/author-3.jpg",
    summary:
      "Brings clinical and operational needs into practical solution design, helping sponsors and delivery teams execute with clarity, control, and consistency.",
    highlights: ["Clinical operations", "Solution design", "Execution clarity"],
  },
] as const);

export const whoWeAreLeadershipPrinciples = deepFreeze([
  {
    title: "Reliability first",
    text: "Stability and consistency are essential.",
  },
  {
    title: "Clarity over complexity",
    text: "Simple, purposeful approaches.",
  },
  {
    title: "Strong follow through",
    text: "Planning and delivery with discipline.",
  },
  {
    title: "Practical innovation",
    text: "Improving how work gets done without unnecessary change.",
  },
] as const);

export const whoWeAreMissionPoints = deepFreeze([
  "Linking essential workflows into one cohesive operating system",
  "Improving data quality and giving teams better oversight",
  "Designing solutions that scale across programs, phases, and global regions",
] as const);

export const whoWeAreHowWeWorkPoints = deepFreeze([
  "We listen before we design",
  "We prioritise clarity over speed",
  "We plan carefully and follow through",
  "We take responsibility for outcomes",
] as const);

export const whoWeAreCulture = deepFreeze([
  {
    title: "Integrity",
    text: "Every decision, workflow, and dataset meets the highest standards of compliance and accuracy.",
  },
  {
    title: "Ownership",
    text: "We take accountability across every layer, ensuring reliability and trust.",
  },
  {
    title: "Innovation",
    text: "We challenge legacy systems and build modern, scalable clinical platforms.",
  },
  {
    title: "Collaboration",
    text: "We operate cross-functionally to deliver intuitive and stable systems.",
  },
  {
    title: "Impact",
    text: "Everything we build ultimately contributes to better patient outcomes.",
  },
] as const);

export const whoWeAreTeamStats = deepFreeze([
  { value: 40, suffix: "+", label: "Years of Consolidated Experience" },
  { value: 1000, suffix: "+", label: " Clinical Trials Supported" },
  {
    value: 500,
    suffix: "+",
    label: "Clients Catered with IRT and CTSM Services",
  },
] as const);
