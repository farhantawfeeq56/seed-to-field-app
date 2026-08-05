import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Leaf, Tractor, UserCheck } from "lucide-react";
import { availabilityMeta, EQUIPMENT } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { ContactButtons } from "@/components/farmfleet/ContactButtons";
import { EmptyState } from "@/components/farmfleet/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/equipment/$equipmentId")({
  head: () => ({
    meta: [
      { title: "Machine details — FarmFleet" },
      {
        name: "description",
        content:
          "Availability, waiting time, suitable crops and description for machinery kept at Green Harvest Custom Hiring Center.",
      },
      { property: "og:title", content: "Machine details — FarmFleet" },
      {
        property: "og:description",
        content: "See what this machine does and request it from your CHC.",
      },
    ],
  }),
  component: EquipmentDetail,
});

function EquipmentDetail() {
  const { equipmentId } = useParams({ from: "/equipment/$equipmentId" });
  const { lang, tr } = useFarmFleet();
  const ta = lang === "ta";
  const eq = EQUIPMENT.find((e) => e.id === equipmentId);

  if (!eq) {
    return (
      <div className="px-4 py-8">
        <EmptyState
          title={tr("Machine not found", "இயந்திரம் கிடைக்கவில்லை")}
          body={tr("It may have been removed from the CHC list.", "மையப் பட்டியலில் இருந்து நீக்கப்பட்டிருக்கலாம்.")}
          action={
            <Link
              to="/equipment"
              className="press inline-flex h-14 items-center rounded-2xl bg-primary px-6 text-lg font-bold text-primary-foreground"
            >
              {tr("See all machines", "அனைத்து இயந்திரங்கள்")}
            </Link>
          }
        />
      </div>
    );
  }

  const av = availabilityMeta[eq.availability];

  return (
    <div className="pb-6">
      <div className="relative">
        <img
          src={eq.image}
          alt={ta ? eq.nameTa : eq.name}
          width={768}
          height={512}
          className="h-60 w-full object-cover"
        />
        <Link
          to="/equipment"
          aria-label={tr("Back to machines", "பின் செல்ல")}
          className="press absolute top-4 left-4 grid size-12 place-items-center rounded-2xl bg-card/95 backdrop-blur"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <div className="animate-rise -mt-6 space-y-5 rounded-t-[2rem] bg-background px-4 pt-6">
        <div>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold",
              av.className,
            )}
          >
            <span className={cn("size-2.5 rounded-full", av.dot)} />
            {ta ? av.labelTa : av.label}
          </span>
          <h1 className="mt-2 text-2xl font-bold">{ta ? eq.nameTa : eq.name}</h1>
          <p className="mt-1 text-base text-muted-foreground">{eq.units}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoTile
            icon={<Clock className="size-5" />}
            label={tr("Waiting time", "காத்திருப்பு")}
            value={ta ? eq.waitTa : eq.wait}
          />
          <InfoTile
            icon={<UserCheck className="size-5" />}
            label={tr("Operator", "ஓட்டுநர்")}
            value={
              eq.operatorIncluded
                ? tr("CHC driver comes", "மைய ஓட்டுநர் வருவார்")
                : tr("You collect it", "நீங்களே பெறலாம்")
            }
          />
        </div>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-bold">{tr("What it is used for", "எதற்கு பயன்படுகிறது")}</h2>
          <p className="mt-2 text-base leading-relaxed">{ta ? eq.descriptionTa : eq.description}</p>

          <h3 className="mt-5 flex items-center gap-2 text-base font-bold">
            <Leaf className="size-5 text-primary" />
            {tr("Suitable crops", "ஏற்ற பயிர்கள்")}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {eq.crops.map((c) => (
              <span key={c} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-earth">
                {c}
              </span>
            ))}
          </div>

          <ul className="mt-5 space-y-2">
            {eq.specs.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-base">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{s.label}:</span>
                <span className="font-semibold">{s.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {eq.availability === "maintenance" ? (
          <p className="rounded-3xl bg-accent/40 px-4 py-3 text-base font-semibold text-accent-foreground">
            {tr(
              "This machine is under repair. You can still send a request and the CHC will call you when it is ready.",
              "இந்த இயந்திரம் பழுது நீக்கத்தில் உள்ளது. கோரிக்கை வைக்கலாம், தயாரானதும் மையம் அழைக்கும்.",
            )}
          </p>
        ) : null}

        <Link
          to="/request"
          search={{ machine: eq.id }}
          className="press flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
        >
          <Tractor className="size-6" />
          {tr("Request this machine", "இதை கேட்க")}
        </Link>

        <ContactButtons />
      </div>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
        <span className="text-earth">{icon}</span>
        {label}
      </p>
      <p className="mt-1 text-base font-bold">{value}</p>
    </div>
  );
}