// FaqItem.tsx
"use client";

import { FiPlus } from "react-icons/fi";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  q: string;
  a: string;
};

export const FaqItem = ({ q, a }: Props) => {
  const { value: open, toggle } = useToggle(false);

  return (
    <div className="rounded-xl border overflow-hidden transition-colors">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left type-h5"
      >
        <span>{q}</span>

        {/* Icon */}
        <FiPlus
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>

      {/* Animated content */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm text-(--text-description)">{a}</div>
        </div>
      </div>
    </div>
  );
};
