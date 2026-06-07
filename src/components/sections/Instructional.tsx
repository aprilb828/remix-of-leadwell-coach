import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesBlock, ResetButton } from "./NotesBlock";
import { VoiceCommand } from "@/components/VoiceCommand";

export function Instructional() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">📋 Instructional Touchpoints</CardTitle>
          <ResetButton keys={["cw.inst.team", "cw.inst.classroom", "cw.inst.barrier", "cw.inst.followup"]} />
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesBlock storageKey="cw.inst.team" label="One grade-level or team touchpoint (5–10 minutes)" rows={2} />
          <NotesBlock storageKey="cw.inst.classroom" label="One classroom look-for (curriculum, engagement, routines)" rows={2} />
          <NotesBlock storageKey="cw.inst.barrier" label="One barrier to remove for teaching and learning" rows={2} />
          <NotesBlock storageKey="cw.inst.followup" label="One follow-up to strengthen consistency" rows={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">🏫 Walkthrough & Coaching Cycle Log</CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceCommand />
        </CardContent>
      </Card>
    </div>
  );
}
