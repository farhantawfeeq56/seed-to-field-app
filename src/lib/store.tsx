import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import {
  EQUIPMENT,
  FARMERS,
  seedNotifications,
  seedRequests,
  type AppNotification,
  type Farmer,
  type MachineryRequest,
} from "@/data/farmfleet";
import { makeT, pick, type Lang } from "@/lib/i18n";

export type TimeOfDay = "morning" | "afternoon" | "evening";

interface Persisted {
  farmerId: string;
  requests: MachineryRequest[];
  notifications: AppNotification[];
  lang: Lang;
  timeOfDay: TimeOfDay;
  lastSynced: string;
}

const KEY = "farmfleet.state.v1";

const freshState = (): Persisted => ({
  farmerId: FARMERS[0].id,
  requests: seedRequests(),
  notifications: seedNotifications(),
  lang: "en",
  timeOfDay: "morning",
  lastSynced: new Date().toISOString(),
});

interface Ctx {
  ready: boolean;
  farmer: Farmer;
  farmers: Farmer[];
  setFarmer: (id: string) => void;
  requests: MachineryRequest[];
  allRequests: MachineryRequest[];
  notifications: AppNotification[];
  unread: number;
  online: boolean;
  setOnline: (v: boolean) => void;
  timeOfDay: TimeOfDay;
  setTimeOfDay: (t: TimeOfDay) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: ReturnType<typeof makeT>;
  tr: (en: string, ta: string) => string;
  lastSynced: string;
  syncing: boolean;
  refresh: () => Promise<void>;
  createRequest: (input: NewRequestInput) => MachineryRequest;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clearRequests: () => void;
  resetDemo: () => void;
  generateNotification: () => void;
  generateRequest: () => void;
  advanceRequest: (id: string) => void;
}

export interface NewRequestInput {
  farmerName: string;
  mobile: string;
  village: string;
  equipmentId: string;
  preferredDate: string;
  landSize?: string;
  notes?: string;
}

const FarmFleetContext = createContext<Ctx | null>(null);

let idCounter = 2500;
const nextRequestId = () => `FF-${++idCounter}`;

