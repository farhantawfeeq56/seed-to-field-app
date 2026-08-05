import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  Info,
  PhoneMissed,
  ThumbsUp,
  Tractor,
} from "lucide-react";
import { useFarmFleet } from "@/lib/store";
import { EmptyState } from "@/components/farmfleet/EmptyState";
import { PullToRefresh } from "@/components/farmfleet/PullToRefresh";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Updates from your CHC — FarmFleet" },
      {
        name: "description",
        content:
          "Approvals, machine assignments, schedule changes and callback reminders from Green Harvest Custom Hiring Center.",
      },
      { property: "og:title", content: "Updates from your CHC" },
      {
        property: "og:description",
        content: "Every message the CHC sent about your machinery requests.",
      },
    ],
  }),
  component: NotificationsPage,
});

const icons = {
  received: Tractor,
  approved: ThumbsUp,
  assigned: CheckCircle2,
  rescheduled: CalendarClock,
  reminder: BellRing,
  call: PhoneMissed,
  completed: CheckCircle2,
  info: Info,
} as const;

function NotificationsPage() {
  const { notifications, markRead, markAllRead, unread, lang, tr } = useFarmFleet();
  const ta = lang === "ta";

  return (
    <PullToRefresh>
      <div className="space-y-5 px-4 py-5">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold">{tr("Updates", "தகவல்கள்")}</h1>
            <p className="text-base text-muted-foreground">
              {unread > 0
                ? tr(`${unread} new from the CHC`, `${unread} புதிய தகவல்`)
                : tr("You are up to date", "அனைத்தும் படித்தாகிவிட்டது")}
            </p>
          </div>
          {unread > 0 ? (
            <button
              type="button"
              onClick={markAllRead}
              className="press h-11 shrink-0 rounded-xl bg-secondary px-4 text-base font-bold text-earth"
            >
              {tr("Mark all read", "அனைத்தும் படித்தேன்")}
            </button>
          ) : null}
        </header>

        {notifications.length === 0 ? (
          <EmptyState
            icon={<BellRing className="size-10" />}
            title={tr("No updates yet", "தகவல் எதுவும் இல்லை")}
            body={tr(
              "Once you send a request, the CHC will keep you informed here at every step.",
              "கோரிக்கை அனுப்பியதும், ஒவ்வொரு படியிலும் மையம் இங்கே தெரிவிக்கும்.",
            )}
            action={
              <Link
                to="/request"
                className="press inline-flex h-16 items-center rounded-2xl bg-primary px-7 text-xl font-bold text-primary-foreground"
              >
                {tr("Request Machinery", "இயந்திரம் கேட்க")}
              </Link>
            }
          />
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => {
              const Icon = icons[n.kind];
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => markRead(n.id)}
                    className={cn(
                      "press flex w-full gap-3 rounded-3xl border p-4 text-left shadow-[var(--shadow-soft)]",
                      n.read ? "border-border bg-card" : "border-primary/25 bg-primary-soft/40",
                    )}
                  >
                    <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-earth">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base leading-snug font-bold">
                        {ta ? n.titleTa : n.title}
                      </span>
                      <span className="mt-1 block text-base text-muted-foreground">
                        {ta ? n.bodyTa : n.body}
                      </span>
                      <span className="mt-1.5 block text-sm text-muted-foreground/80">
                        {timeAgo(n.at, lang)}
                      </span>
                    </span>
                    {!n.read ? <span className="mt-2 size-3 shrink-0 rounded-full bg-primary" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </PullToRefresh>
  );
}