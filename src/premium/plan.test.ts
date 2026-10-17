import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isPremiumPlan, normalizePlan } from "./plan";
import { kits, newestKitsFirst } from "./kits";

describe("Premium eligibility", () => {
  test("premium-monthly includes kits", () => assert.equal(isPremiumPlan("premium-monthly"), true));
  test("premium-yearly includes kits", () => assert.equal(isPremiumPlan("premium-yearly"), true));
  test("premium-comp includes kits", () => assert.equal(isPremiumPlan("premium-comp"), true));
  test("one-time excludes kits", () => assert.equal(isPremiumPlan("one-time"), false));
  test("no plan excludes kits", () => assert.equal(isPremiumPlan(null), false));
  test("missing plan is cached as no plan", () => assert.equal(normalizePlan(undefined), null));
  test("newest monthly kit comes first", () => {
    const november = kits[0];
    if (!november) throw new Error("November kit missing");
    assert.equal(newestKitsFirst([{ ...november, id: "2026-10" }, november])[0]?.id, "2026-11");
  });
});