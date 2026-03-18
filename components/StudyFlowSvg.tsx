"use client";

import { motion, Variants } from "framer-motion";

type Step = {
  lines: string[];
  y: number;
  w: number;
  h: number;
  textSize?: number;
  lineHeight?: number;
};

type Column = {
  id: string;
  x: number;
  label: { text: string; w?: number };
  phase: string[];
  steps: Step[];
  note?: { text: string; y: number; size?: number };
};

const easeOut = [0.25, 0.1, 0.25, 1] as const;
const easeInOut = [0.42, 0, 0.58, 1] as const;

const boxVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const textVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const lineVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.2, ease: easeInOut },
  },
};

const colY = 90;
const colW = 260;
const colH = 460;
const labelY = colY + colH - 38;
const labelH = 30;
const phaseStartY = 600;
const phaseLineHeight = 18;

const columns: Column[] = [
  {
    id: "study-planning",
    x: 80,
    label: { text: "Study Planning", w: 170 },
    phase: ["Study Incentive Phase", "Appx. 1 Week"],
    note: { text: "(Protocol, Annotated CRF etc)", y: colY + 280, size: 10 },
    steps: [
      {
        lines: ["Study Protocol", "& Project", "Documents"],
        y: colY + 30,
        w: 200,
        h: 58,
      },
      {
        lines: ["Project Kick Off"],
        y: colY + 115,
        w: 200,
        h: 56,
      },
      {
        lines: ["Project", "Management Plan"],
        y: colY + 200,
        w: 200,
        h: 58,
      },
    ],
  },
  {
    id: "study-design",
    x: 380,
    label: { text: "Study Design", w: 160 },
    phase: ["Study Build Phase", "Appx. 2 Weeks"],
    steps: [
      {
        lines: ["URS"],
        y: colY + 20,
        w: 110,
        h: 40,
        textSize: 11,
      },
      {
        lines: ["Configure IWRS"],
        y: colY + 75,
        w: 200,
        h: 56,
      },
      {
        lines: ["Configure", "Notifications & Alerts"],
        y: colY + 155,
        w: 220,
        h: 60,
      },
      {
        lines: ["Dummy Kit List"],
        y: colY + 240,
        w: 180,
        h: 54,
      },
      {
        lines: ["Dummy", "Randomization List"],
        y: colY + 310,
        w: 220,
        h: 56,
      },
    ],
  },
  {
    id: "validation",
    x: 680,
    label: { text: "System Validation", w: 190 },
    phase: ["Validation Phase", "Appx. 1 Week"],
    steps: [
      {
        lines: ["Unit Testing"],
        y: colY + 40,
        w: 200,
        h: 56,
      },
      {
        lines: ["UAT"],
        y: colY + 140,
        w: 110,
        h: 50,
      },
      {
        lines: ["User Training"],
        y: colY + 220,
        w: 200,
        h: 56,
      },
    ],
  },
  {
    id: "support",
    x: 980,
    label: { text: "Support", w: 130 },
    phase: ["Go Live"],
    steps: [
      {
        lines: [
          "Live Study Set Up:",
          "Users Sites,",
          "Depots, Rand &",
          "Kit Lists",
        ],
        y: colY + 20,
        w: 230,
        h: 86,
        lineHeight: 13,
      },
      {
        lines: ["Go-Live"],
        y: colY + 140,
        w: 170,
        h: 56,
      },
      {
        lines: ["Product Support"],
        y: colY + 220,
        w: 190,
        h: 56,
      },
    ],
  },
  {
    id: "closeout",
    x: 1280,
    label: { text: "Study Close Phase", w: 190 },
    phase: [
      "Study Conduct &",
      "Study Closeout Phase",
      "Based on study duration",
    ],
    steps: [
      {
        lines: ["Data Transfer"],
        y: colY + 70,
        w: 200,
        h: 56,
      },
      {
        lines: ["Study Closure"],
        y: colY + 160,
        w: 200,
        h: 56,
      },
      {
        lines: ["Data Archival &", "Retrieval"],
        y: colY + 250,
        w: 230,
        h: 64,
      },
    ],
  },
];

type SvgTextProps = {
  x: number;
  y: number;
  lines: string[];
  size?: number;
  lineHeight?: number;
  weight?: number;
  align?: "start" | "middle" | "end";
};

