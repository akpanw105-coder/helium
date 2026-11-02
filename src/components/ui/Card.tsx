import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "cyan" | "none";
  as?: "div" | "article" | "section" | "li";
}

export function Card({
  children,
  className = "",
  hover = true,
  glow = "none",
  as: Tag = "div",
}: CardProps) {
  const glowClass =
    glow === "blue"
      ? "hover:[box-shadow:0_0_24px_rgba(26,108,246,0.2)]"
      : glow === "cyan"
      ? "hover:[box-shadow:0_0_24px_rgba(0,200,224,0.15)]"
      : "";

  return (
    <Tag
      className={`glass-card p-6 ${hover ? "hover:-translate-y-1" : ""} ${glowClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
