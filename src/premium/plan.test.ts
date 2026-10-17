import { describe, expect, test } from "bun:test";
import { isPremiumPlan, normalizePlan } from "./plan";
import { kits, newestKitsFirst } from "./kits";

describe("Premium eligibility", () => {
  test("premium-monthly includes kits", () => expect(isPremiumPlan("premium-monthly")).toBe(true));
  test("premium-yearly includes kits", () => expect(isPremiumPlan("premium-yearly")).toBe(true));
  test("premium-comp includes kits", () => expect(isPremiumPlan("premium-comp")).toBe(true));
  test("one-time excludes kits", () => expect(isPremiumPlan("one-time")).toBe(false));
  test("no plan excludes kits", () => expect(isPremiumPlan(null)).toBe(false));
  test("missing plan is cached as no plan", () => expect(normalizePlan(undefined)).toBeNull());
  test("newest monthly kit comes first", () => {
    const november = kits[0];
    if (!november) throw new Error("November kit missing");
    expect(newestKitsFirst([{ ...november, id: "2026-10" }, november])[0]?.id).toBe("2026-11");
  });
});