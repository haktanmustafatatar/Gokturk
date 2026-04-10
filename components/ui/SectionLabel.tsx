type SectionLabelProps = {
  children: React.ReactNode;
};

export const SectionLabel = ({ children }: SectionLabelProps) => (
  <span className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#c5b08a]/78">
    <span className="h-px w-8 bg-current/55" />
    {children}
  </span>
);
