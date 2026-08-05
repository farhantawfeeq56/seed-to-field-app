import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, CheckCircle2, Circle, Tractor, X } from "lucide-react";
import { CHC, type MachineryRequest } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { RequestCard } from "@/components/farmfleet/RequestCard";
import { EmptyState } from "@/components/farmfleet/EmptyState";
import { PullToRefresh } from "@/components/farmfleet/PullToRefresh";
import { StatusBadge } from "@/components/farmfleet/StatusBadge";
import { useSimulatedLoad } from "@/lib/use-simulated-load";
import { Skeleton } from "@/components/ui/skeleton";
import { fmtDate, fmtDateTime } from "@/lib/format";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "My requests — FarmFleet" },
      {
        name: "description",
        content:
          "Track every machinery request you sent to Green Harvest CHC — pending, approved, scheduled or completed, with a clear timeline.",
      },
      { property: "og:title", content: "Track your machinery requests" },
      {
        property: "og:description",
        content: "See the status and timeline of each request you sent to your CHC.",
      },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const { requests, lang, tr } = useFarmFleet();
  const loading = useSimulatedLoad(600);
  const [open, setOpen] = useState<MachineryRequest | null>(null);

  return (
    <PullToRefresh>
      <div className="space-y-5 px-4 py-5">
        <header>
          <h1 className="text-2xl font-bold">{tr("My requests", "என் கோரிக்கைகள்")}</h1>
          <p className="mt-1 text-base text-muted-foreground">
            {tr(
              "Every request you sent to Green Harvest CHC.",
              "நீங்கள் மையத்திற்கு அனுப்பிய அனைத்து கோரிக்கைகளும்.",
            )}
          </p>
        </header>

        {loading ? (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-56 rounded-3xl" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <EmptyState
            icon={<Tractor className="size-10" />}
            title={tr("No requests yet", "இதுவரை கோரிக்கை இல்லை")}
            body={tr(
              "You haven't requested any machinery yet. Need a tractor? Request one in less than a minute.",
              "நீங்கள் இதுவரை எந்த இயந்திரமும் கேட்கவில்லை. டிராக்டர் வேண்டுமா? ஒரு நிமிடத்தில் கேளுங்கள்.",
            )}
            action={
              <Link
                to="/request"
                className="press inline-flex h-16 items-center rounded-2xl bg-primary px-7 text-xl font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
              >
                {tr("Request Machinery", "இயந்திரம் கேட்க")}
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <RequestCard key={r.id} request={r} onOpen={() => setOpen(r)} />
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[85dvh] overflow-y-auto rounded-3xl p-5 sm:max-w-[420px]"
        >
          {open ? (
            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-muted-foreground">{open.id}</p>
                  <h2 className="truncate text-xl font-bold">{open.machineName}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label={tr("Close", "மூடு")}
                  className="press grid size-11 shrink-0 place-items-center rounded-xl bg-secondary"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={open.status} />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-earth">
                  <CalendarDays className="size-4" />
                  {fmtDate(open.scheduledDate ?? open.preferredDate, lang)}
                </span>
              </div>

              <ol className="mt-5 space-y-4">
                {open.timeline.map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {e.done ? (
                        <CheckCircle2 className="size-6 text-primary" />
                      ) : (
                        <Circle className="size-6 text-muted-foreground/50" />
                      )}
                      {i < open.timeline.length - 1 ? (
                        <span className="mt-1 w-0.5 flex-1 bg-border" />
                      ) : null}
                    </div>
                    <div className="pb-1">
                      <p className={e.done ? "text-base font-bold" : "text-base text-muted-foreground"}>
                        {lang === "ta" ? e.labelTa : e.label}
                      </p>
                      {e.at ? (
                        <p className="text-sm text-muted-foreground">{fmtDateTime(e.at, lang)}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              <dl className="mt-5 space-y-2 rounded-2xl bg-secondary/60 p-4 text-base">
                <Detail k={tr("Village", "ஊர்")} v={open.village} />
                <Detail k={tr("Mobile", "கைபேசி")} v={open.mobile} />
                {open.landSize ? <Detail k={tr("Land size", "நில அளவு")} v={open.landSize} /> : null}
                {open.operator ? <Detail k={tr("Assigned", "ஒதுக்கீடு")} v={open.operator} /> : null}
                {open.notes ? <Detail k={tr("Notes", "குறிப்பு")} v={open.notes} /> : null}
              </dl>

              <a
                href={`tel:${CHC.phone.replace(/\s/g, "")}`}
                className="press mt-5 flex h-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground"
              >
                {tr("Contact CHC", "மையத்தை அழைக்க")}
              </a>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </PullToRefresh>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-semibold">{v}</dd>
    </div>
  );
}