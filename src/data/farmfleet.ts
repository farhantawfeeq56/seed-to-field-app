import tractorImg from "@/assets/tractor.jpg";
import rotavatorImg from "@/assets/rotavator.jpg";
import sprayerImg from "@/assets/sprayer.jpg";
import harvesterImg from "@/assets/harvester.jpg";
import seedDrillImg from "@/assets/seed-drill.jpg";
import discPloughImg from "@/assets/disc-plough.jpg";

export type RequestStatus = "pending" | "approved" | "scheduled" | "completed" | "rejected";
export type Availability = "available" | "limited" | "in_use" | "maintenance";

export interface TimelineEvent {
  label: string;
  labelTa: string;
  at: string;
  done: boolean;
}

export interface MachineryRequest {
  id: string;
  farmerId: string;
  equipmentId: string;
  machineName: string;
  submittedAt: string;
  preferredDate: string;
  scheduledDate?: string | undefined;
  status: RequestStatus;
  landSize?: string | undefined;
  notes?: string | undefined;
  village: string;
  mobile: string;
  farmerName: string;
  operator?: string | undefined;
  timeline: TimelineEvent[];
  synced: boolean;
}

export interface AppNotification {
  id: string;
  farmerId: string;
  kind: "received" | "approved" | "assigned" | "rescheduled" | "reminder" | "call" | "completed" | "info";
  title: string;
  titleTa: string;
  body: string;
  bodyTa: string;
  at: string;
  read: boolean;
  requestId?: string | undefined;
}

export interface Farmer {
  id: string;
  name: string;
  nameTa: string;
  village: string;
  villageTa: string;
  landSize: string;
  mobile: string;
  since: string;
  preferred: string[];
  distanceKm: number;
}

export interface Equipment {
  id: string;
  name: string;
  nameTa: string;
  category: string;
  categoryTa: string;
  image: string;
  availability: Availability;
  units: string;
  wait: string;
  waitTa: string;
  purpose: string;
  purposeTa: string;
  description: string;
  descriptionTa: string;
  crops: string[];
  specs: { label: string; value: string }[];
  operatorIncluded: boolean;
}

export const CHC = {
  name: "Green Harvest Custom Hiring Center",
  nameTa: "கிரீன் ஹார்வெஸ்ட் வாடகை இயந்திர மையம்",
  shortName: "Green Harvest CHC",
  registration: "Government Registered • TN/CHC/2019/0442",
  registrationTa: "அரசு பதிவு பெற்றது • TN/CHC/2019/0442",
  manager: "Mr. Ramesh Kumar",
  managerTa: "திரு. ரமேஷ் குமார்",
  address: ["12 Main Road", "Kallakurichi", "Tamil Nadu", "606202"],
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  hours: "Monday – Saturday, 8:00 AM – 6:00 PM",
  hoursTa: "திங்கள் – சனி, காலை 8:00 – மாலை 6:00",
  servingVillages: ["Kallakurichi", "Chinnasalem", "Ulundurpet", "Sankarapuram", "Rishivandiyam"],
};

