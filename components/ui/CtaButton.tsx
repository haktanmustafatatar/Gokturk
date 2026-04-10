type CtaButtonProps = {
  children: React.ReactNode;
  href: string;
};

export const CtaButton = ({ children, href }: CtaButtonProps) => (
  <a
    href={href}
    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c49d63]/40 bg-[#0d1013]/70 px-6 text-xs font-semibold uppercase tracking-[0.34em] text-[#f5edda] transition duration-500 hover:border-[#df7f38]/70 hover:bg-[#15191d] hover:text-white"
  >
    {children}
  </a>
);
