import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { google } from "@ai-sdk/google";

const LOG_TYPES = ["teacher", "team", "operations", "walkthrough"] as const;
const AREAS = [
  "coaching",
  "instruction",
  "planning",
  "curriculum",
  "social_emotional",
  "operations",
  "recognition",
  "other",
] as const;

const ParsedEntrySchema = z.object({
  log_type: z.enum(LOG_TYPES),
  name: z.string().nullable(),
  area: z.enum(AREAS).nullable(),
  details: z.string(),
  action_taken: z.string().nullable(),
  follow_up_needed: z.boolean(),
  follow_up_date: z.string().nullable(),
  notes: z.string().nullable(),
});

type ParsedEntry = z.infer<typeof ParsedEntrySchema>;

const SYSTEM_PROMPT = `You are an assistant for an instructional coach logging quick voice notes during a busy day.
The user is dictating a single log entry. Transcribe and extract structured fields.

Rules:
- log_type: "teacher" for individual teacher notes, "team" for grade-level/PLC notes, "operations" for scheduling/logistics, "walkthrough" for classroom observation/coaching cycle notes.
- area: pick the closest category. Use "other" if unclear.
- follow_up_needed: true if the user said follow-up, check back, tomorrow, next week, a date, etc.
- follow_up_date: only set if user explicitly stated a date. Otherwise null.
- details: 1-2 sentence summary, not the full transcript.
- Never invent names or facts not in the audio.`;

function extractJsonObject(text: string): unknown | null {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();
  const candidate = fenced ?? trimmed;
  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

function coerceEntry(value: unknown, transcript: string): ParsedEntry {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const logType = LOG_TYPES.includes(source.log_type as (typeof LOG_TYPES)[number])
    ? (source.log_type as ParsedEntry["log_type"])
    : "teacher";
  const area = AREAS.includes(source.area as (typeof AREAS)[number])
    ? (source.area as ParsedEntry["area"])
    : "other";

  const candidate: ParsedEntry = {
    log_type: logType,
    name: typeof source.name === "string" && source.name.trim() ? source.name.trim() : null,
    area,
    details:
      typeof source.details === "string" && source.details.trim()
        ? source.details.trim()
        : transcript.trim() || "Voice note recorded.",
    action_taken:
      typeof source.action_taken === "string" && source.action_taken.trim()
        ? source.action_taken.trim()
        : null,
    follow_up_needed: source.follow_up_needed === true,
    follow_up_date:
      typeof source.follow_up_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(source.follow_up_date)
        ? source.follow_up_date
        : null,
    notes: typeof source.notes === "string" && source.notes.trim() ? source.notes.trim() : null,
  };

  return ParsedEntrySchema.parse(candidate);
}

export const transcribeAudio = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        audioBase64: z.string().min(10),
        mimeType: z.string().min(3).max(64),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const model = google("gemini-2.5-flash");

    const transcriptResult = await generateText({
      model,
      temperature: 0,
      system:
        "You transcribe instructional coach voice notes. Return only the spoken words as plain text.",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Transcribe this audio note." },
            { type: "file", mediaType: data.mimeType, data: data.audioBase64 },
          ],
        },
      ],
    });

    return { transcript: transcriptResult.text.trim() };
  });

export const parseTranscript = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ transcript: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    const model = google("gemini-2.5-flash");

    const today = new Date().toISOString().slice(0, 10);

    const structuredResult = await generateText({
      model,
      temperature: 0,
      system: `${SYSTEM_PROMPT}\nReturn only valid JSON. Do not use markdown.`,
      prompt: `Today's date is ${today}. Extract one log entry from this transcript.\n\nTranscript:\n${data.transcript}\n\nReturn JSON with exactly these keys: log_type, name, area, details, action_taken, follow_up_needed, follow_up_date, notes. Allowed log_type values: ${LOG_TYPES.join(
        ", ",
      )}. Allowed area values: ${AREAS.join(", ")}. Use null for unknown optional strings.`,
    });

    const entry = coerceEntry(extractJsonObject(structuredResult.text), data.transcript);

    return { entry };
  });
