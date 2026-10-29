export const PLAN_STORAGE_KEY = "companion-coach-access-plan";
export const INACTIVE_ACCESS_MESSAGE = "Your access has ended. If you think this is a mistake, please contact support@companioneducation.com.";

export function isInactivePlan(plan: unknown): boolean {
  return plan === "inactive";
}

export function normalizePlan(plan: unknown): string | null {
  return typeof plan === "string" && plan.length > 0 ? plan : null;
}

export function isPremiumPlan(plan: unknown): boolean {
  return plan === "premium" || plan === "premium-monthly" || plan === "premium-yearly" || plan === "premium-comp";
}