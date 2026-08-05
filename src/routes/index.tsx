import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Info,
  MapPin,
  Megaphone,
  Navigation,
  Tractor,
  TriangleAlert,
} from "lucide-react";
import { ANNOUNCEMENTS, CHC, EQUIPMENT } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { EquipmentCard } from "@/components/farmfleet/EquipmentCard";
import { ContactButtons } from "@/components/farmfleet/ContactButtons";
import { PullToRefresh } from "@/components/farmfleet/PullToRefresh";
import { StatusBadge } from "@/components/farmfleet/StatusBadge";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtDate } from "@/lib/format";
import mapImg from "@/assets/map-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FarmFleet — Machinery from your nearby CHC" },
      {
        name: "description",
        content:
          "See machines available at Green Harvest Custom Hiring Center, request a tractor in under a minute and track your request — works offline.",
      },
      { property: "og:title", content: "FarmFleet — Machinery from your nearby CHC" },
      {
        property: "og:description",
        content: "See machines available at Green Harvest Custom Hiring Center, request a tractor in under a minute and track your request — works offline.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { farmer, lang, timeOfDay, tr, requests } = useFarmFleet();
  const loading = useSimulatedLoad(600);
  const ta = lang === "ta";
  const greeting =
    timeOfDay === "morning"
      ? tr("Good morning", "காலை வணக்கம்")
      : timeOfDay === "afternoon"
        ? tr("Good afternoon", "மதிய வணக்கம்")
        : tr("Good evening", "மாலை வணக்கம்");

  const active = requests.find((r) => r.status !== "completed" && r.status !== "rejected");

  return (
    <PullToRefresh>
      <div className="space-y-6 px-4 py-5">
        <section className="animate-rise">
          <h1 className="text-2xl font-bold">
            {greeting}, {ta ? farmer.nameTa : farmer.name}
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            {tr(
              `Your center is ${farmer.distanceKm} km from ${farmer.village}.`,
              `உங்கள் மையம் ${farmer.villageTa}-லிருந்து ${farmer.distanceKm} கி.மீ தொலைவில்.`,
            )}
          </p>
        </section>

        {/* CHC card */}
        <section className="animate-rise overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <div className="field-gradient px-5 py-4 text-primary-foreground">
            <p className="text-xs font-bold tracking-widest uppercase opacity-85">
              {tr("Your Custom Hiring Center", "உங்கள் வாடகை இயந்திர மையம்")}
            </p>
            <h2 className="mt-1 text-xl leading-snug font-bold">{ta ? CHC.nameTa : CHC.name}</h2>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">
              <BadgeCheck className="size-4" />
              {tr("Government Registered", "அரசு பதிவு பெற்றது")}
            </p>
          </div>
          <div className="space-y-3 p-5">
            <Row icon={<MapPin className="size-5 text-earth" />} title={CHC.address.join(", ")} />
            <Row
              icon={<Clock3 className="size-5 text-earth" />}
              title={ta ? CHC.hoursTa : CHC.hours}
              note={tr("Open now", "இப்போது திறந்திருக்கிறது")}
            />
            <Row
              icon={<Navigation className="size-5 text-earth" />}
              title={tr(
                `Manager: ${CHC.manager}`,
                `மேலாளர்: ${CHC.managerTa}`,
              )}
            />
            <ContactButtons className="pt-1" />
            <Link
              to="/request"
              className="press flex h-16 items-center justify-center gap-2 rounded-2xl bg-accent text-xl font-bold text-accent-foreground shadow-[var(--shadow-soft)]"
            >
              <Tractor className="size-6" />
              {tr("Request Machinery", "இயந்திரம் கேட்க")}
            </Link>
          </div>
        </section>

        {active ? (
          <Link
            to="/status"
            className="press animate-rise grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border border-primary/25 bg-primary-soft/60 p-5"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary-deep">
                {tr("Your ongoing request", "நடப்பு கோரிக்கை")} • {active.id}
              </p>
              <p className="truncate text-lg font-bold">{active.machineName}</p>
              <p className="text-sm text-muted-foreground">
                {tr("Needed by", "தேவைப்படும் நாள்")}{" "}
                {fmtDate(active.scheduledDate ?? active.preferredDate, lang)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <StatusBadge status={active.status} />
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
          </Link>
        ) : null}

        {/* Equipment preview */}
        <section>
          <SectionHead
            title={tr("Machines at your CHC", "மையத்தில் உள்ள இயந்திரங்கள்")}
            to="/equipment"
            linkLabel={tr("See all", "அனைத்தும்")}
          />
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-64 w-[74%] shrink-0 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
              {EQUIPMENT.slice(0, 4).map((eq) => (
                <div key={eq.id} className="w-[74%] shrink-0 snap-start">
                  <EquipmentCard eq={eq} compact />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Announcements */}
        <section>
          <SectionHead title={tr("News from the CHC", "மையத்தின் அறிவிப்புகள்")} />
          <div className="space-y-3">
            {ANNOUNCEMENTS.map((a) => (
              <article
                key={a.id}
                className="flex gap-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
              >
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-earth">
                  {a.tone === "warn" ? (
                    <TriangleAlert className="size-5" />
                  ) : a.tone === "info" ? (
                    <Info className="size-5" />
                  ) : (
                    <Megaphone className="size-5" />
                  )}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base leading-snug font-bold">{ta ? a.titleTa : a.title}</h3>
                  <p className="mt-1 text-base text-muted-foreground">{ta ? a.bodyTa : a.body}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground/80">{ta ? a.dateTa : a.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Map + nearby CHC */}
        <section>
          <SectionHead title={tr("Your village and the CHC", "உங்கள் ஊரும் மையமும்")} />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <div className="relative">
              <img
                src={mapImg}
                alt={tr(
                  `Map showing ${farmer.village} and the route to Green Harvest CHC`,
                  `${farmer.villageTa} மற்றும் மையத்திற்கான வழி வரைபடம்`,
                )}
                loading="lazy"
                width={768}
                height={512}
                className="h-44 w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-sm font-bold text-earth backdrop-blur">
                <MapPin className="size-4" />
                {ta ? farmer.villageTa : farmer.village} → {farmer.distanceKm} km
              </span>
            </div>
            <div className="p-4">
              <p className="text-base font-bold">{CHC.shortName}</p>
              <p className="mt-1 text-base text-muted-foreground">
                {tr(
                  `Serving ${CHC.servingVillages.length} villages including ${farmer.village}. This is the only center assigned to you.`,
                  `${farmer.villageTa} உட்பட ${CHC.servingVillages.length} ஊர்களுக்கு சேவை. இதுவே உங்களுக்கான மையம்.`,
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </PullToRefresh>
  );
}

function Row({ icon, title, note }: { icon: React.ReactNode; title: string; note?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="text-base leading-snug font-medium">
        {title}
        {note ? (
          <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-sm font-bold text-[color:var(--success)]">
            {note}
          </span>
        ) : null}
      </p>
    </div>
  );
}

function SectionHead({
  title,
  to,
  linkLabel,
}: {
  title: string;
  to?: "/equipment";
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
      <h2 className="truncate text-xl font-bold">{title}</h2>
      {to && linkLabel ? (
        <Link to={to} className="shrink-0 text-base font-bold text-primary">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
