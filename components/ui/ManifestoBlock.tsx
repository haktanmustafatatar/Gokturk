import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ManifestoBlockProps = {
  label: string;
  title: string;
  body: string;
  active: boolean;
  align?: "left" | "center" | "right";
  emphasis?: number;
};

export const ManifestoBlock = ({
  label,
  title,
  body,
  active,
  align = "left",
  emphasis = 1,
}: ManifestoBlockProps) => (
  <div
    className={clsx(
      "max-w-xl space-y-5 transition-opacity duration-700",
      align === "center" && "mx-auto text-center",
      align === "right" && "ml-auto text-right",
      active ? "opacity-100" : "opacity-[0.18]",
    )}
  >
    <div style={{ opacity: 0.32 + emphasis * 0.5 }}>
      <SectionLabel>{label}</SectionLabel>
    </div>
    <h2
      className="font-display text-4xl leading-[0.96] tracking-[0.08em] text-[#f4efe2] sm:text-5xl md:text-6xl"
      style={{ opacity: 0.68 + emphasis * 0.32 }}
    >
      {title}
    </h2>
    <p
      className="text-balance max-w-lg text-sm leading-7 tracking-[0.08em] text-[#d7d8d1]/72 sm:text-base"
      style={{ opacity: 0.45 + emphasis * 0.42 }}
    >
      {body}
    </p>
  </div>
);