export const EQUIPMENT: Equipment[] = [
  {
    id: "eq-tractor-575",
    name: "Mahindra 575 DI Tractor",
    nameTa: "மஹிந்திரா 575 DI டிராக்டர்",
    category: "Tractor",
    categoryTa: "டிராக்டர்",
    image: tractorImg,
    availability: "available",
    units: "2 of 3 free today",
    wait: "Usually within 1 day",
    waitTa: "பொதுவாக 1 நாளில்",
    purpose: "Ploughing, hauling and pulling implements",
    purposeTa: "உழவு, இழுவை மற்றும் கருவி இணைப்பு",
    description:
      "45 HP tractor kept at the CHC yard. Comes with a trained driver. Best for field preparation before sowing and for carrying harvested bags to the market.",
    descriptionTa:
      "45 குதிரைத்திறன் டிராக்டர். பயிற்சி பெற்ற ஓட்டுநருடன் வழங்கப்படும். விதைப்புக்கு முன் நிலம் தயார் செய்யவும் மூட்டைகளை சந்தைக்கு எடுத்துச் செல்லவும் ஏற்றது.",
    crops: ["Paddy", "Sugarcane", "Groundnut", "Maize"],
    specs: [
      { label: "Power", value: "45 HP" },
      { label: "Operator", value: "Included" },
      { label: "Covers", value: "Up to 5 acres/day" },
    ],
    operatorIncluded: true,
  },
  {
    id: "eq-rotavator",
    name: "John Deere Rotavator",
    nameTa: "ஜான் டியர் ரோட்டவேட்டர்",
    category: "Tillage",
    categoryTa: "நிலம் தயாரிப்பு",
    image: rotavatorImg,
    availability: "limited",
    units: "1 of 2 free today",
    wait: "Usually within 2 days",
    waitTa: "பொதுவாக 2 நாட்களில்",
    purpose: "Breaking clods and levelling soil",
    purposeTa: "மண் கட்டிகளை உடைத்து சமன் செய்ய",
    description:
      "7 feet rotavator attached to the CHC tractor. Turns hard soil into a fine seed bed in a single pass, saving two rounds of ploughing.",
    descriptionTa:
      "7 அடி ரோட்டவேட்டர், CHC டிராக்டருடன் இணைக்கப்படும். ஒரே சுற்றில் மண்ணை நன்கு பொடியாக்கி விதைப்புக்கு தயார் செய்யும்.",
    crops: ["Paddy", "Cotton", "Pulses", "Vegetables"],
    specs: [
      { label: "Width", value: "7 feet" },
      { label: "Blades", value: "42" },
      { label: "Covers", value: "3 acres/day" },
    ],
    operatorIncluded: true,
  },
  {
    id: "eq-sprayer",
    name: "Power Sprayer",
    nameTa: "பவர் ஸ்பிரேயர்",
    category: "Crop Care",
    categoryTa: "பயிர் பராமரிப்பு",
    image: sprayerImg,
    availability: "available",
    units: "4 of 6 free today",
    wait: "Same day pick-up",
    waitTa: "அதே நாளில் பெறலாம்",
    purpose: "Spraying pesticide and liquid fertiliser",
    purposeTa: "பூச்சிக்கொல்லி மற்றும் திரவ உரம் தெளிக்க",
    description:
      "16 litre engine-driven knapsack sprayer. Light enough to carry across wet fields and can be collected directly from the CHC counter.",
    descriptionTa:
      "16 லிட்டர் இயந்திர ஸ்பிரேயர். எடை குறைவு, ஈரமான வயலிலும் எளிதாக பயன்படுத்தலாம். CHC அலுவலகத்திலேயே பெற்றுக்கொள்ளலாம்.",
    crops: ["Paddy", "Chilli", "Banana", "Vegetables"],
    specs: [
      { label: "Tank", value: "16 litres" },
      { label: "Type", value: "Knapsack" },
      { label: "Operator", value: "Self use" },
    ],
    operatorIncluded: false,
  },
  {
    id: "eq-harvester",
    name: "Combine Harvester",
    nameTa: "அறுவடை இயந்திரம்",
    category: "Harvest",
    categoryTa: "அறுவடை",
    image: harvesterImg,
    availability: "in_use",
    units: "Both machines booked this week",
    wait: "Next free slot in 6 days",
    waitTa: "அடுத்த இடம் 6 நாட்களில்",
    purpose: "Cutting and threshing paddy in one pass",
    purposeTa: "நெல் அறுவடை மற்றும் கதிரடி ஒரே முறையில்",
    description:
      "Track-type harvester that works even in slightly wet fields. Harvests and cleans grain together, so one acre finishes in about an hour.",
    descriptionTa:
      "சற்று ஈரமான வயலிலும் வேலை செய்யும் அறுவடை இயந்திரம். ஒரு ஏக்கர் சுமார் ஒரு மணி நேரத்தில் முடியும்.",
    crops: ["Paddy", "Wheat", "Sorghum"],
    specs: [
      { label: "Cutting width", value: "2 metres" },
      { label: "Operator", value: "Included" },
      { label: "Covers", value: "8 acres/day" },
    ],
    operatorIncluded: true,
  },
  {
    id: "eq-seed-drill",
    name: "Seed Drill",
    nameTa: "விதைப்பு இயந்திரம்",
    category: "Sowing",
    categoryTa: "விதைப்பு",
    image: seedDrillImg,
    availability: "available",
    units: "1 of 1 free today",
    wait: "Usually within 2 days",
    waitTa: "பொதுவாக 2 நாட்களில்",
    purpose: "Sowing seed in straight rows at even depth",
    purposeTa: "சம ஆழத்தில் நேர் வரிசையில் விதைக்க",
    description:
      "9-row seed drill that places seed and basal fertiliser together. Saves about a third of the seed compared to broadcasting by hand.",
    descriptionTa:
      "9 வரிசை விதைப்பு இயந்திரம். விதையுடன் அடி உரமும் சேர்த்து இடும். கையால் தூவுவதை விட மூன்றில் ஒரு பங்கு விதை மிச்சம்.",
    crops: ["Groundnut", "Maize", "Black gram", "Millets"],
    specs: [
      { label: "Rows", value: "9" },
      { label: "Operator", value: "Included" },
      { label: "Covers", value: "4 acres/day" },
    ],
    operatorIncluded: true,
  },
  {
    id: "eq-disc-plough",
    name: "Disc Plough",
    nameTa: "வட்டு கலப்பை",
    category: "Tillage",
    categoryTa: "நிலம் தயாரிப்பு",
    image: discPloughImg,
    availability: "maintenance",
    units: "Under service until Thursday",
    wait: "Available after servicing",
    waitTa: "பழுது நீக்கிய பின் கிடைக்கும்",
    purpose: "Deep ploughing of hard and dry land",
    purposeTa: "கடினமான வறண்ட நிலத்தை ஆழ உழ",
    description:
      "3-disc plough for the first ploughing of dry, hard soil after harvest. Currently in the workshop for blade replacement.",
    descriptionTa:
      "அறுவடைக்குப் பின் கடினமான நிலத்தை முதல் முறை உழ. தற்போது கத்தி மாற்றுவதற்காக பட்டறையில் உள்ளது.",
    crops: ["Sugarcane", "Cotton", "Groundnut"],
    specs: [
      { label: "Discs", value: "3" },
      { label: "Depth", value: "Up to 12 inches" },
      { label: "Operator", value: "Included" },
    ],
    operatorIncluded: true,
  },
];

