const { getClient, json, parseBody, headers, EDITION } = require("./_supabase.cjs");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return json(405, { activated: false, message: "Method not allowed" });

  const { deviceId, code } = parseBody(event);
  const device = String(deviceId || "").trim();
  const normalized = String(code || "").trim().toUpperCase();

  if (!device) return json(400, { activated: false, message: "A device ID is required." });

  try {
    const supabase = getClient();

    let query = supabase.from("activations").select("*").eq("device_id", device);
    if (normalized) query = query.eq("code", normalized);

    const { data: rows, error } = await query;
    if (error) throw error;
    if (!rows || rows.length === 0) return json(200, { activated: false });

    const codes = rows.map((r) => r.code);

    const { data: valid, error: codeError } = await supabase
      .from("access_codes")
      .select("*")
      .in("code", codes);

    if (codeError) throw codeError;

    const match = (valid || []).find(
      (c) =>
        c.active !== false &&
        (!("edition" in c) || !c.edition || String(c.edition).toLowerCase() === EDITION),
    );
    if (!match) return json(200, { activated: false });

    return json(200, {
      activated: true,
      code: match.code,
      maxActivations: Number(match.max_activations) > 0 ? Number(match.max_activations) : 3,
    });
  } catch (error) {
    console.error("register error", error);
    return json(500, { activated: false, message: "We couldn't check this device's activation right now." });
  }
};
