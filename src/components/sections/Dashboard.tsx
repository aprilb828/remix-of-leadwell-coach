import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, CalendarIcon, X, Mic, BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CloudNotesBlock, CloudResetButton } from "@/components/CloudNotesBlock";
import { useDailyReflection } from "@/hooks/use-daily-reflection";

export function Dashboard({ onOpenLog }: { onOpenLog: () => void }) {
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

      <CalendarCard />

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
          <CardTitle className="text-base">🎙️ Speak on Command</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Capture conversations, decisions, and commitments by voice. Your words are parsed and
            pre-filled into the Teacher &amp; Team Log.
          </p>
          <Button onClick={onOpenLog} className="gap-2">
            <Mic className="h-4 w-4" />
            Open Teacher &amp; Team Log
          </Button>
        </CardContent>
      </Card>

      <DailyReviewReminder onOpenLog={onOpenLog} />

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

function CalendarCard() {
  const [hidden, setHidden] = useLocalStorage("cw.calendar-card.hidden", false);
  if (hidden) return null;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <CalendarIcon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold">Access your calendar</h3>
          <p className="text-xs text-muted-foreground">
            Follow ups download as a calendar file you can open in Google or Outlook.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1 text-xs"
            asChild
          >
            <a href="https://calendar.google.com" target="_blank" rel="noreferrer">
              <CalendarIcon className="h-3.5 w-3.5" />
              Open Google Calendar
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-xs"
            asChild
          >
            <a href="https://outlook.live.com/calendar" target="_blank" rel="noreferrer">
              <CalendarIcon className="h-3.5 w-3.5" />
              Open Outlook Calendar
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setHidden(true)}
            aria-label="Dismiss calendar card"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex sm:hidden flex-col items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setHidden(true)}
            aria-label="Dismiss calendar card"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1 text-xs"
            asChild
          >
            <a href="https://calendar.google.com" target="_blank" rel="noreferrer">
              <CalendarIcon className="h-3.5 w-3.5" />
              Google
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-xs"
            asChild
          >
            <a href="https://outlook.live.com/calendar" target="_blank" rel="noreferrer">
              <CalendarIcon className="h-3.5 w-3.5" />
              Outlook
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
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
