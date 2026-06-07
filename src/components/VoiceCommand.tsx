import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mic, Square, Loader2, Trash2, Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { supabase } from "@/integrations/supabase/client";
import {
  VoiceRecorder,
  isVoiceRecordingSupported,
  type RecorderState,
} from "@/lib/voice-recorder";
import { transcribeAudio, parseTranscript } from "@/lib/voice.functions";

const LOG_TYPES = [
  { value: "teacher", label: "Teacher" },
  { value: "team", label: "Team / PLC" },
  { value: "operations", label: "Operations" },
  { value: "walkthrough", label: "Walkthrough" },
];

const AREAS = [
  { value: "coaching", label: "Coaching" },
  { value: "instruction", label: "Instruction" },
  { value: "planning", label: "Planning" },
  { value: "curriculum", label: "Curriculum" },
  { value: "social_emotional", label: "Social/Emotional" },
  { value: "operations", label: "Operations" },
  { value: "recognition", label: "Recognition" },
  { value: "other", label: "Other" },
];

type Entry = {
  id: string;
  log_type: string;
  name: string | null;
  area: string | null;
  details: string | null;
  action_taken: string | null;
  follow_up_needed: boolean;
  follow_up_date: string | null;
  notes: string | null;
  transcript: string | null;
  created_at: string;
};

type Draft = Omit<Entry, "id" | "created_at">;

type UiPhase = "idle" | "recording" | "transcribing" | "preview" | "parsing" | "review";

