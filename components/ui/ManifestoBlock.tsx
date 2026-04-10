import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ManifestoBlockProps = {
  label: string;
  title: string;
  body: string;
  active: boolean;
  align?: "left" | "center" | "right";
};

export const ManifestoBlock = ({
  label,
  title,
  body,
  active,
  align = "left",
}: ManifestoBlockProps) => (
  <div
    className={clsx(
      "max-w-xl space-y-5 transition-all duration-700",
      align === "center" && "mx-auto text-center",
      align === "right" && "ml-auto text-right",
      active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-[0.18]",
    )}
  >
    <SectionLabel>{label}</SectionLabel>
    <h2 className="font-display text-4xl leading-[0.96] tracking-[0.08em] text-[#f4efe2] sm:text-5xl md:text-6xl">
      {title}
    </h2>
    <p className="text-balance max-w-lg text-sm leading-7 tracking-[0.08em] text-[#d7d8d1]/72 sm:text-base">
      {body}
    </p>
  </div>
);
