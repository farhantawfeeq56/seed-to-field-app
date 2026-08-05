import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Languages,
  RotateCcw,
  Settings2,
  Signal,
  SignalZero,
  Sun,
  Sunrise,
  Sunset,
  Trash2,
  UserRound,
  X,
  Plus,
} from "lucide-react";
import { useFarmFleet, type TimeOfDay } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const chip =
  "press inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 text-sm font-semibold";
const chipActive = "border-primary bg-primary text-primary-foreground";

export function DemoControls() {
  const [open, setOpen] = useState(false);
  const {
    farmers,
    farmer,
    setFarmer,
    online,
    setOnline,
    timeOfDay,
    setTimeOfDay,
    lang,
    setLang,
    resetDemo,
    generateNotification,
    generateRequest,
    clearRequests,
    tr,
  } = useFarmFleet();

  const times: { id: TimeOfDay; label: string; labelTa: string; icon: typeof Sun }[] = [
    { id: "morning", label: "Morning", labelTa: "காலை", icon: Sunrise },
    { id: "afternoon", label: "Afternoon", labelTa: "மதியம்", icon: Sun },
    { id: "evening", label: "Evening", labelTa: "மாலை", icon: Sunset },
  ];

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open demo controls"
          className="press fixed right-4 bottom-28 z-40 grid size-14 place-items-center rounded-full bg-earth text-earth-foreground shadow-[var(--shadow-lift)]"
        >
          <Settings2 className="size-6" />
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[460px] px-3 pb-3">
          <div className="animate-rise max-h-[78dvh] overflow-y-auto rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-lift)]">
            <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <div className="min-w-0">
                <p className="text-base font-bold">{tr("Demo Controls", "டெமோ கட்டுப்பாடு")}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {tr("For presentations only", "விளக்கக்காட்சிக்கு மட்டும்")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close demo controls"
                className="press grid size-11 shrink-0 place-items-center rounded-xl bg-secondary"
              >
                <X className="size-5" />
              </button>
            </div>

            <Section title={tr("Farmer", "விவசாயி")} icon={UserRound}>
              <div className="grid grid-cols-2 gap-2">
                {farmers.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFarmer(f.id);
                      toast.success(tr(`Now viewing as ${f.name}`, `இப்போது ${f.nameTa} பார்வை`));
                    }}
                    className={cn(chip, "h-auto flex-col items-start px-3 py-2 text-left", f.id === farmer.id && chipActive)}
                  >
                    <span className="w-full truncate">{lang === "ta" ? f.nameTa : f.name}</span>
                    <span className="w-full truncate text-xs font-medium opacity-80">
                      {lang === "ta" ? f.villageTa : f.village}
                    </span>
                  </button>
                ))}
              </div>
            </Section>

            <Section title={tr("Connection", "இணைப்பு")} icon={Signal}>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setOnline(true)} className={cn(chip, online && chipActive)}>
                  <Signal className="size-4" /> {tr("Online", "இணைப்பு உள்ளது")}
                </button>
                <button type="button" onClick={() => setOnline(false)} className={cn(chip, !online && chipActive)}>
                  <SignalZero className="size-4" /> {tr("Offline", "இணைப்பு இல்லை")}
                </button>
              </div>
            </Section>

            <Section title={tr("Time of day", "நேரம்")} icon={Sun}>
              <div className="grid grid-cols-3 gap-2">
                {times.map((tm) => (
                  <button
                    key={tm.id}
                    type="button"
                    onClick={() => setTimeOfDay(tm.id)}
                    className={cn(chip, timeOfDay === tm.id && chipActive)}
                  >
                    <tm.icon className="size-4" />
                    {lang === "ta" ? tm.labelTa : tm.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section title={tr("Language", "மொழி")} icon={Languages}>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setLang("en")} className={cn(chip, lang === "en" && chipActive)}>
                  English
                </button>
                <button type="button" onClick={() => setLang("ta")} className={cn(chip, lang === "ta" && chipActive)}>
                  தமிழ்
                </button>
              </div>
            </Section>

            <Section title={tr("Data", "தரவு")} icon={RotateCcw}>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={generateRequest} className={chip}>
                  <Plus className="size-4" /> {tr("Add request", "கோரிக்கை")}
                </button>
                <button type="button" onClick={generateNotification} className={chip}>
                  <Bell className="size-4" /> {tr("Add update", "தகவல்")}
                </button>
                <ConfirmButton
                  label={tr("Clear requests", "கோரிக்கைகளை நீக்கு")}
                  icon={<Trash2 className="size-4" />}
                  title={tr("Clear this farmer's requests?", "இந்த விவசாயியின் கோரிக்கைகளை நீக்கவா?")}
                  description={tr(
                    "All requests for the selected farmer will be removed from this demo.",
                    "தேர்ந்தெடுத்த விவசாயியின் அனைத்து கோரிக்கைகளும் நீக்கப்படும்.",
                  )}
                  onConfirm={() => {
                    clearRequests();
                    toast.success(tr("Requests cleared", "கோரிக்கைகள் நீக்கப்பட்டன"));
                  }}
                />
                <ConfirmButton
                  label={tr("Reset demo", "மீட்டமை")}
                  icon={<RotateCcw className="size-4" />}
                  title={tr("Reset all demo data?", "அனைத்து டெமோ தரவையும் மீட்டமைக்கவா?")}
                  description={tr(
                    "Requests and updates for every farmer go back to their original state.",
                    "அனைத்து விவசாயிகளின் தரவும் தொடக்க நிலைக்கு திரும்பும்.",
                  )}
                  onConfirm={() => {
                    resetDemo();
                    toast.success(tr("Demo data reset", "டெமோ தரவு மீட்டமைக்கப்பட்டது"));
                  }}
                />
              </div>
            </Section>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Sun;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-bold tracking-wide text-muted-foreground uppercase">
        <Icon className="size-4" />
        {title}
      </p>
      {children}
    </div>
  );
}

function ConfirmButton({
  label,
  icon,
  title,
  description,
  onConfirm,
}: {
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={chip}>
        {icon}
        <span className="truncate">{label}</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-12 rounded-2xl">Cancel</AlertDialogCancel>
          <AlertDialogAction className="h-12 rounded-2xl" onClick={onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ChevronDown };