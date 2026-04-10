type CtaButtonProps = {
  children: React.ReactNode;
  href: string;
};

export const CtaButton = ({ children, href }: CtaButtonProps) => (
  <a
    href={href}
    className="inline-flex items-center justify-center border-b border-[#c49d63]/34 px-0 pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#f0e6d0] transition duration-500 hover:border-[#df7f38]/60 hover:text-white"
  >
    {children}
  </a>
);
