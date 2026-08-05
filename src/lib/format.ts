export const fmtDate = (iso: string, lang: "en" | "ta" = "en") => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(lang === "ta" ? "ta-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const fmtDateTime = (iso: string, lang: "en" | "ta" = "en") => {
  if (!iso) return "";
  return new Date(iso).toLocaleString(lang === "ta" ? "ta-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const timeAgo = (iso: string, lang: "en" | "ta" = "en") => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  const ta = lang === "ta";
  if (mins < 1) return ta ? "இப்போது" : "just now";
  if (mins < 60) return ta ? `${mins} நிமிடம் முன்` : `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return ta ? `${hrs} மணி முன்` : `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return ta ? `${days} நாள் முன்` : `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.round(days / 30);
  return ta ? `${months} மாதம் முன்` : `${months} month${months > 1 ? "s" : ""} ago`;
};