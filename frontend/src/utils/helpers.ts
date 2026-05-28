const COLORS = ["#3b82f6", "#14b8a6", "#8b5cf6", "#ec4899", "#10b981", "#f97316", "#6366f1"];
const DISPLAY_OFFSET_HOURS = 3;

const toDisplayDate = (iso: string) => {
  const date = new Date(iso);
  return new Date(date.getTime() + DISPLAY_OFFSET_HOURS * 60 * 60 * 1000);
};

export const avatarColor = (name: string) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return COLORS[Math.abs(h) % COLORS.length];
};

export const initials = (name: string) =>
  name.trim().split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

export const fmtTime = (iso: string) =>
  toDisplayDate(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export const fmtDay = (iso: string) =>
  toDisplayDate(iso).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

export const sameDay = (a: string, b: string) =>
  toDisplayDate(a).toLocaleDateString("pt-BR") === toDisplayDate(b).toLocaleDateString("pt-BR");
