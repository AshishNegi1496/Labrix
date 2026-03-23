import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  index: number;
  activeIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
};

export const FullScreenCard = ({ item, index, activeIndex, Icon }: Props) => {
  const delta = activeIndex - index;
  const isActive = delta === 0;
  const isPast = delta > 0;
  const isFuture = delta < 0;
  const maxStack = 2;
  const stackDepth = Math.min(delta, maxStack);
  const hidePast = delta > maxStack;
  const cardColors = ["bg-(--color-primary)", "bg-(--color-orange)"];

  const bgColor = cardColors[index % cardColors.length];
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: index, // stack order
        pointerEvents: isActive ? "auto" : "none",
      }}
      initial={false}
      animate={{
        opacity: isFuture ? 0 : hidePast ? 0 : isPast ? 0.72 : 1,
        scale: isPast ? 1 - stackDepth * 0.05 : isActive ? 1 : 0.94,
        y: isPast ? -stackDepth * 22 : isActive ? 0 : 120,
        filter: isActive ? "blur(0px)" : isPast ? "blur(1px)" : "blur(6px)",
      }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 22,
        mass: 0.9,
      }}
    >
      <div
        className={`relative w-[92%] max-w-6xl overflow-hidden rounded-3xl border border-white/15 p-10 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${bgColor}`}
      >
        <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-black/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20" />

        {/* Header */}
        <div className="relative flex items-center justify-between text-[11px] font-semibold  tracking-[0.35em] text-white/70">
          {/* <span>{`USP ${String(index + 1).padStart(2, "0")}`}</span> */}
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            iClinRT
          </span>
        </div>

        {/* Content */}
        <div className="relative mt-8 flex items-start gap-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 shadow-lg shadow-black/10">
            <Icon className="h-8 w-8 text-white" />
          </div>

          <div>
            <p className="type-h2 text-2xl font-semibold text-white">
              {item.title}
            </p>

            <ul className="mt-4 space-y-3 text-white/80">
              {item.items.map((point: string) => (
                <li key={point} className="flex gap-2 text-[15px]">
                  <FiCheck className="mt-1 text-(--color-accent)" />
                  <span className="type-h6">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
