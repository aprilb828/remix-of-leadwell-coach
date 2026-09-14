const { getClient, json, parseBody, headers, EDITION } = require("./_supabase.cjs");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return json(405, { success: false, message: "Method not allowed" });

  const { code, deviceId } = parseBody(event);
  const normalized = String(code || "").trim().toUpperCase();
  const device = String(deviceId || "").trim();

  if (!normalized || !device) {
    return json(400, { success: false, message: "An access code and device ID are required." });
  }

  try {
    const supabase = getClient();

    const { data: accessCode, error: codeError } = await supabase
      .from("access_codes")
      .select("id, code, edition, max_activations, active")
      .eq("code", normalized)
      .eq("edition", EDITION)
      .maybeSingle();

    if (codeError) throw codeError;
    if (!accessCode) {
      return json(404, { success: false, message: "That access code was not found for the Coach Edition." });
    }
    if (accessCode.active === false) {
      return json(403, { success: false, message: "That access code is no longer active." });
    }

    const maxActivations = accessCode.max_activations || 3;

    // Already activated on this device?
    const { data: existing, error: existingError } = await supabase
      .from("activations")
      .select("id")
      .eq("code", normalized)
      .eq("device_id", device)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) {
      return json(200, { success: true, message: "This device is already activated.", code: normalized, maxActivations });
    }

    const { count, error: countError } = await supabase
      .from("activations")
      .select("id", { count: "exact", head: true })
      .eq("code", normalized);

    if (countError) throw countError;

    if ((count || 0) >= maxActivations) {
      return json(403, {
        success: false,
        limitReached: true,
        message: `This access code is already in use on ${maxActivations} devices. Deactivate one of those devices to free up a slot.`,
        maxActivations,
      });
    }

    // NOTE: the activations table has no edition column - never write one here.
    const { error: insertError } = await supabase
      .from("activations")
      .insert({ code: normalized, device_id: device });

    if (insertError) throw insertError;

    return json(200, {
      success: true,
      message: "This device is activated.",
      code: normalized,
      maxActivations,
      activations: (count || 0) + 1,
    });
  } catch (error) {
    console.error("activate error", error);
    return json(500, { success: false, message: "We couldn't verify that code right now. Please try again." });
  }
};
