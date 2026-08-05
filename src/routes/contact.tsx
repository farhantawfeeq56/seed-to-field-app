import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Clock3, MapPin, PhoneCall, TriangleAlert, UserRound } from "lucide-react";
import { CHC } from "@/data/farmfleet";
import { useFarmFleet } from "@/lib/store";
import { ContactButtons } from "@/components/farmfleet/ContactButtons";
import mapImg from "@/assets/map-preview.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Green Harvest CHC — FarmFleet" },
      {
        name: "description",
        content:
          "Call or WhatsApp Green Harvest Custom Hiring Center, Kallakurichi. Manager Mr. Ramesh Kumar, open Monday to Saturday 8 AM to 6 PM.",
      },
      { property: "og:title", content: "Contact Green Harvest CHC" },
      {
        property: "og:description",
        content: "Phone, WhatsApp, address and working hours of your Custom Hiring Center.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { farmer, lang, tr } = useFarmFleet();
  const ta = lang === "ta";

  return (
    <div className="space-y-5 px-4 py-5">
      <header>
        <h1 className="text-2xl font-bold">{tr("Contact your CHC", "மையத்தை தொடர்பு கொள்ள")}</h1>
        <p className="mt-1 text-base text-muted-foreground">
          {tr(
            "Speak directly to Green Harvest CHC. They handle all machinery for your village.",
            "கிரீன் ஹார்வெஸ்ட் மையத்துடன் நேரடியாக பேசுங்கள்.",
          )}
        </p>
      </header>

      <ContactButtons large />

      <section className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div>
          <h2 className="text-xl font-bold">{ta ? CHC.nameTa : CHC.name}</h2>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary-deep">
            <BadgeCheck className="size-4" />
            {ta ? CHC.registrationTa : CHC.registration}
          </p>
        </div>
        <Item icon={<UserRound className="size-5" />} title={tr("Manager", "மேலாளர்")} value={ta ? CHC.managerTa : CHC.manager} />
        <Item icon={<PhoneCall className="size-5" />} title={tr("Phone & WhatsApp", "தொலைபேசி & வாட்ஸ்அப்")} value={CHC.phone} />
        <Item icon={<Clock3 className="size-5" />} title={tr("Working hours", "வேலை நேரம்")} value={ta ? CHC.hoursTa : CHC.hours} />
        <Item icon={<MapPin className="size-5" />} title={tr("Address", "முகவரி")} value={CHC.address.join(", ")} />
        <Item
          icon={<MapPin className="size-5" />}
          title={tr("Your village", "உங்கள் ஊர்")}
          value={`${ta ? farmer.villageTa : farmer.village} • ${farmer.distanceKm} km`}
        />
      </section>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <img
          src={mapImg}
          alt={tr("Map of the area around Green Harvest CHC", "மையத்தை சுற்றியுள்ள வரைபடம்")}
          loading="lazy"
          width={768}
          height={512}
          className="h-44 w-full object-cover"
        />
        <p className="p-4 text-base text-muted-foreground">
          {tr(
            "12 Main Road, next to the agriculture office bus stop, Kallakurichi.",
            "12 மெயின் ரோடு, வேளாண் அலுவலக பேருந்து நிறுத்தம் அருகில், கள்ளக்குறிச்சி.",
          )}
        </p>
      </div>

      <p className="flex gap-3 rounded-3xl bg-accent/40 p-4 text-base font-semibold text-accent-foreground">
        <TriangleAlert className="size-5 shrink-0" />
        {tr(
          "For urgent harvest help, call directly instead of sending a request. The office answers faster on phone.",
          "அவசர அறுவடை உதவிக்கு கோரிக்கை அனுப்பாமல் நேரடியாக அழையுங்கள்.",
        )}
      </p>
    </div>
  );
}

function Item({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-earth">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-muted-foreground">{title}</p>
        <p className="text-base font-bold">{value}</p>
      </div>
    </div>
  );
}