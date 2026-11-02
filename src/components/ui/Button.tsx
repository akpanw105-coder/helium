import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-lg transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants: Record<string, string> = {
    primary:
      "text-white rounded-lg border border-transparent focus-visible:ring-blue-400" +
      " [background:var(--helium-blue)] hover:[background:var(--helium-blue-light)]" +
      " hover:[box-shadow:0_0_20px_rgba(26,108,246,0.5)]",
    outline:
      "bg-transparent text-[var(--helium-cyan)] border border-[var(--helium-cyan)] hover:bg-[rgba(0,200,224,0.08)] hover:[box-shadow:0_0_16px_rgba(0,200,224,0.2)] focus-visible:ring-cyan-400",
    ghost:
      "bg-transparent text-[var(--helium-silver)] border border-[rgba(168,184,208,0.2)] hover:text-white hover:border-[rgba(168,184,208,0.4)] hover:bg-[rgba(168,184,208,0.05)]",
    whatsapp:
      "text-white border border-transparent rounded-lg focus-visible:ring-green-400" +
      " [background:#25D366] hover:[background:#20c05a]" +
      " hover:[box-shadow:0_0_20px_rgba(37,211,102,0.4)]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
