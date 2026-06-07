import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotesBlock } from "./NotesBlock";

export function WeeklyReset() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">👁 Looking Ahead</CardTitle>
        </CardHeader>
        <CardContent>
          <NotesBlock storageKey="cw.week.ahead" label="What needs extra preparation or attention this week?" rows={3} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">👥 People Needing Attention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesBlock storageKey="cw.week.teachers" label="Teachers — coaching support / cycles" rows={2} />
          <NotesBlock storageKey="cw.week.teams" label="Teams / PLCs — planning, routines, resources" rows={2} />
          <NotesBlock storageKey="cw.week.recognize" label="Recognition this week" rows={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">One Goal for the Week</CardTitle>
        </CardHeader>
        <CardContent>
          <NotesBlock storageKey="cw.week.goal" label="Goal" rows={2} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">📣 Communications to Send</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotesBlock storageKey="cw.week.comm.teachers" label="Teacher communication (coaching / instruction)" rows={2} />
          <NotesBlock storageKey="cw.week.comm.admin" label="Admin communication (updates / needs)" rows={2} />
          <NotesBlock storageKey="cw.week.comm.teams" label="Team communication (resources / next steps)" rows={2} />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }}>
          Save weekly plan
        </Button>
        {saved && <span className="text-sm text-emerald-600">✓ Saved locally</span>}
      </div>
    </div>
  );
}
