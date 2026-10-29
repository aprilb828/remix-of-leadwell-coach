const { test } = require("node:test");
const assert = require("node:assert/strict");

const helperPath = require.resolve("../netlify/functions/_supabase.cjs");
let accessCode;
let existing;
let count;
let insertion;
let failed;
require.cache[helperPath] = {
  id: helperPath, filename: helperPath, loaded: true,
  exports: {
    EDITION: "coach", headers: {},
    parseBody: (event) => JSON.parse(event.body),
    json: (statusCode, body) => ({ statusCode, body: JSON.stringify(body) }),
    getClient: () => ({
      from: (table) => {
        let head = false;
        const query = {
          select: (_, options) => { head = Boolean(options?.head); return query; },
          eq: () => query,
          in: () => query,
          maybeSingle: async () => ({ data: table === "access_codes" ? accessCode : existing, error: null }),
          insert: async (row) => { insertion = row; return { error: null }; },
          then: (resolve, reject) => Promise.resolve({
            data: table === "access_codes" ? [accessCode] : existing ? [existing] : [],
            count: head ? count : null,
            error: failed ? new Error("offline") : null,
          }).then(resolve, reject),
        };
        return query;
      },
    }),
  },
};
const activate = require("../netlify/functions/activate.cjs").handler;
const register = require("../netlify/functions/register.cjs").handler;
const event = { httpMethod: "POST", body: JSON.stringify({ code: "CE-COAC-ABC123", deviceId: "this-device" }) };
function reset(plan) {
  accessCode = { code: "CE-COAC-ABC123", edition: "coach", max_activations: 3, plan };
  existing = null; count = 0; insertion = null; failed = false;
}

test("successful activation returns current plan without writing edition to activations", async () => {
  reset("premium-monthly");
  const result = await activate(event);
  assert.equal(JSON.parse(result.body).plan, "premium-monthly");
  assert.deepEqual(insertion, { code: "CE-COAC-ABC123", device_id: "this-device" });
});
test("already activated device returns plan without consuming another slot", async () => {
  reset("premium-comp"); existing = { code: accessCode.code }; count = 3;
  const body = JSON.parse((await activate(event)).body);
  assert.equal(body.success, true); assert.equal(body.plan, "premium-comp"); assert.equal(insertion, null);
});
test("three-device limit continues to reject a fourth device", async () => {
  reset("premium-yearly"); count = 3;
  const result = await activate(event);
  assert.equal(result.statusCode, 403); assert.equal(JSON.parse(result.body).limitReached, true); assert.equal(insertion, null);
});
test("register checks saved code and device and returns the updated plan", async () => {
  reset("one-time"); existing = { code: accessCode.code };
  const body = JSON.parse((await register(event)).body);
  assert.equal(body.activated, true); assert.equal(body.plan, "one-time");
});
test("register reports revoked device activation", async () => {
  reset("premium-monthly");
  assert.equal(JSON.parse((await register(event)).body).activated, false);
});
test("service failure is an error response rather than a verified revocation", async () => {
  reset("premium-monthly"); failed = true;
  assert.equal((await register(event)).statusCode, 500);
});
test("premium activates the app and returns premium content eligibility", async () => {
  reset("premium");
  const body = JSON.parse((await activate(event)).body);
  assert.equal(body.success, true);
  assert.equal(body.plan, "premium");
});
test("one-time activates the basic app", async () => {
  reset("one-time");
  const body = JSON.parse((await activate(event)).body);
  assert.equal(body.success, true);
  assert.equal(body.plan, "one-time");
});
test("inactive rejects activation without consuming a device slot", async () => {
  reset("inactive");
  const result = await activate(event);
  assert.equal(result.statusCode, 403);
  assert.equal(JSON.parse(result.body).success, false);
  assert.equal(JSON.parse(result.body).plan, "inactive");
  assert.equal(insertion, null);
});
test("inactive rejects an already activated device", async () => {
  reset("inactive"); existing = { code: accessCode.code };
  assert.equal((await activate(event)).statusCode, 403);
  assert.equal(insertion, null);
});
test("register blocks the next visit after premium becomes inactive", async () => {
  reset("premium"); existing = { code: accessCode.code };
  assert.equal(JSON.parse((await register(event)).body).activated, true);
  accessCode.plan = "inactive";
  const body = JSON.parse((await register(event)).body);
  assert.equal(body.activated, false);
  assert.equal(body.plan, "inactive");
});
test("register restores access after inactive changes back to premium", async () => {
  reset("inactive"); existing = { code: accessCode.code };
  assert.equal(JSON.parse((await register(event)).body).activated, false);
  accessCode.plan = "premium";
  assert.equal(JSON.parse((await register(event)).body).activated, true);
});