export function VoiceCommand() {
  const recorderRef = useRef<VoiceRecorder | null>(null);
  const [state, setState] = useState<RecorderState>("idle");
  const [phase, setPhase] = useState<UiPhase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [previewTranscript, setPreviewTranscript] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [supported, setSupported] = useState(true);

  const transcribeFn = useServerFn(transcribeAudio);
  const parseFn = useServerFn(parseTranscript);
  const qc = useQueryClient();

  useEffect(() => {
    setSupported(isVoiceRecordingSupported());
  }, []);

  useEffect(() => {
    if (state !== "recording") return;
    const start = Date.now();
    const id = window.setInterval(() => setElapsed(Date.now() - start), 200);
    return () => window.clearInterval(id);
  }, [state]);

  const entriesQuery = useQuery({
    queryKey: ["voice_entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("voice_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as Entry[];
    },
  });

  const transcribeMutation = useMutation({
    mutationFn: async (audio: { base64: string; mimeType: string }) =>
      await transcribeFn({ data: { audioBase64: audio.base64, mimeType: audio.mimeType } }),
    onSuccess: (result) => {
      setPreviewTranscript(result.transcript);
      setPhase("preview");
      setState("idle");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Couldn't transcribe");
      setPhase("idle");
      setState("idle");
    },
  });

  const parseMutation = useMutation({
    mutationFn: async (text: string) => await parseFn({ data: { transcript: text } }),
    onSuccess: (result) => {
      setDraft({
        log_type: result.entry.log_type,
        name: result.entry.name ?? "",
        area: result.entry.area ?? "other",
        details: result.entry.details ?? "",
        action_taken: result.entry.action_taken ?? "",
        follow_up_needed: result.entry.follow_up_needed,
        follow_up_date: result.entry.follow_up_date,
        notes: result.entry.notes ?? "",
        transcript: previewTranscript,
      });
      setPhase("review");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Couldn't parse transcript");
      setPhase("preview");
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (d: Draft) => {
      const { error } = await supabase.from("voice_entries").insert({
        log_type: d.log_type,
        name: d.name || null,
        area: d.area || null,
        details: d.details || null,
        action_taken: d.action_taken || null,
        follow_up_needed: d.follow_up_needed,
        follow_up_date: d.follow_up_date || null,
        notes: d.notes || null,
        transcript: d.transcript || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Entry saved");
      setDraft(null);
      setPreviewTranscript("");
      setPhase("idle");
      qc.invalidateQueries({ queryKey: ["voice_entries"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Couldn't save");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("voice_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["voice_entries"] }),
  });

  async function handleStart() {
    try {
      recorderRef.current = new VoiceRecorder();
      await recorderRef.current.start();
      setState("recording");
      setElapsed(0);
      setPhase("recording");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Microphone denied");
      setState("idle");
      setPhase("idle");
    }
  }

  async function handleStop() {
    if (!recorderRef.current) return;
    setState("processing");
    setPhase("transcribing");
    try {
      const result = await recorderRef.current.stop();
      recorderRef.current = null;
      transcribeMutation.mutate({ base64: result.base64, mimeType: result.mimeType });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Recording failed");
      setState("idle");
      setPhase("idle");
    }
  }

  function handleCancelDraft() {
    setDraft(null);
    setPreviewTranscript("");
    setPhase("idle");
  }

  function handleReRecord() {
    setPreviewTranscript("");
    setPhase("idle");
  }

  function handleConfirmParse() {
    setPhase("parsing");
    parseMutation.mutate(previewTranscript);
  }

  const seconds = Math.floor(elapsed / 1000);

  return (
    <div className="space-y-6">
      {!supported && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="py-4 text-sm text-destructive">
            Your browser doesn't support audio recording. Use Safari 14.3+ on iOS or a recent Chrome/Edge.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Speak a Command</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-4">
            {phase === "idle" && (
              <Button size="lg" className="h-20 w-20 rounded-full" onClick={handleStart} disabled={!supported}>
                <Mic className="!h-8 !w-8" />
              </Button>
            )}
            {phase === "recording" && (
              <Button size="lg" variant="destructive" className="h-20 w-20 rounded-full animate-pulse" onClick={handleStop}>
                <Square className="!h-7 !w-7" />
              </Button>
            )}
            {(phase === "transcribing" || phase === "parsing") && (
              <Button size="lg" variant="secondary" className="h-20 w-20 rounded-full" disabled>
                <Loader2 className="!h-8 !w-8 animate-spin" />
              </Button>
            )}
            {(phase === "preview" || phase === "review") && (
              <Button size="lg" variant="outline" className="h-20 w-20 rounded-full" onClick={handleReRecord}>
                <RotateCcw className="!h-7 !w-7" />
              </Button>
            )}
            <p className="text-sm text-muted-foreground">
              {phase === "idle" && "Tap to record"}
              {phase === "recording" && `Recording… ${seconds}s — tap to stop`}
              {phase === "transcribing" && "Transcribing…"}
              {phase === "preview" && "Review transcript below"}
              {phase === "parsing" && "Parsing into fields…"}
              {phase === "review" && "Review and save the entry"}
            </p>
          </div>

          <details className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-medium">Try saying…</summary>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>"Add a teacher log for Ms. Johnson — coaching cycle on small-group instruction, follow-up next Tuesday."</li>
              <li>"Log a team note for 3rd grade PLC — planning support needed for the next unit launch."</li>
              <li>"Walkthrough note for Mr. Lee — strong student discourse during math, recognize tomorrow."</li>
            </ul>
          </details>
        </CardContent>
      </Card>

      {phase === "preview" && previewTranscript && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-base">Transcript preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted/50 p-4 text-sm leading-relaxed">{previewTranscript}</div>
            <div className="flex gap-2">
              <Button onClick={handleConfirmParse} disabled={parseMutation.isPending} className="flex-1">
                {parseMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                Parse into fields
              </Button>
              <Button variant="outline" onClick={handleReRecord}>
                <RotateCcw className="mr-2 h-4 w-4" /> Re-record
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {phase === "review" && draft && (
        <DraftCard
          draft={draft}
          setDraft={setDraft}
          onSave={() => saveMutation.mutate(draft)}
          onCancel={handleCancelDraft}
          saving={saveMutation.isPending}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {entriesQuery.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {entriesQuery.data && entriesQuery.data.length === 0 && (
            <p className="text-sm text-muted-foreground">No entries yet. Tap the mic to add one.</p>
          )}
          <ul className="space-y-3">
            {entriesQuery.data?.map((e) => (
              <li key={e.id} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{e.log_type}</Badge>
                    {e.area && <Badge variant="outline" className="capitalize">{e.area.replace("_", "/")}</Badge>}
                    {e.name && <span className="font-medium">{e.name}</span>}
                    {e.follow_up_needed && (
                      <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">
                        Follow-up{e.follow_up_date ? ` · ${e.follow_up_date}` : ""}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(e.id)} aria-label="Delete entry">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {e.details && <p className="mt-2 text-sm">{e.details}</p>}
                {e.action_taken && (
                  <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium">Action:</span> {e.action_taken}</p>
                )}
                {e.notes && (
                  <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium">Notes:</span> {e.notes}</p>
                )}
                <p className="mt-2 text-[11px] text-muted-foreground">{new Date(e.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function DraftCard({
  draft, setDraft, onSave, onCancel, saving,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <Card className="border-primary/50">
      <CardHeader><CardTitle className="text-base">Review entry</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {draft.transcript && (
          <div className="rounded-md bg-muted/50 p-3 text-xs italic text-muted-foreground">"{draft.transcript}"</div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Log type</Label>
            <Select value={draft.log_type} onValueChange={(v) => setDraft({ ...draft, log_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LOG_TYPES.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Area</Label>
            <Select value={draft.area ?? "other"} onValueChange={(v) => setDraft({ ...draft, area: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AREAS.map((a) => (<SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Ms. Johnson" />
        </div>
        <div className="space-y-1">
          <Label>Details</Label>
          <Textarea value={draft.details ?? ""} onChange={(e) => setDraft({ ...draft, details: e.target.value })} rows={3} />
        </div>
        <div className="space-y-1">
          <Label>Action taken</Label>
          <Input value={draft.action_taken ?? ""} onChange={(e) => setDraft({ ...draft, action_taken: e.target.value })} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="followup" checked={draft.follow_up_needed} onCheckedChange={(v) => setDraft({ ...draft, follow_up_needed: v === true })} />
          <Label htmlFor="followup" className="cursor-pointer">Follow-up needed</Label>
        </div>
        {draft.follow_up_needed && (
          <div className="space-y-1">
            <Label>Follow-up date</Label>
            <Input type="date" value={draft.follow_up_date ?? ""} onChange={(e) => setDraft({ ...draft, follow_up_date: e.target.value || null })} />
          </div>
        )}
        <div className="space-y-1">
          <Label>Notes</Label>
          <Textarea value={draft.notes ?? ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} rows={2} />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} disabled={saving} className="flex-1">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Save entry
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Discard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
