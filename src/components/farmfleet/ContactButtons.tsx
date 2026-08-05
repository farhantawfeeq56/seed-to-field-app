import { MessageCircle, Phone } from "lucide-react";
import { CHC } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { cn } from "@/lib/utils";

const tel = CHC.phone.replace(/\s/g, "");

export function ContactButtons({ className, large = false }: { className?: string; large?: boolean }) {
  const { tr } = useFarmFleet();
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <a
        href={`tel:${tel}`}
        className={cn(
          "press flex items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground shadow-[var(--shadow-soft)]",
          large ? "h-16 text-xl" : "h-14 text-lg",
        )}
      >
        <Phone className="size-5" />
        {tr("Call CHC", "அழைக்க")}
      </a>
      <a
        href={`https://wa.me/${tel.replace("+", "")}`}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "press flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/25 bg-card font-bold text-primary-deep",
          large ? "h-16 text-xl" : "h-14 text-lg",
        )}
      >
        <MessageCircle className="size-5" />
        WhatsApp
      </a>
    </div>
  );
}