export type Lang = "en" | "ta";

export const dict = {
  home: { en: "Home", ta: "முகப்பு" },
  request: { en: "Request", ta: "கோரிக்கை" },
  status: { en: "Status", ta: "நிலை" },
  equipment: { en: "Equipment", ta: "இயந்திரங்கள்" },
  contact: { en: "Contact", ta: "தொடர்பு" },
  notifications: { en: "Updates", ta: "தகவல்கள்" },
  callChc: { en: "Call CHC", ta: "மையத்தை அழைக்க" },
  callNow: { en: "Call Now", ta: "இப்போது அழைக்க" },
  whatsapp: { en: "WhatsApp", ta: "வாட்ஸ்அப்" },
  requestMachinery: { en: "Request Machinery", ta: "இயந்திரம் கேட்க" },
  workingHours: { en: "Working hours", ta: "வேலை நேரம்" },
  yourCentre: { en: "Your Custom Hiring Center", ta: "உங்கள் வாடகை இயந்திர மையம்" },
  govRegistered: { en: "Government Registered", ta: "அரசு பதிவு" },
  announcements: { en: "News from the CHC", ta: "மையத்தின் அறிவிப்புகள்" },
  viewAll: { en: "See all", ta: "அனைத்தும்" },
  availableMachines: { en: "Machines at your CHC", ta: "மையத்தில் உள்ள இயந்திரங்கள்" },
  yourRequests: { en: "Your requests", ta: "உங்கள் கோரிக்கைகள்" },
  offline: { en: "You are offline", ta: "இணையம் இல்லை" },
  offlineNote: {
    en: "Your requests are saved on this phone and will be sent automatically.",
    ta: "உங்கள் கோரிக்கைகள் இந்த போனில் பாதுகாப்பாக சேமிக்கப்படும்.",
  },
  lastSynced: { en: "Last updated", ta: "கடைசி புதுப்பிப்பு" },
  syncing: { en: "Sending saved requests…", ta: "சேமித்த கோரிக்கைகள் அனுப்பப்படுகிறது…" },
  goodMorning: { en: "Good morning", ta: "காலை வணக்கம்" },
  goodAfternoon: { en: "Good afternoon", ta: "மதிய வணக்கம்" },
  goodEvening: { en: "Good evening", ta: "மாலை வணக்கம்" },
  demoMode: { en: "Demo Mode • Viewing as", ta: "டெமோ முறை • பார்ப்பவர்" },
  submit: { en: "Send Request", ta: "கோரிக்கை அனுப்பு" },
  back: { en: "Back", ta: "பின்" },
} as const;

export type DictKey = keyof typeof dict;

export const makeT =
  (lang: Lang) =>
  (key: DictKey): string =>
    dict[key][lang];

export const pick = (lang: Lang, en: string, ta: string) => (lang === "ta" ? ta : en);