import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  CloudOff,
  Home,
  ListChecks,
  Phone,
  RefreshCw,
  Tractor,
  Wheat,
} from "lucide-react";
import type { ReactNode } from "react";
import { useFarmFleet } from "@/lib/store";
import { cn } from "@/lib/utils";
import { DemoControls } from "./DemoControls";
import { timeAgo } from "@/lib/format";

const tabs = [
  { to: "/", icon: Home, en: "Home", ta: "முகப்பு" },
  { to: "/request", icon: Tractor, en: "Request", ta: "கோரிக்கை" },
  { to: "/status", icon: ListChecks, en: "Status", ta: "நிலை" },
  { to: "/equipment", icon: Wheat, en: "Machines", ta: "இயந்திரம்" },
  { to: "/contact", icon: Phone, en: "Contact", ta: "தொடர்பு" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { farmer, lang, online, syncing, lastSynced, unread, tr } = useFarmFleet();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-dvh max-w-[460px] flex-col bg-background shadow-[0_0_60px_-30px_rgba(0,0,0,0.35)]">
      <header className="sticky top-0 z-30">
        <div className="field-gradient px-4 pt-3 pb-4 text-primary-foreground">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-foreground/15">
                  <Wheat className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg leading-tight font-bold">FarmFleet</p>
                  <p className="truncate text-xs opacity-90">
                    {tr("Demo Mode • Viewing as", "டெமோ முறை • பார்ப்பவர்")}{" "}
                    {lang === "ta" ? farmer.nameTa : farmer.name.replace(/^[A-Z]\.\s/, "")}
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/notifications"
              aria-label={tr("Updates", "தகவல்கள்")}
              className="press relative grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15"
            >
              <Bell className="size-5" />
              {unread > 0 ? (
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {unread}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-semibold",
            online ? "bg-secondary text-earth" : "bg-accent text-accent-foreground",
          )}
        >
          {online ? (
            <>
              <RefreshCw className={cn("size-4 shrink-0", syncing && "animate-spin")} />
              <span className="truncate">
                {syncing
                  ? tr("Sending saved requests…", "சேமித்த கோரிக்கைகள் அனுப்பப்படுகிறது…")
                  : `${tr("Last updated", "கடைசி புதுப்பிப்பு")} ${timeAgo(lastSynced, lang)}`}
              </span>
            </>
          ) : (
            <>
              <CloudOff className="size-4 shrink-0" />
              <span className="truncate">
                {tr(
                  "No internet — your requests are saved safely",
                  "இணையம் இல்லை — கோரிக்கைகள் பாதுகாப்பாக சேமிக்கப்படும்",
                )}
              </span>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 pb-28">{children}</main>

      <DemoControls />

      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[460px] border-t border-border bg-card/98 backdrop-blur">
        <ul className="grid grid-cols-5">
          {tabs.map((tab) => {
            const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "press flex flex-col items-center gap-1 py-2.5 text-xs font-bold",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-14 place-items-center rounded-2xl transition-colors",
                      active && "bg-primary-soft",
                    )}
                  >
                    <tab.icon className="size-5" />
                  </span>
                  {lang === "ta" ? tab.ta : tab.en}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}