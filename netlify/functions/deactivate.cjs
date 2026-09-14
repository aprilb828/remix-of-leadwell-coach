const { getClient, json, parseBody, headers } = require("./_supabase.cjs");

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

    const { error } = await supabase
      .from("activations")
      .delete()
      .eq("code", normalized)
      .eq("device_id", device);

    if (error) throw error;

    return json(200, { success: true, message: "This device has been deactivated and a slot is now free." });
  } catch (error) {
    console.error("deactivate error", error);
    return json(500, { success: false, message: "We couldn't deactivate this device right now. Please try again." });
  }
};
