import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { EQUIPMENT } from "@/data/farmfleet";
import { EquipmentCard } from "@/components/farmfleet/EquipmentCard";
import { EmptyState } from "@/components/farmfleet/EmptyState";
import { PullToRefresh } from "@/components/farmfleet/PullToRefresh";
import { useFarmFleet } from "@/lib/store";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/equipment/")({
  head: () => ({
    meta: [
      { title: "Machines at Green Harvest CHC — FarmFleet" },
      {
        name: "description",
        content:
          "Tractor, rotavator, power sprayer, combine harvester, seed drill and disc plough available at your Custom Hiring Center with live availability.",
      },
      { property: "og:title", content: "Machines at Green Harvest CHC" },
      {
        property: "og:description",
        content: "Check availability and waiting time for every machine at your CHC.",
      },
    ],
  }),
  component: EquipmentList,
});

const filters = [
  { id: "all", en: "All machines", ta: "அனைத்தும்" },
  { id: "available", en: "Available now", ta: "இப்போது கிடைக்கும்" },
  { id: "Tillage", en: "Land preparation", ta: "நிலம் தயாரிப்பு" },
  { id: "Harvest", en: "Harvest", ta: "அறுவடை" },
  { id: "Crop Care", en: "Crop care", ta: "பயிர் பராமரிப்பு" },
] as const;

function EquipmentList() {
  const { lang, tr } = useFarmFleet();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const loading = useSimulatedLoad(600);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EQUIPMENT.filter((eq) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "available"
            ? eq.availability === "available" || eq.availability === "limited"
            : eq.category === filter;
      const matchesTerm =
        !term ||
        [eq.name, eq.nameTa, eq.purpose, eq.category, ...eq.crops]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesFilter && matchesTerm;
    });
  }, [q, filter]);

  return (
    <PullToRefresh>
      <div className="space-y-5 px-4 py-5">
        <header>
          <h1 className="text-2xl font-bold">{tr("Machines at your CHC", "மையத்தின் இயந்திரங்கள்")}</h1>
          <p className="mt-1 text-base text-muted-foreground">
            {tr(
              "All machines belong to Green Harvest CHC. Tap any machine to know more.",
              "அனைத்து இயந்திரங்களும் கிரீன் ஹார்வெஸ்ட் மையத்தினுடையவை. விவரங்களுக்கு தட்டவும்.",
            )}
          </p>
        </header>

        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr("Search tractor, sprayer…", "டிராக்டர், ஸ்பிரேயர் தேடுங்கள்…")}
            aria-label={tr("Search machines", "இயந்திரங்களை தேடு")}
            className="h-14 w-full rounded-2xl border border-border bg-card pr-12 pl-12 text-lg font-medium outline-none focus:border-primary"
          />
          {q ? (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label={tr("Clear search", "தேடலை அழி")}
              className="press absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-xl bg-secondary"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-earth">
            <SlidersHorizontal className="size-4" />
          </span>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "press h-11 shrink-0 rounded-xl border border-border bg-card px-4 text-base font-semibold",
                filter === f.id && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {lang === "ta" ? f.ta : f.en}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <EmptyState
            icon={<Search className="size-9" />}
            title={tr("No machine found", "இயந்திரம் எதுவும் இல்லை")}
            body={tr(
              "Try another word, or call the CHC and they will tell you what is free.",
              "வேறு வார்த்தையில் தேடுங்கள், அல்லது மையத்தை அழைத்து கேளுங்கள்.",
            )}
          />
        ) : (
          <div className="space-y-4">
            {list.map((eq) => (
              <EquipmentCard key={eq.id} eq={eq} />
            ))}
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}