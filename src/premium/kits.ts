export type PremiumKit = {
  id: string;
  month: string;
  title: string;
  theme: string;
  description: string;
  file: string;
};

// Use YYYY-MM IDs so the newest month sorts first, regardless of list order.
export const kits: PremiumKit[] = [
  {
    id: "2026-11",
    month: "November 2026",
    title: "Notice & Nurture",
    theme: "Notice & Nurture",
    description: "Mid-cycle check-ins, data conversations, and new teacher support.",
    file: "/kits/2026-11-coach-notice-and-nurture.html",
  },
];

export function newestKitsFirst(list: PremiumKit[]): PremiumKit[] {
  return [...list].sort((a, b) => b.id.localeCompare(a.id));
}