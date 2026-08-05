import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CheckCircle2, ChevronRight, Phone, Tractor } from "lucide-react";
import { toast } from "sonner";
import { CHC, EQUIPMENT, VILLAGES } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { ContactButtons } from "@/components/farmfleet/ContactButtons";
import { fmtDate } from "@/lib/format";

const searchSchema = z.object({ machine: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/request")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Request machinery — FarmFleet" },
      {
        name: "description",
        content:
          "Fill a short form to request a tractor, rotavator, sprayer or harvester from Green Harvest Custom Hiring Center. Works even without internet.",
      },
      { property: "og:title", content: "Request machinery from your CHC" },
      {
        property: "og:description",
        content: "Seven simple fields and the CHC will call you back within a day.",
      },
    ],
  }),
  component: RequestPage,
});

const label = "block text-base font-bold";
const input =
  "mt-2 h-14 w-full rounded-2xl border border-border bg-card px-4 text-lg font-medium outline-none focus:border-primary";

function RequestPage() {
  const { machine } = Route.useSearch();
  const { farmer, lang, online, tr, createRequest } = useFarmFleet();
  const navigate = useNavigate();
  const ta = lang === "ta";

  const [form, setForm] = useState({
    farmerName: farmer.name,
    mobile: farmer.mobile,
    village: farmer.village,
    equipmentId: machine || EQUIPMENT[0]!.id,
    preferredDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    landSize: farmer.landSize,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ id: string } | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.farmerName.trim().length < 2)
      next.farmerName = tr("Please enter your name", "உங்கள் பெயரை உள்ளிடவும்");
    if (!/^[+0-9 ]{10,16}$/.test(form.mobile.trim()))
      next.mobile = tr("Enter a 10 digit mobile number", "10 இலக்க எண்ணை உள்ளிடவும்");
    if (!form.village) next.village = tr("Choose your village", "உங்கள் ஊரை தேர்வு செய்யவும்");
    if (!form.preferredDate) next.preferredDate = tr("Choose a date", "நாளை தேர்வு செய்யவும்");
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(tr("Please check the marked fields", "குறிக்கப்பட்ட இடங்களை சரிபார்க்கவும்"));
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    const req = createRequest({
      farmerName: form.farmerName.trim(),
      mobile: form.mobile.trim(),
      village: form.village,
      equipmentId: form.equipmentId,
      preferredDate: new Date(form.preferredDate).toISOString(),
      landSize: form.landSize.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setSubmitting(false);
    setDone({ id: req.id });
    toast.success(
      online
        ? tr("Request sent to the CHC", "கோரிக்கை மையத்திற்கு அனுப்பப்பட்டது")
        : tr("Saved on your phone", "உங்கள் போனில் சேமிக்கப்பட்டது"),
    );
  };

  if (done) {
    return (
      <div className="space-y-5 px-4 py-8 text-center">
        <div className="animate-pop mx-auto grid size-24 place-items-center rounded-full bg-primary-soft text-primary-deep">
          <CheckCircle2 className="size-14" />
        </div>
        <h1 className="text-2xl font-bold">
          {online
            ? tr("Your request has reached the CHC", "உங்கள் கோரிக்கை மையத்தை அடைந்தது")
            : tr("Saved safely on your phone", "உங்கள் போனில் பாதுகாப்பாக சேமிக்கப்பட்டது")}
        </h1>
        <p className="text-base text-muted-foreground">
          {online
            ? tr(
                "Mr. Ramesh Kumar will call you within 24 hours to confirm.",
                "திரு. ரமேஷ் குமார் 24 மணி நேரத்தில் அழைத்து உறுதி செய்வார்.",
              )
            : tr(
                "It will be sent automatically when the network comes back.",
                "இணையம் வந்தவுடன் தானாக அனுப்பப்படும்.",
              )}
        </p>

        <dl className="mx-auto space-y-3 rounded-3xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)]">
          <Line k={tr("Request ID", "கோரிக்கை எண்")} v={done.id} strong />
          <Line
            k={tr("Machine", "இயந்திரம்")}
            v={EQUIPMENT.find((e) => e.id === form.equipmentId)![ta ? "nameTa" : "name"]}
          />
          <Line k={tr("Current status", "தற்போதைய நிலை")} v={tr("Pending with CHC", "மையத்தில் காத்திருப்பு")} />
          <Line k={tr("Needed by", "தேவைப்படும் நாள்")} v={fmtDate(new Date(form.preferredDate).toISOString(), lang)} />
          <Line k={tr("Expected callback", "எதிர்பார்க்கும் அழைப்பு")} v={tr("Within 24 hours", "24 மணி நேரத்தில்")} />
        </dl>

        <div className="space-y-3">
          <Link
            to="/status"
            className="press flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            {tr("View my request", "கோரிக்கையை பார்க்க")}
            <ChevronRight className="size-5" />
          </Link>
          <a
            href={`tel:${CHC.phone.replace(/\s/g, "")}`}
            className="press flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary/25 bg-card text-lg font-bold text-primary-deep"
          >
            <Phone className="size-5" /> {tr("Call CHC", "மையத்தை அழைக்க")}
          </a>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="press h-14 w-full rounded-2xl bg-secondary text-lg font-bold text-earth"
          >
            {tr("Back to home", "முகப்புக்கு")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 px-4 py-5">
      <header>
        <h1 className="text-2xl font-bold">{tr("Request machinery", "இயந்திரம் கேட்க")}</h1>
        <p className="mt-1 text-base text-muted-foreground">
          {tr(
            "Fill this short form. Green Harvest CHC will call you back.",
            "இந்த சிறிய படிவத்தை நிரப்புங்கள். மையம் உங்களை அழைக்கும்.",
          )}
        </p>
      </header>

      <div>
        <label className={label} htmlFor="farmerName">
          {tr("Your name", "உங்கள் பெயர்")}
        </label>
        <input
          id="farmerName"
          className={input}
          value={form.farmerName}
          maxLength={60}
          onChange={(e) => set("farmerName", e.target.value)}
        />
        <FieldError msg={errors.farmerName} />
      </div>

      <div>
        <label className={label} htmlFor="mobile">
          {tr("Mobile number", "கைபேசி எண்")}
        </label>
        <input
          id="mobile"
          type="tel"
          inputMode="tel"
          className={input}
          value={form.mobile}
          maxLength={16}
          onChange={(e) => set("mobile", e.target.value)}
        />
        <FieldError msg={errors.mobile} />
      </div>

      <div>
        <label className={label} htmlFor="village">
          {tr("Village", "ஊர்")}
        </label>
        <select
          id="village"
          className={input}
          value={form.village}
          onChange={(e) => set("village", e.target.value)}
        >
          {VILLAGES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <FieldError msg={errors.village} />
      </div>

      <div>
        <span className={label}>{tr("Machine required", "தேவையான இயந்திரம்")}</span>
        <div className="mt-2 space-y-2">
          {EQUIPMENT.map((eq) => (
            <button
              key={eq.id}
              type="button"
              onClick={() => set("equipmentId", eq.id)}
              className={`press flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left ${
                form.equipmentId === eq.id
                  ? "border-primary bg-primary-soft/50"
                  : "border-border bg-card"
              }`}
            >
              <img
                src={eq.image}
                alt=""
                loading="lazy"
                width={768}
                height={512}
                className="size-14 shrink-0 rounded-xl object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate text-base font-bold">{ta ? eq.nameTa : eq.name}</span>
                <span className="block truncate text-sm text-muted-foreground">
                  {ta ? eq.waitTa : eq.wait}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="preferredDate">
          {tr("Preferred date", "விரும்பிய நாள்")}
        </label>
        <input
          id="preferredDate"
          type="date"
          className={input}
          value={form.preferredDate}
          onChange={(e) => set("preferredDate", e.target.value)}
        />
        <FieldError msg={errors.preferredDate} />
      </div>

      <div>
        <label className={label} htmlFor="landSize">
          {tr("Land size (optional)", "நில அளவு (விருப்பம்)")}
        </label>
        <input
          id="landSize"
          className={input}
          value={form.landSize}
          maxLength={30}
          onChange={(e) => set("landSize", e.target.value)}
        />
      </div>

      <div>
        <label className={label} htmlFor="notes">
          {tr("Notes (optional)", "குறிப்பு (விருப்பம்)")}
        </label>
        <textarea
          id="notes"
          rows={3}
          maxLength={300}
          className="mt-2 w-full rounded-2xl border border-border bg-card p-4 text-lg font-medium outline-none focus:border-primary"
          placeholder={tr("Example: field near the canal", "உதாரணம்: கால்வாய் அருகில் உள்ள வயல்")}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>

      {!online ? (
        <p className="rounded-2xl bg-accent/40 px-4 py-3 text-base font-semibold text-accent-foreground">
          {tr(
            "You are offline. Your request will be saved and sent automatically.",
            "இணையம் இல்லை. கோரிக்கை சேமிக்கப்பட்டு தானாக அனுப்பப்படும்.",
          )}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="press flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-[var(--shadow-soft)] disabled:opacity-70"
      >
        <Tractor className="size-6" />
        {submitting ? tr("Sending…", "அனுப்புகிறது…") : tr("Send Request", "கோரிக்கை அனுப்பு")}
      </button>

      <ContactButtons />
    </form>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-base font-semibold text-destructive">{msg}</p>;
}

function Line({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <dt className="text-base text-muted-foreground">{k}</dt>
      <dd className={strong ? "text-lg font-bold text-primary-deep" : "text-base font-semibold"}>{v}</dd>
    </div>
  );
}