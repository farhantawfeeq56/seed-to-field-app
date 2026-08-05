import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  body,
  ctaLabel,
  ctaTo,
}: {
  icon?: ReactNode;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="animate-rise flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-6 py-10 text-center">
      <div className="mb-4 grid size-20 place-items-center rounded-full bg-primary-soft text-primary-deep">
        {icon ?? <Sprout className="size-10" />}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-[26ch] text-base leading-relaxed text-muted-foreground">{body}</p>
      {ctaLabel && ctaTo ? (
        <Link
          to={ctaTo}
          className="press mt-6 inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-7 text-lg font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}