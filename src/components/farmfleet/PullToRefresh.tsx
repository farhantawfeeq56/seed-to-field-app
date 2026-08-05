import { useRef, useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { useFarmFleet } from "@/lib/store";

export function PullToRefresh({ children }: { children: ReactNode }) {
  const { refresh, tr } = useFarmFleet();
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const [busy, setBusy] = useState(false);

  return (
    <div
      onTouchStart={(e) => {
        if (window.scrollY <= 0 && !busy) startY.current = e.touches[0]!.clientY;
      }}
      onTouchMove={(e) => {
        if (startY.current === null) return;
        const delta = e.touches[0]!.clientY - startY.current;
        if (delta > 0) setPull(Math.min(96, delta * 0.5));
      }}
      onTouchEnd={async () => {
        const shouldRefresh = pull > 56;
        startY.current = null;
        setPull(0);
        if (shouldRefresh) {
          setBusy(true);
          await refresh();
          setBusy(false);
        }
      }}
    >
      <div
        className="flex items-center justify-center overflow-hidden text-sm font-semibold text-primary-deep"
        style={{ height: busy ? 44 : pull, transition: startY.current ? "none" : "height 240ms ease" }}
      >
        <RefreshCw className={`mr-2 size-4 ${busy ? "animate-spin" : ""}`} />
        {busy
          ? tr("Updating…", "புதுப்பிக்கிறது…")
          : pull > 56
            ? tr("Release to update", "விடுங்கள், புதுப்பிக்கும்")
            : tr("Pull down to update", "கீழே இழுத்து புதுப்பிக்க")}
      </div>
      {children}
    </div>
  );
}