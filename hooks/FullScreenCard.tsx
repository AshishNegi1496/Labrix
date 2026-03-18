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
        opacity: isFuture ? 0 : hidePast ? 0 : isPast ? 0.6 : 1,
        scale: isPast ? 1 - stackDepth * 0.03 : isActive ? 1 : 0.96,
        y: isPast ? -stackDepth * 26 : isActive ? 0 : 110,
        filter: isActive ? "blur(0px)" : isPast ? "blur(2px)" : "blur(6px)",
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div
        className={`w-[90%] max-w-6xl rounded-3xl p-10 shadow-2xl text-white ${bgColor}`}
      >
        {/* Header */}
        <div className="flex justify-between text-xs uppercase tracking-widest text-white/60">
          <span>{`USP ${String(index + 1).padStart(2, "0")}`}</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">iClinRT</span>
        </div>

        {/* Content */}
        <div className="mt-6 flex gap-6 items-start">
          <div className="h-14 w-14 flex items-center justify-center rounded-2xl border border-white/30 bg-white/10">
            <Icon className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold">{item.title}</h3>

            <ul className="mt-4 space-y-3 text-white/80">
              {item.items.map((point: string) => (
                <li key={point} className="flex gap-2">
                  <FiCheck className="mt-1 text-(--color-accent)" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
