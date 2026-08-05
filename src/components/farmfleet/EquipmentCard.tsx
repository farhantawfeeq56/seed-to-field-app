import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";
import { availabilityMeta, type Equipment } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { cn } from "@/lib/utils";

export function EquipmentCard({ eq, compact = false }: { eq: Equipment; compact?: boolean }) {
  const { lang } = useFarmFleet();
  const ta = lang === "ta";
  const av = availabilityMeta[eq.availability];

  return (
    <Link
      to="/equipment/$equipmentId"
      params={{ equipmentId: eq.id }}
      className="press block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
    >
      <div className="relative">
        <img
          src={eq.image}
          alt={eq.name}
          loading="lazy"
          width={768}
          height={512}
          className={cn("w-full object-cover", compact ? "h-36" : "h-44")}
        />
        <span
          className={cn(
            "absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-card/95 px-3 py-1.5 text-sm font-bold backdrop-blur",
            av.className,
          )}
        >
          <span className={cn("size-2.5 rounded-full", av.dot)} />
          {ta ? av.labelTa : av.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg leading-snug font-bold">{ta ? eq.nameTa : eq.name}</h3>
        <p className="mt-1 line-clamp-2 text-base text-muted-foreground">
          {ta ? eq.purposeTa : eq.purpose}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-earth">
            <Clock className="size-4" />
            {ta ? eq.waitTa : eq.wait}
          </span>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}