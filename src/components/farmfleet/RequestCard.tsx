import { CalendarDays, CloudOff, Phone, Tractor } from "lucide-react";
import { CHC, type MachineryRequest, EQUIPMENT } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { fmtDate } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

export function RequestCard({
  request,
  onOpen,
}: {
  request: MachineryRequest;
  onOpen?: () => void;
}) {
  const { lang, tr } = useFarmFleet();
  const eq = EQUIPMENT.find((e) => e.id === request.equipmentId);
  const machine = lang === "ta" && eq ? eq.nameTa : request.machineName;

  return (
    <article className="animate-rise overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <button
        type="button"
        onClick={onOpen}
        className="press w-full p-5 text-left"
        aria-label={tr(`Open request ${request.id}`, `கோரிக்கை ${request.id} திற`)}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              {request.id}
            </p>
            <h3 className="mt-0.5 flex items-center gap-2 text-lg font-bold">
              <Tractor className="size-5 shrink-0 text-primary" />
              <span className="truncate">{machine}</span>
            </h3>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-base">
          <div>
            <dt className="text-sm text-muted-foreground">{tr("Requested on", "கோரிய நாள்")}</dt>
            <dd className="font-semibold">{fmtDate(request.submittedAt, lang)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">
              {request.scheduledDate ? tr("Scheduled", "திட்டமிட்ட நாள்") : tr("Needed by", "தேவைப்படும் நாள்")}
            </dt>
            <dd className="inline-flex items-center gap-1.5 font-semibold">
              <CalendarDays className="size-4 text-earth" />
              {fmtDate(request.scheduledDate ?? request.preferredDate, lang)}
            </dd>
          </div>
        </dl>

        {!request.synced ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm font-semibold text-earth">
            <CloudOff className="size-4" />
            {tr("Saved on your phone — will be sent", "போனில் சேமிக்கப்பட்டது — அனுப்பப்படும்")}
          </p>
        ) : null}
      </button>

      <a
        href={`tel:${CHC.phone.replace(/\s/g, "")}`}
        className="press flex h-14 items-center justify-center gap-2 border-t border-border bg-secondary text-lg font-bold text-earth"
      >
        <Phone className="size-5" />
        {tr("Contact CHC about this", "இது குறித்து மையத்தை அழைக்க")}
      </a>
    </article>
  );
}