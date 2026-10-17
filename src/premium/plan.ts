export const PLAN_STORAGE_KEY = "companion-coach-access-plan";

export function normalizePlan(plan: unknown): string | null {
  return typeof plan === "string" && plan.length > 0 ? plan : null;
}

export function isPremiumPlan(plan: unknown): boolean {
  return plan === "premium-monthly" || plan === "premium-yearly" || plan === "premium-comp";
}