export const FARMERS: Farmer[] = [
  {
    id: "f-murugan",
    name: "M. Murugan",
    nameTa: "மு. முருகன்",
    village: "Kallakurichi",
    villageTa: "கள்ளக்குறிச்சி",
    landSize: "2 acres",
    mobile: "+91 94421 07783",
    since: "Farmer with us since June 2023",
    preferred: ["eq-tractor-575", "eq-rotavator"],
    distanceKm: 2.4,
  },
  {
    id: "f-lakshmi",
    name: "Lakshmi Ammal",
    nameTa: "லட்சுமி அம்மாள்",
    village: "Chinnasalem",
    villageTa: "சின்னசேலம்",
    landSize: "1.5 acres",
    mobile: "+91 90031 55214",
    since: "Farmer with us since March 2024",
    preferred: ["eq-sprayer", "eq-rotavator"],
    distanceKm: 11.8,
  },
  {
    id: "f-selvam",
    name: "R. Selvam",
    nameTa: "ரா. செல்வம்",
    village: "Ulundurpet",
    villageTa: "உளுந்தூர்பேட்டை",
    landSize: "5 acres",
    mobile: "+91 98428 61190",
    since: "Farmer with us since November 2021",
    preferred: ["eq-harvester", "eq-tractor-575"],
    distanceKm: 18.2,
  },
  {
    id: "f-kumaravel",
    name: "Kumaravel",
    nameTa: "குமரவேல்",
    village: "Sankarapuram",
    villageTa: "சங்கராபுரம்",
    landSize: "3 acres",
    mobile: "+91 89395 44027",
    since: "Newly joined this month",
    preferred: [],
    distanceKm: 22.6,
  },
];