const SvgText = ({
  x,
  y,
  lines,
  size = 11,
  lineHeight = 14,
  weight = 500,
  align = "middle",
}: SvgTextProps) => (
  <motion.text
    x={x}
    y={y}
    textAnchor={align}
    className="fill-black"
    style={{ fontSize: size, fontWeight: weight }}
    variants={textVariant}
  >
    {lines.map((line, index) => (
      <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>
        {line}
      </tspan>
    ))}
  </motion.text>
);

export default function StudyFlowSvg() {
  return (
    <div className="w-full overflow-x-auto">
      <motion.svg
        viewBox="0 0 1800 720"
        className="w-full min-w-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <defs>
          <pattern
            id="dotPattern"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="#fff7ed" />
            <circle cx="2.2" cy="2.2" r="1.2" fill="#fdba74" />
          </pattern>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="#f97316" />
          </marker>
        </defs>

        <motion.text
          x="80"
          y="52"
          className="fill-black text-[26px] font-semibold"
          variants={textVariant}
        >
          Our Approach
        </motion.text>
        <motion.line
          x1="265"
          y1="46"
          x2="1720"
          y2="46"
          stroke="#f97316"
          strokeWidth="3"
          variants={lineVariant}
        />

        {columns.map((col) => {
          const centerX = col.x + colW / 2;
          const labelWidth = col.label.w ?? 170;
          const labelX = col.x + (colW - labelWidth) / 2;

          return (
            <g key={col.id}>
              <motion.rect
                x={col.x}
                y={colY}
                width={colW}
                height={colH}
                rx="28"
                fill="url(#dotPattern)"
                stroke="#f97316"
                strokeWidth="2"
                variants={boxVariant}
              />

              {col.steps.map((step, index) => {
                const stepX = col.x + (colW - step.w) / 2;
                const lineHeight = step.lineHeight ?? 14;
                const totalHeight = (step.lines.length - 1) * lineHeight;
                const textY = step.y + step.h / 2 - totalHeight / 2;
                return (
                  <g key={`${col.id}-${index}`}>
                    <motion.rect
                      x={stepX}
                      y={step.y}
                      width={step.w}
                      height={step.h}
                      rx="12"
                      className="fill-white"
                      stroke="#f97316"
                      strokeWidth="2"
                      variants={boxVariant}
                    />
                    <SvgText
                      x={centerX}
                      y={textY}
                      lines={step.lines}
                      size={step.textSize ?? 11}
                      lineHeight={lineHeight}
                      weight={500}
                    />
                  </g>
                );
              })}

              {col.steps.slice(0, -1).map((step, index) => {
                const next = col.steps[index + 1];
                return (
                  <motion.line
                    key={`${col.id}-line-${index}`}
                    x1={centerX}
                    y1={step.y + step.h}
                    x2={centerX}
                    y2={next.y}
                    stroke="#f97316"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    variants={lineVariant}
                  />
                );
              })}

              {col.note ? (
                <SvgText
                  x={centerX}
                  y={col.note.y}
                  lines={[col.note.text]}
                  size={col.note.size ?? 10}
                  lineHeight={12}
                  weight={500}
                />
              ) : null}

              <motion.rect
                x={labelX}
                y={labelY}
                width={labelWidth}
                height={labelH}
                rx="14"
                className="fill-white"
                stroke="#f97316"
                strokeWidth="2"
                variants={boxVariant}
              />
              <SvgText
                x={centerX}
                y={labelY + 20}
                lines={[col.label.text]}
                size={11}
                lineHeight={14}
                weight={600}
              />

              {col.phase.map((line, index) => (
                <SvgText
                  key={`${col.id}-phase-${index}`}
                  x={centerX}
                  y={phaseStartY + index * phaseLineHeight}
                  lines={[line]}
                  size={11}
                  lineHeight={12}
                  weight={500}
                />
              ))}
            </g>
          );
        })}

        {columns.slice(0, -1).map((col, index) => {
          const next = columns[index + 1];
          const fromStep = col.steps[col.steps.length - 1];
          const toStep = next.steps[0];
          const fromX = col.x + (colW - fromStep.w) / 2 + fromStep.w;
          const toX = next.x + (colW - toStep.w) / 2;
          const y = fromStep.y + fromStep.h / 2;

          return (
            <motion.line
              key={`${col.id}-to-${next.id}`}
              x1={fromX}
              y1={y}
              x2={toX}
              y2={y}
              stroke="#f97316"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              variants={lineVariant}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}
