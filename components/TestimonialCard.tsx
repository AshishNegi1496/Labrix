import Image from "next/image";
import { FiPlay } from "react-icons/fi";

type Props = {
  name: string;
  role: string;
  image?: string;
  quote: string;
  video?: string;
  active?: boolean;
};

export const TestimonialCard = ({
  name,
  role,
  image = "/images/default-avatar.jpg",
  quote,
  video,
  active,
}: Props) => {
  return (
    <div
      className={`
        shrink-0 w-[min(90vw,38.75rem)] transition-all duration-700 ease-out
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-50"}
      `}
    >
      <div className="flex gap-6 rounded-2xl border bg-white/5 p-6">
        {/* Author image */}
        <div className="relative shrink-0">
          <Image
            src={image}
            alt={name}
            width={90}
            height={90}
            className="h-60 rounded-xl object-cover"
          />

          {video && (
            <a
              href={video}
              target="_blank"
              rel="noreferrer"
              aria-label={`Play testimonial video for ${name}`}
              className="absolute inset-0 grid place-items-center rounded-xl bg-gray/40 opacity-0 hover:opacity-100 transition"
            >
              <FiPlay className="text-white text-xl" />
            </a>
          )}
        </div>

        {/* Content */}
        <div>
          <p className="type-h4 text-(--text-invert)">{quote}</p>

          <div className="mt-4">
            <p className="type-h6 font-semibold text-(--text-invert)">{name}</p>
            <p className="text-xs text-(--text-invert)">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
