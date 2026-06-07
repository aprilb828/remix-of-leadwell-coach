import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Lightbulb, Mic } from "lucide-react";

const TIPS = [
  "Your calm builds trust. Your clarity builds capacity. One teacher at a time.",
  "A two-minute check-in beats a two-hour email thread.",
  "Coach the teacher in front of you, not the lesson you wish you saw.",
  "Name one specific move a teacher made today — recognition is coaching.",
  "Reduce friction first. Strategy lands better when the runway is clear.",
  "Progress is enough. You do not have to fix everything today to be an excellent coach.",
];

export function StartHere() {
  const [tipIdx, setTipIdx] = useState(0);
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-[color-mix(in_oklab,var(--primary)_4%,var(--background))]">
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-primary">Welcome. I'm glad you're here.</h2>
          <p className="text-sm leading-relaxed">
            This guide was created to help you focus on what matters most each day as an instructional coach.
            You do not need to do everything. You need to do what matters.
          </p>
          <p className="text-sm leading-relaxed">
            The CoachWell Framework™ is here to support you step-by-step. Begin here each morning and allow
            this system to help you focus.
          </p>
          <p className="text-sm font-semibold text-primary">
            Coach with clarity. Support teachers. Protect your well-being.
          </p>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li>Focus the day on the highest-leverage coaching moves</li>
            <li>Support teachers with care and follow-through</li>
            <li>Strengthen teaching and learning, one teacher at a time</li>
            <li>Leave work with greater peace of mind</li>
          </ul>
          <p className="text-sm italic text-muted-foreground">
            You do not have to solve everything today. Let's get started…
          </p>
          <p className="text-xs text-muted-foreground">
            — April Stephens Bryson, Retired Elementary Principal · april@companioneducation.com
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mic className="h-4 w-4" /> Voice Command Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>On any log page, tap <strong className="text-primary">🎙 Speak a Command</strong> and say something like:</p>
          <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
            <li>"Add a teacher log for Ms. Johnson — coaching cycle on small-group instruction, follow-up next Tuesday."</li>
            <li>"Log a team note for 3rd grade PLC — planning support needed for the next unit launch."</li>
            <li>"Walkthrough note for Mr. Lee — strong student discourse during math, recognize tomorrow."</li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Lovable AI parses your words and pre-fills the form. You review and save — done in seconds.
            Works on iPad, iPhone Safari, Chrome &amp; Edge.
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-amber-500" /> Coaching · CoachWell Tip
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setTipIdx((i) => (i + 1) % TIPS.length)}>
            <RotateCcw className="mr-1 h-3 w-3" /> See another tip
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic">"{TIPS[tipIdx]}"</p>
        </CardContent>
      </Card>

      <p className="text-center text-sm italic text-muted-foreground">
        "Your calm builds trust. Your clarity builds capacity. One teacher at a time."
      </p>
    </div>
  );
}
