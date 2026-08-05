import { cn } from "@/lib/utils";
import { statusMeta, type RequestStatus } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";

export function StatusBadge({ status, className }: { status: RequestStatus; className?: string }) {
  const { lang } = useFarmFleet();
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold",
        meta.className,
        className,
      )}
    >
      {lang === "ta" ? meta.labelTa : meta.label}
    </span>
  );
}