export const ANNOUNCEMENTS = [
  {
    id: "an-1",
    title: "Two extra tractors added for the samba season",
    titleTa: "சம்பா பருவத்திற்கு இரண்டு கூடுதல் டிராக்டர்கள்",
    body: "Waiting time for ploughing requests is now about one day.",
    bodyTa: "உழவு கோரிக்கைகளுக்கான காத்திருப்பு நேரம் இப்போது ஒரு நாள்.",
    date: "Posted 2 days ago",
    dateTa: "2 நாட்களுக்கு முன்",
    tone: "good" as const,
  },
  {
    id: "an-2",
    title: "Harvester bookings are heavy this week",
    titleTa: "இந்த வாரம் அறுவடை இயந்திரத்திற்கு அதிக கோரிக்கை",
    body: "Please request at least 5 days before your planned harvest date.",
    bodyTa: "அறுவடைக்கு குறைந்தது 5 நாட்கள் முன்பே கோரிக்கை வையுங்கள்.",
    date: "Posted 4 days ago",
    dateTa: "4 நாட்களுக்கு முன்",
    tone: "warn" as const,
  },
  {
    id: "an-3",
    title: "CHC office open on Saturday till 6 PM",
    titleTa: "சனிக்கிழமை மாலை 6 மணி வரை அலுவலகம் திறந்திருக்கும்",
    body: "Sprayers can be collected directly from the counter without a request.",
    bodyTa: "ஸ்பிரேயர்களை கோரிக்கை இன்றி நேரடியாக பெறலாம்.",
    date: "Posted 1 week ago",
    dateTa: "1 வாரத்திற்கு முன்",
    tone: "info" as const,
  },
];

const day = 86400000;
const iso = (offsetDays: number, hour = 10, minute = 0) => {
  const d = new Date(Date.now() + offsetDays * day);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const seedRequests = (): MachineryRequest[] => [
  {
    id: "FF-2481",
    farmerId: "f-murugan",
    equipmentId: "eq-tractor-575",
    machineName: "Mahindra 575 DI Tractor",
    submittedAt: iso(-2, 9, 20),
    preferredDate: iso(2, 7, 0),
    status: "pending",
    landSize: "2 acres",
    notes: "Field near the canal, please come before noon.",
    village: "Kallakurichi",
    mobile: "+91 94421 07783",
    farmerName: "M. Murugan",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-2, 9, 20), done: true },
      { label: "CHC reviewing", labelTa: "மையம் பரிசீலிக்கிறது", at: iso(-1, 11, 5), done: true },
      { label: "Approval", labelTa: "ஒப்புதல்", at: "", done: false },
      { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: "", done: false },
      { label: "Work completed", labelTa: "வேலை முடிந்தது", at: "", done: false },
    ],
  },
  {
    id: "FF-2317",
    farmerId: "f-murugan",
    equipmentId: "eq-rotavator",
    machineName: "John Deere Rotavator",
    submittedAt: iso(-26, 8, 10),
    preferredDate: iso(-22, 7, 0),
    scheduledDate: iso(-22, 7, 30),
    status: "completed",
    landSize: "2 acres",
    village: "Kallakurichi",
    mobile: "+91 94421 07783",
    farmerName: "M. Murugan",
    operator: "Driver: Anbarasu",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-26, 8, 10), done: true },
      { label: "Approved by CHC", labelTa: "மையம் ஒப்புதல் அளித்தது", at: iso(-25, 10, 0), done: true },
      { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: iso(-24, 16, 40), done: true },
      { label: "Work completed", labelTa: "வேலை முடிந்தது", at: iso(-22, 12, 15), done: true },
    ],
  },
  {
    id: "FF-2495",
    farmerId: "f-lakshmi",
    equipmentId: "eq-sprayer",
    machineName: "Power Sprayer",
    submittedAt: iso(-1, 17, 45),
    preferredDate: iso(1, 7, 0),
    status: "approved",
    landSize: "1.5 acres",
    notes: "Chilli crop, leaf curl problem.",
    village: "Chinnasalem",
    mobile: "+91 90031 55214",
    farmerName: "Lakshmi Ammal",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-1, 17, 45), done: true },
      { label: "Approved by CHC", labelTa: "மையம் ஒப்புதல் அளித்தது", at: iso(0, 9, 10), done: true },
      { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: "", done: false },
      { label: "Work completed", labelTa: "வேலை முடிந்தது", at: "", done: false },
    ],
  },
  {
    id: "FF-2402",
    farmerId: "f-lakshmi",
    equipmentId: "eq-rotavator",
    machineName: "John Deere Rotavator",
    submittedAt: iso(-14, 12, 0),
    preferredDate: iso(-11, 7, 0),
    status: "rejected",
    landSize: "1.5 acres",
    notes: "Requested for the same morning as three other villages.",
    village: "Chinnasalem",
    mobile: "+91 90031 55214",
    farmerName: "Lakshmi Ammal",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-14, 12, 0), done: true },
      {
        label: "Could not be allotted — machine already booked",
        labelTa: "ஒதுக்க முடியவில்லை — இயந்திரம் முன்பதிவு",
        at: iso(-13, 9, 30),
        done: true,
      },
    ],
  },
  {
    id: "FF-2470",
    farmerId: "f-selvam",
    equipmentId: "eq-harvester",
    machineName: "Combine Harvester",
    submittedAt: iso(-5, 7, 55),
    preferredDate: iso(3, 6, 30),
    scheduledDate: iso(3, 6, 30),
    status: "scheduled",
    landSize: "5 acres",
    notes: "Paddy is fully ripe, road access from the east side.",
    village: "Ulundurpet",
    mobile: "+91 98428 61190",
    farmerName: "R. Selvam",
    operator: "Driver: Sakthivel",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-5, 7, 55), done: true },
      { label: "Approved by CHC", labelTa: "மையம் ஒப்புதல் அளித்தது", at: iso(-4, 10, 20), done: true },
      { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: iso(-2, 15, 0), done: true },
      { label: "Work completed", labelTa: "வேலை முடிந்தது", at: "", done: false },
    ],
  },
  {
    id: "FF-2288",
    farmerId: "f-selvam",
    equipmentId: "eq-tractor-575",
    machineName: "Mahindra 575 DI Tractor",
    submittedAt: iso(-40, 6, 40),
    preferredDate: iso(-37, 7, 0),
    scheduledDate: iso(-37, 7, 0),
    status: "completed",
    landSize: "5 acres",
    village: "Ulundurpet",
    mobile: "+91 98428 61190",
    farmerName: "R. Selvam",
    operator: "Driver: Anbarasu",
    synced: true,
    timeline: [
      { label: "Request received", labelTa: "கோரிக்கை பெறப்பட்டது", at: iso(-40, 6, 40), done: true },
      { label: "Approved by CHC", labelTa: "மையம் ஒப்புதல் அளித்தது", at: iso(-39, 9, 0), done: true },
      { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: iso(-38, 17, 20), done: true },
      { label: "Work completed", labelTa: "வேலை முடிந்தது", at: iso(-37, 13, 45), done: true },
    ],
  },
];

