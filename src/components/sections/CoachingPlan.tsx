import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesBlock, ResetButton } from "./NotesBlock";
import { VoiceCommand } from "@/components/VoiceCommand";

export function CoachingPlan() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">🧭 Coaching Plan — Where I'll Be, On Purpose</CardTitle>
          <ResetButton keys={["cw.plan.schedule", "cw.plan.focus", "cw.plan.touchpoints", "cw.plan.followups"]} />
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesBlock storageKey="cw.plan.schedule" label="Schedule check: coaching cycles, meetings, coverage" rows={2} />
          <NotesBlock storageKey="cw.plan.focus" label="Confirm focus classrooms / teams (and the 'look-for')" rows={2} />
          <NotesBlock storageKey="cw.plan.touchpoints" label="2–4 coaching touchpoints (observe, model, co-plan, debrief)" rows={2} />
          <NotesBlock storageKey="cw.plan.followups" label="Quick follow-ups (same-day, 2 minutes)" rows={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">👥 People &amp; Support</CardTitle>
          <ResetButton keys={["cw.people.teachers", "cw.people.coplan", "cw.people.modeling", "cw.people.recognize"]} />
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesBlock storageKey="cw.people.teachers" label="Teachers (3–5 who may need extra support today)" rows={3} />
          <NotesBlock storageKey="cw.people.coplan" label="Who needs co-planning support?" rows={2} />
          <NotesBlock storageKey="cw.people.modeling" label="Who needs modeling or side-by-side coaching?" rows={2} />
          <NotesBlock storageKey="cw.people.recognize" label="Who deserves recognition today?" rows={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">📋 Coaching Log</CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceCommand />
        </CardContent>
      </Card>
    </div>
  );
}