export function FarmFleetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(freshState);
  const [ready, setReady] = useState(false);
  const [online, setOnlineRaw] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const wasOffline = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Persisted;
        setState({ ...freshState(), ...parsed });
        const maxId = parsed.requests.reduce((m, r) => {
          const n = Number(r.id.replace("FF-", ""));
          return Number.isFinite(n) && n > m ? n : m;
        }, idCounter);
        idCounter = maxId;
      }
    } catch {
      /* first run */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const t = useMemo(() => makeT(state.lang), [state.lang]);
  const tr = useCallback((en: string, ta: string) => pick(state.lang, en, ta), [state.lang]);

  const farmer = useMemo(
    () => FARMERS.find((f) => f.id === state.farmerId) ?? FARMERS[0],
    [state.farmerId],
  );

  const requests = useMemo(
    () =>
      state.requests
        .filter((r) => r.farmerId === state.farmerId)
        .sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)),
    [state.requests, state.farmerId],
  );

  const notifications = useMemo(
    () =>
      state.notifications
        .filter((n) => n.farmerId === state.farmerId)
        .sort((a, b) => +new Date(b.at) - +new Date(a.at)),
    [state.notifications, state.farmerId],
  );

  const unread = notifications.filter((n) => !n.read).length;

  const pushNotification = useCallback((n: AppNotification) => {
    setState((s) => ({ ...s, notifications: [n, ...s.notifications] }));
  }, []);

  const setOnline = useCallback((v: boolean) => {
    setOnlineRaw(v);
  }, []);

  // Automatic sync when connection returns
  useEffect(() => {
    if (!ready) return;
    if (!online) {
      wasOffline.current = true;
      return;
    }
    if (!wasOffline.current) return;
    wasOffline.current = false;
    const unsent = state.requests.filter((r) => !r.synced).length;
    if (unsent === 0) return;
    setSyncing(true);
    const timer = setTimeout(() => {
      setState((s) => ({
        ...s,
        requests: s.requests.map((r) => ({ ...r, synced: true })),
        lastSynced: new Date().toISOString(),
      }));
      setSyncing(false);
      toast.success(
        tr(
          `${unsent} saved request${unsent > 1 ? "s" : ""} sent to the CHC`,
          `${unsent} சேமித்த கோரிக்கை மையத்திற்கு அனுப்பப்பட்டது`,
        ),
      );
    }, 1800);
    return () => clearTimeout(timer);
  }, [online, ready, state.requests, tr]);

  const refresh = useCallback(async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 900));
    setSyncing(false);
    if (!online) {
      toast.error(tr("No connection. Showing saved information.", "இணைப்பு இல்லை. சேமித்த தகவல்."));
      return;
    }
    setState((s) => ({ ...s, lastSynced: new Date().toISOString() }));
    toast.success(tr("Updated just now", "இப்போது புதுப்பிக்கப்பட்டது"));
  }, [online, tr]);

  const createRequest = useCallback(
    (input: NewRequestInput) => {
      const eq = EQUIPMENT.find((e) => e.id === input.equipmentId)!;
      const now = new Date().toISOString();
      const req: MachineryRequest = {
        id: nextRequestId(),
        farmerId: state.farmerId,
        equipmentId: eq.id,
        machineName: eq.name,
        submittedAt: now,
        preferredDate: input.preferredDate,
        status: "pending",
        landSize: input.landSize,
        notes: input.notes,
        village: input.village,
        mobile: input.mobile,
        farmerName: input.farmerName,
        synced: online,
        timeline: [
          {
            label: online ? "Request received" : "Saved on your phone",
            labelTa: online ? "கோரிக்கை பெறப்பட்டது" : "உங்கள் போனில் சேமிக்கப்பட்டது",
            at: now,
            done: true,
          },
          { label: "CHC reviewing", labelTa: "மையம் பரிசீலிக்கிறது", at: "", done: false },
          { label: "Approval", labelTa: "ஒப்புதல்", at: "", done: false },
          { label: "Machine scheduled", labelTa: "இயந்திரம் ஒதுக்கீடு", at: "", done: false },
          { label: "Work completed", labelTa: "வேலை முடிந்தது", at: "", done: false },
        ],
      };
      setState((s) => ({
        ...s,
        requests: [req, ...s.requests],
        notifications: [
          {
            id: `n-${req.id}`,
            farmerId: s.farmerId,
            kind: "received",
            title: online ? `Request ${req.id} received` : `Request ${req.id} saved offline`,
            titleTa: online
              ? `கோரிக்கை ${req.id} பெறப்பட்டது`
              : `கோரிக்கை ${req.id} போனில் சேமிக்கப்பட்டது`,
            body: online
              ? `Green Harvest CHC has your ${eq.name} request. Expect a call within 24 hours.`
              : `It will be sent to the CHC automatically when the network returns.`,
            bodyTa: online
              ? `உங்கள் ${eq.nameTa} கோரிக்கை மையத்திற்கு சென்றது. 24 மணி நேரத்தில் அழைப்பு வரும்.`
              : `இணையம் வந்தவுடன் தானாக மையத்திற்கு அனுப்பப்படும்.`,
            at: now,
            read: false,
            requestId: req.id,
          },
          ...s.notifications,
        ],
      }));
      return req;
    },
    [state.farmerId, online],
  );

  const advanceRequest = useCallback((id: string) => {
    const order = ["pending", "approved", "scheduled", "completed"] as const;
    setState((s) => ({
      ...s,
      requests: s.requests.map((r) => {
        if (r.id !== id) return r;
        const i = order.indexOf(r.status as (typeof order)[number]);
        if (i < 0 || i === order.length - 1) return r;
        const next = order[i + 1];
        const at = new Date().toISOString();
        const timeline = [...r.timeline];
        const pendingIdx = timeline.findIndex((e) => !e.done);
        if (pendingIdx >= 0) timeline[pendingIdx] = { ...timeline[pendingIdx], done: true, at };
        return {
          ...r,
          status: next,
          scheduledDate: next === "scheduled" ? r.preferredDate : r.scheduledDate,
          timeline,
        };
      }),
    }));
  }, []);

  const value: Ctx = {
    ready,
    farmer,
    farmers: FARMERS,
    setFarmer: (id) => setState((s) => ({ ...s, farmerId: id })),
    requests,
    allRequests: state.requests,
    notifications,
    unread,
    online,
    setOnline,
    timeOfDay: state.timeOfDay,
    setTimeOfDay: (timeOfDay) => setState((s) => ({ ...s, timeOfDay })),
    lang: state.lang,
    setLang: (lang) => setState((s) => ({ ...s, lang })),
    t,
    tr,
    lastSynced: state.lastSynced,
    syncing,
    refresh,
    createRequest,
    markAllRead: () =>
      setState((s) => ({
        ...s,
        notifications: s.notifications.map((n) =>
          n.farmerId === s.farmerId ? { ...n, read: true } : n,
        ),
      })),
    markRead: (id) =>
      setState((s) => ({
        ...s,
        notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      })),
    clearRequests: () =>
      setState((s) => ({
        ...s,
        requests: s.requests.filter((r) => r.farmerId !== s.farmerId),
      })),
    resetDemo: () => {
      const f = freshState();
      setState({ ...f, farmerId: state.farmerId, lang: state.lang, timeOfDay: state.timeOfDay });
    },
    generateNotification: () => {
      const samples: Pick<AppNotification, "kind" | "title" | "titleTa" | "body" | "bodyTa">[] = [
        {
          kind: "call",
          title: "CHC attempted to call you",
          titleTa: "மையம் அழைக்க முயன்றது",
          body: "Mr. Ramesh Kumar tried your number. Please call back when free.",
          bodyTa: "திரு. ரமேஷ் குமார் அழைத்தார். நேரம் கிடைக்கும்போது திரும்ப அழைக்கவும்.",
        },
        {
          kind: "reminder",
          title: "Keep the field boundary clear",
          titleTa: "வயல் வரப்பை காலியாக வைக்கவும்",
          body: "The machine needs a clear path to enter your field tomorrow.",
          bodyTa: "நாளை இயந்திரம் வர வழி காலியாக இருக்க வேண்டும்.",
        },
        {
          kind: "assigned",
          title: "Driver assigned",
          titleTa: "ஓட்டுநர் ஒதுக்கப்பட்டார்",
          body: "Driver Anbarasu will handle your work and will call before starting.",
          bodyTa: "ஓட்டுநர் அன்பரசு உங்கள் வேலையை கவனிப்பார்.",
        },
      ];
      const s = samples[Math.floor(Math.random() * samples.length)];
      pushNotification({
        ...s,
        id: `n-${Date.now()}`,
        farmerId: state.farmerId,
        at: new Date().toISOString(),
        read: false,
      });
      toast(tr("New update added", "புதிய தகவல் சேர்க்கப்பட்டது"));
    },
    generateRequest: () => {
      const eq = EQUIPMENT[Math.floor(Math.random() * EQUIPMENT.length)];
      createRequest({
        farmerName: farmer.name,
        mobile: farmer.mobile,
        village: farmer.village,
        equipmentId: eq.id,
        preferredDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        landSize: farmer.landSize,
      });
      toast.success(tr("Demo request created", "டெமோ கோரிக்கை உருவாக்கப்பட்டது"));
    },
    advanceRequest,
  };

  return <FarmFleetContext.Provider value={value}>{children}</FarmFleetContext.Provider>;
}

export function useFarmFleet() {
  const ctx = useContext(FarmFleetContext);
  if (!ctx) throw new Error("useFarmFleet must be used inside FarmFleetProvider");
  return ctx;
}