export const seedNotifications = (): AppNotification[] => [
  {
    id: "n-1",
    farmerId: "f-murugan",
    kind: "received",
    title: "Request FF-2481 received",
    titleTa: "கோரிக்கை FF-2481 பெறப்பட்டது",
    body: "Green Harvest CHC has your tractor request. Someone will call you soon.",
    bodyTa: "உங்கள் டிராக்டர் கோரிக்கை மையத்திற்கு சென்றுவிட்டது. விரைவில் அழைப்பு வரும்.",
    at: iso(-2, 9, 21),
    read: true,
    requestId: "FF-2481",
  },
  {
    id: "n-2",
    farmerId: "f-murugan",
    kind: "call",
    title: "CHC tried to call you",
    titleTa: "மையம் உங்களை அழைக்க முயன்றது",
    body: "Mr. Ramesh Kumar called at 11:05 AM about request FF-2481.",
    bodyTa: "திரு. ரமேஷ் குமார் காலை 11:05 மணிக்கு அழைத்தார்.",
    at: iso(-1, 11, 5),
    read: false,
    requestId: "FF-2481",
  },
  {
    id: "n-3",
    farmerId: "f-murugan",
    kind: "completed",
    title: "Rotavator work completed",
    titleTa: "ரோட்டவேட்டர் வேலை முடிந்தது",
    body: "Request FF-2317 was finished on your 2 acre field. Thank you.",
    bodyTa: "FF-2317 கோரிக்கை உங்கள் 2 ஏக்கர் நிலத்தில் முடிந்தது. நன்றி.",
    at: iso(-22, 12, 20),
    read: true,
    requestId: "FF-2317",
  },
  {
    id: "n-4",
    farmerId: "f-lakshmi",
    kind: "approved",
    title: "Request FF-2495 approved",
    titleTa: "கோரிக்கை FF-2495 ஒப்புதல் பெற்றது",
    body: "Your power sprayer is approved. Collect it from the CHC counter tomorrow morning.",
    bodyTa: "உங்கள் ஸ்பிரேயர் ஒப்புதல் பெற்றது. நாளை காலை மையத்தில் பெற்றுக்கொள்ளுங்கள்.",
    at: iso(0, 9, 10),
    read: false,
    requestId: "FF-2495",
  },
  {
    id: "n-5",
    farmerId: "f-lakshmi",
    kind: "reminder",
    title: "Bring your own filled water can",
    titleTa: "தண்ணீர் கேன் எடுத்து வாருங்கள்",
    body: "For sprayer collection, please bring a filled water can and your ID.",
    bodyTa: "ஸ்பிரேயர் பெறும்போது தண்ணீர் கேன் மற்றும் அடையாள அட்டை கொண்டு வரவும்.",
    at: iso(0, 9, 12),
    read: false,
  },
  {
    id: "n-6",
    farmerId: "f-selvam",
    kind: "assigned",
    title: "Harvester assigned to you",
    titleTa: "அறுவடை இயந்திரம் ஒதுக்கப்பட்டது",
    body: "Driver Sakthivel will reach your field for request FF-2470.",
    bodyTa: "ஓட்டுநர் சக்திவேல் உங்கள் வயலுக்கு வருவார்.",
    at: iso(-2, 15, 2),
    read: true,
    requestId: "FF-2470",
  },
  {
    id: "n-7",
    farmerId: "f-selvam",
    kind: "rescheduled",
    title: "Timing changed to 6:30 AM",
    titleTa: "நேரம் காலை 6:30 ஆக மாற்றப்பட்டது",
    body: "The harvester will now start early morning to avoid the afternoon dew.",
    bodyTa: "பனி காரணமாக அறுவடை அதிகாலையில் தொடங்கும்.",
    at: iso(-1, 18, 30),
    read: false,
    requestId: "FF-2470",
  },
  {
    id: "n-8",
    farmerId: "f-kumaravel",
    kind: "info",
    title: "Welcome to Green Harvest CHC",
    titleTa: "கிரீன் ஹார்வெஸ்ட் மையத்திற்கு வரவேற்கிறோம்",
    body: "Your village Sankarapuram is served by our center. Request any machine in under a minute.",
    bodyTa: "உங்கள் ஊர் சங்கராபுரம் எங்கள் மையத்தின் கீழ் வருகிறது. ஒரு நிமிடத்தில் கோரிக்கை வையுங்கள்.",
    at: iso(-3, 10, 0),
    read: false,
  },
];

