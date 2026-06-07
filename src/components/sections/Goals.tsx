import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mic, Square, Loader2, Plus, Trash2, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/integrations/supabase/client";
import { VoiceRecorder, isVoiceRecordingSupported } from "@/lib/voice-recorder";
import { transcribeAudio } from "@/lib/voice.functions";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  status: "active" | "paused" | "done";
  target_date: string | null;
  created_at: string;
  updated_at: string;
};

type Update = {
  id: string;
  goal_id: string;
  update_type: "progress" | "action" | "milestone" | "blocker" | "note";
  summary: string;
  details: string | null;
  transcript: string | null;
  created_at: string;
};

const UPDATE_TYPES: { value: Update["update_type"]; label: string }[] = [
  { value: "action", label: "Action taken" },
  { value: "progress", label: "Progress" },
  { value: "milestone", label: "Milestone" },
  { value: "blocker", label: "Blocker" },
  { value: "note", label: "Note" },
];

export function Goals() {
  const qc = useQueryClient();
  const [showNew, setShowNew] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const goalsQuery = useQuery({
    queryKey: ["long_term_goals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("long_term_goals")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Goal[];
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("long_term_goals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["long_term_goals"] }),
  });

  const updateStatus = useMutation({
    mutationFn: async (args: { id: string; status: Goal["status"] }) => {
      const { error } = await supabase
        .from("long_term_goals")
        .update({ status: args.status })
        .eq("id", args.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["long_term_goals"] }),
  });

  return (
    <div className="space-y-6">
      <VoiceGoalUpdate goals={goalsQuery.data ?? []} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">🏔️ Long-Term Coaching Goals</CardTitle>
          <Button size="sm" onClick={() => setShowNew((s) => !s)}>
            <Plus className="mr-1 h-4 w-4" /> New goal
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showNew && <NewGoalForm onDone={() => setShowNew(false)} />}
          {goalsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {goalsQuery.data && goalsQuery.data.length === 0 && !showNew && (
            <p className="text-sm text-muted-foreground">No goals yet. Tap "New goal" to start.</p>
          )}
          <ul className="space-y-3">
            {goalsQuery.data?.map((g) => (
              <li key={g.id} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{g.title}</h3>
                      <Badge variant={g.status === "done" ? "default" : "secondary"} className="capitalize">
                        {g.status}
                      </Badge>
                      {g.target_date && <Badge variant="outline">Target: {g.target_date}</Badge>}
                    </div>
                    {g.description && <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <Select value={g.status} onValueChange={(v) => updateStatus.mutate({ id: g.id, status: v as Goal["status"] })}>
                      <SelectTrigger className="h-8 w-[110px] text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost" size="icon"
                      onClick={() => { if (window.confirm("Delete this goal and its log?")) deleteGoal.mutate(g.id); }}
                      aria-label="Delete goal"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost" size="sm" className="mt-2 px-1 text-xs"
                  onClick={() => setExpanded(expanded === g.id ? null : g.id)}
                >
                  {expanded === g.id ? <ChevronUp className="mr-1 h-3 w-3" /> : <ChevronDown className="mr-1 h-3 w-3" />}
                  Action & progress log
                </Button>
                {expanded === g.id && <GoalLog goalId={g.id} />}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function NewGoalForm({ onDone }: { onDone: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const create = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error("Title is required");
      const { error } = await supabase.from("long_term_goals").insert({
        title: title.trim(),
        description: description.trim() || null,
        target_date: target || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Goal added");
      qc.invalidateQueries({ queryKey: ["long_term_goals"] });
      onDone();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Couldn't add goal"),
  });

  return (
    <div className="rounded-md border border-primary/40 bg-primary/5 p-3">
      <div className="space-y-2">
        <div className="space-y-1">
          <Label>Goal title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Strengthen K-2 small-group reading instruction" />
        </div>
        <div className="space-y-1">
          <Label>Description (optional)</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Why this matters, success criteria…" />
        </div>
        <div className="space-y-1">
          <Label>Target date (optional)</Label>
          <Input type="date" value={target} onChange={(e) => setTarget(e.target.value)} />
        </div>
        <div className="flex gap-2 pt-1">
          <Button onClick={() => create.mutate()} disabled={create.isPending}>
            {create.isPending && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Save goal
          </Button>
          <Button variant="outline" onClick={onDone}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function GoalLog({ goalId }: { goalId: string }) {
  const qc = useQueryClient();
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState<Update["update_type"]>("action");

  const updatesQuery = useQuery({
    queryKey: ["goal_updates", goalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("goal_updates").select("*").eq("goal_id", goalId).order("created_at", { ascending: false });
      if (error) throw error;
      return data as Update[];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      if (!summary.trim()) throw new Error("Add a short summary");
      const { error } = await supabase.from("goal_updates").insert({
        goal_id: goalId, update_type: type, summary: summary.trim(), details: details.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSummary(""); setDetails("");
      qc.invalidateQueries({ queryKey: ["goal_updates", goalId] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Couldn't add update"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("goal_updates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goal_updates", goalId] }),
  });

  return (
    <div className="mt-3 space-y-3 border-t border-border pt-3">
      <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
        <Select value={type} onValueChange={(v) => setType(v as Update["update_type"])}>
          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {UPDATE_TYPES.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
          </SelectContent>
        </Select>
        <Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short summary" />
      </div>
      <Textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={2} placeholder="Details (optional)" />
      <Button size="sm" onClick={() => add.mutate()} disabled={add.isPending}>
        {add.isPending && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
        Add to log
      </Button>

      <ul className="space-y-2">
        {updatesQuery.data?.length === 0 && (
          <li className="text-xs text-muted-foreground">No log entries yet.</li>
        )}
        {updatesQuery.data?.map((u) => (
          <li key={u.id} className="rounded-md border border-border bg-muted/40 p-2 text-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="capitalize">{u.update_type}</Badge>
                <span className="font-medium">{u.summary}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => del.mutate(u.id)} aria-label="Delete log entry">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            {u.details && <p className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap">{u.details}</p>}
            {u.transcript && <p className="mt-1 text-[11px] italic text-muted-foreground">"{u.transcript}"</p>}
            <p className="mt-1 text-[11px] text-muted-foreground">{new Date(u.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VoiceGoalUpdate({ goals }: { goals: Goal[] }) {
  const qc = useQueryClient();
  const recorderRef = useRef<VoiceRecorder | null>(null);
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<"idle" | "recording" | "processing" | "preview">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [goalId, setGoalId] = useState<string>("");
  const [type, setType] = useState<Update["update_type"]>("action");
  const transcribeFn = useServerFn(transcribeAudio);

  useEffect(() => setSupported(isVoiceRecordingSupported()), []);
  useEffect(() => {
    if (state !== "recording") return;
    const start = Date.now();
    const id = window.setInterval(() => setElapsed(Date.now() - start), 200);
    return () => window.clearInterval(id);
  }, [state]);

  const activeGoals = goals.filter((g) => g.status !== "done");

  async function handleStart() {
    try {
      recorderRef.current = new VoiceRecorder();
      await recorderRef.current.start();
      setState("recording");
      setElapsed(0);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Microphone denied");
    }
  }

  async function handleStop() {
    if (!recorderRef.current) return;
    setState("processing");
    try {
      const result = await recorderRef.current.stop();
      recorderRef.current = null;
      const out = await transcribeFn({ data: { audioBase64: result.base64, mimeType: result.mimeType } });
      setTranscript(out.transcript);
      if (!goalId && activeGoals.length > 0) setGoalId(activeGoals[0].id);
      setState("preview");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Recording failed");
      setState("idle");
    }
  }

  const save = useMutation({
    mutationFn: async () => {
      if (!goalId) throw new Error("Pick a goal to attach this update to");
      if (!transcript.trim()) throw new Error("Transcript is empty");
      const summary = transcript.length > 90 ? transcript.slice(0, 90).trim() + "…" : transcript;
      const { error } = await supabase.from("goal_updates").insert({
        goal_id: goalId, update_type: type, summary, details: transcript, transcript,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Voice update logged");
      setTranscript("");
      setState("idle");
      qc.invalidateQueries({ queryKey: ["goal_updates", goalId] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const seconds = Math.floor(elapsed / 1000);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">🎙️ Voice update for a goal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!supported && <p className="text-xs text-destructive">Audio recording is not supported in this browser.</p>}
        {activeGoals.length === 0 && (
          <p className="text-sm text-muted-foreground">Add an active goal below before recording a voice update.</p>
        )}

        <div className="flex flex-col items-center gap-2 py-2">
          {state === "idle" && (
            <Button size="lg" className="h-16 w-16 rounded-full" onClick={handleStart} disabled={!supported || activeGoals.length === 0}>
              <Mic className="!h-7 !w-7" />
            </Button>
          )}
          {state === "recording" && (
            <Button size="lg" variant="destructive" className="h-16 w-16 rounded-full animate-pulse" onClick={handleStop}>
              <Square className="!h-6 !w-6" />
            </Button>
          )}
          {state === "processing" && (
            <Button size="lg" variant="secondary" disabled className="h-16 w-16 rounded-full">
              <Loader2 className="!h-7 !w-7 animate-spin" />
            </Button>
          )}
          {state === "preview" && (
            <Button size="lg" variant="outline" className="h-16 w-16 rounded-full" onClick={() => { setTranscript(""); setState("idle"); }}>
              <RotateCcw className="!h-6 !w-6" />
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            {state === "idle" && "Tap to record an update"}
            {state === "recording" && `Recording… ${seconds}s — tap to stop`}
            {state === "processing" && "Transcribing…"}
            {state === "preview" && "Review and attach to a goal"}
          </p>
        </div>

        {state === "preview" && (
          <div className="space-y-3 rounded-md border border-primary/40 bg-primary/5 p-3">
            <div className="rounded-md bg-background p-3 text-sm">{transcript}</div>
            <Textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={3} placeholder="Edit transcript if needed" />
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Goal</Label>
                <Select value={goalId} onValueChange={setGoalId}>
                  <SelectTrigger><SelectValue placeholder="Pick a goal" /></SelectTrigger>
                  <SelectContent>
                    {activeGoals.map((g) => (<SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Update type</Label>
                <Select value={type} onValueChange={(v) => setType(v as Update["update_type"])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UPDATE_TYPES.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              {save.isPending && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Save to goal log
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
