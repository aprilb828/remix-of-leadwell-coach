const { getClient, json, parseBody, headers, EDITION } = require("./_supabase.cjs");

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSuffix() {
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

function newCode() {
  return `CE-COAC-${randomSuffix()}`;
}

// Pull the offending column name out of a Postgres 42703 message.
function missingColumn(error) {
  const text = `${error?.message || ""} ${error?.details || ""}`;
  const match = text.match(/column "?([a-z_]+)"? of relation|column ([a-z_.]+) does not exist/i);
  const raw = match ? match[1] || match[2] : null;
  return raw ? raw.split(".").pop() : null;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return json(405, { success: false, message: "Method not allowed" });

  const { maxActivations, email, note } = parseBody(event);
  const limit = Number(maxActivations) > 0 ? Number(maxActivations) : 3;

  try {
    const supabase = getClient();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = newCode();

      const row = { code, edition: EDITION, max_activations: limit, active: true };
      if (email) row.email = email;
      if (note) row.note = note;

      // Retry without any column the shared table doesn't actually have.
      let error = null;
      for (let tries = 0; tries < 5; tries += 1) {
        const result = await supabase.from("access_codes").insert(row);
        error = result.error;
        if (!error || error.code !== "42703") break;
        const column = missingColumn(error);
        if (!column || column === "code" || !(column in row)) break;
        delete row[column];
      }

      if (!error) {
        return json(200, { success: true, code, edition: EDITION, maxActivations: limit });
      }
      // 23505 = unique violation; retry with a fresh code.
      if (error.code !== "23505") throw error;
    }

    return json(500, { success: false, message: "Could not generate a unique code. Please try again." });
  } catch (error) {
    console.error("issue-code error", error);
    return json(500, { success: false, message: "We couldn't issue a code right now. Please try again." });
  }
};