export const VILLAGES = [
  "Kallakurichi",
  "Chinnasalem",
  "Ulundurpet",
  "Sankarapuram",
  "Rishivandiyam",
  "Tirukoilur",
];

export const statusMeta: Record<
  RequestStatus,
  { label: string; labelTa: string; className: string }
> = {
  pending: {
    label: "Pending",
    labelTa: "காத்திருப்பில்",
    className: "bg-warning/15 text-[color:var(--warning)] border-[color:var(--warning)]/30",
  },
  approved: {
    label: "Approved",
    labelTa: "ஒப்புதல்",
    className: "bg-primary/12 text-primary border-primary/30",
  },
  scheduled: {
    label: "Scheduled",
    labelTa: "திட்டமிடப்பட்டது",
    className: "bg-info/12 text-[color:var(--info)] border-[color:var(--info)]/30",
  },
  completed: {
    label: "Completed",
    labelTa: "முடிந்தது",
    className: "bg-success/15 text-[color:var(--success)] border-[color:var(--success)]/30",
  },
  rejected: {
    label: "Not allotted",
    labelTa: "ஒதுக்கப்படவில்லை",
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export const availabilityMeta: Record<
  Availability,
  { label: string; labelTa: string; dot: string; className: string }
> = {
  available: {
    label: "Available now",
    labelTa: "இப்போது கிடைக்கும்",
    dot: "bg-[color:var(--success)]",
    className: "bg-success/15 text-[color:var(--success)]",
  },
  limited: {
    label: "Few left",
    labelTa: "சில மட்டுமே",
    dot: "bg-[color:var(--warning)]",
    className: "bg-warning/15 text-[color:var(--warning)]",
  },
  in_use: {
    label: "Fully booked",
    labelTa: "முழு முன்பதிவு",
    dot: "bg-earth",
    className: "bg-earth/12 text-earth",
  },
  maintenance: {
    label: "Under repair",
    labelTa: "பழுது நீக்கம்",
    dot: "bg-muted-foreground",
    className: "bg-muted text-muted-foreground",
  },
};