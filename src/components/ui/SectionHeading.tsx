interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {overline && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] font-[family-name:var(--font-geist-mono)]"
          style={{ color: "var(--helium-cyan)" }}
        >
          {overline}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{ color: "var(--helium-silver)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
