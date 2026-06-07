import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { NotesBlock } from "./NotesBlock";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CloudNotesBlock, CloudResetButton } from "@/components/CloudNotesBlock";
import { useDailyReflection } from "@/hooks/use-daily-reflection";

export function Dashboard() {
  const morning = useDailyReflection("morning");
  const eod = useDailyReflection("eod");
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">💬 Today's Encouragement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic">
            "Your calm builds trust. Your clarity builds capacity. One teacher at a time."
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Today, focus on the highest-leverage work: relationships, instruction, support, and follow-through.
            Not everything needs to be done today. What matters is that teachers feel supported and learning moves forward with purpose.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">🌅 Morning Coach Check-In</CardTitle>
          <CloudResetButton onReset={morning.reset} />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Auto-saves to your daily history. View past entries on the History tab.
          </p>
          <CloudNotesBlock fieldKey="encourage" value={morning.fields.encourage ?? ""} onChange={morning.setField} label="One teacher I will encourage today" />
          <CloudNotesBlock fieldKey="priority" value={morning.fields.priority ?? ""} onChange={morning.setField} label="One grade level or team I will prioritize today" />
          <CloudNotesBlock fieldKey="decision" value={morning.fields.decision ?? ""} onChange={morning.setField} label="One coaching move I will make to reduce friction" />
          <CloudNotesBlock fieldKey="letgo" value={morning.fields.letgo ?? ""} onChange={morning.setField} label="One thing I will let go of today" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">🎯 Top 3 Coaching Priorities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((n) => (<PriorityItem key={n} idx={n} />))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">📝 Coach Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <NotesBlock
            storageKey="cw.coach.notes"
            label="Quick notes you'll want later (conversations, decisions, commitments)"
            placeholder="Keep it brief and factual…"
            rows={5}
          />
        </CardContent>
      </Card>

      <HelpfulLinks />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">🌙 End-of-Day Reset</CardTitle>
          <CloudResetButton onReset={eod.reset} />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Auto-saves to your daily history. View past entries on the History tab.
          </p>
          <CloudNotesBlock fieldKey="wins" value={eod.fields.wins ?? ""} onChange={eod.setField} label="Capture today's wins (1–3 bullets)" rows={3} />
          <CloudNotesBlock fieldKey="followups" value={eod.fields.followups ?? ""} onChange={eod.setField} label="Note any teacher follow-ups needed" rows={2} />
          <CloudNotesBlock fieldKey="prep" value={eod.fields.prep ?? ""} onChange={eod.setField} label="Prep for tomorrow's first 30 minutes" rows={2} />
          <CloudNotesBlock fieldKey="inbox" value={eod.fields.inbox ?? ""} onChange={eod.setField} label="Clear inbox triage (delete / delegate / defer)" rows={2} />
        </CardContent>
      </Card>
    </div>
  );
}

function PriorityItem({ idx }: { idx: number }) {
  const [text, setText] = useLocalStorage(`cw.priority.${idx}.text`, "");
  const [done, setDone] = useLocalStorage(`cw.priority.${idx}.done`, false);
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setDone(!done)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
          done ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"
        }`}
        aria-label="Toggle priority"
      >
        {done && <Check className="h-3 w-3" />}
      </button>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Priority ${idx}`}
        className={done ? "line-through opacity-60" : ""}
      />
    </div>
  );
}

function HelpfulLinks() {
  const labels = [
    "Coaching calendar / cycle tracker",
    "Curriculum maps / pacing guides",
    "Look-fors / walkthrough tools",
    "PLC agendas / notes",
    "Intervention / MTSS systems",
  ];
  const [urls, setUrls] = useLocalStorage<Record<string, string>>("cw.helpful.links", {});
  const [saved, setSaved] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">🔗 Helpful Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {labels.map((l) => (
          <div key={l} className="grid grid-cols-1 gap-1 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-3">
            <span className="text-sm font-medium">{l}</span>
            {urls[l] ? (
              <a href={urls[l]} target="_blank" rel="noreferrer" className="truncate text-sm text-primary underline">
                {urls[l]}
              </a>
            ) : (
              <Input
                placeholder="https://…"
                value={urls[l] ?? ""}
                onChange={(e) => setUrls({ ...urls, [l]: e.target.value })}
              />
            )}
            {urls[l] && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-self-start text-xs"
                onClick={() => {
                  const next = { ...urls };
                  delete next[l];
                  setUrls(next);
                }}
              >
                Edit
              </Button>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }}>
            Save links
          </Button>
          {saved && <span className="text-sm text-emerald-600">✓ Links saved!</span>}
        </div>
      </CardContent>
    </Card>
  );
}
