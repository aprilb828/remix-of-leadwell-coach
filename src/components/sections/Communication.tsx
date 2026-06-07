import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

const TEMPLATES = [
  {
    id: "appreciation",
    name: "Teacher Appreciation",
    blurb: "Quick 2-minute appreciation note",
    body: `I saw [specific thing] today. Thank you for [what it showed / why it mattered]. It made a difference for students because [reason]. Let me know what support would help next.

— [Your Name]`,
  },
  {
    id: "coaching",
    name: "Coaching Follow-Up",
    blurb: "After a coaching conversation",
    body: `Thanks for partnering today. Here's what we agreed to try next: [specific strategy]. I'll check back on [day] to look for [look-for]. I'm here to support you.

— [Your Name]`,
  },
  {
    id: "resource",
    name: "Resource Share",
    blurb: "Quick and clear resource hand-off",
    body: `Sharing a resource that may help with [focus]: [resource link / title]. If you want, we can co-plan how to use it in your next lesson.

— [Your Name]`,
  },
  {
    id: "admin",
    name: "Admin Update",
    blurb: "Solution-forward update to administrators",
    body: `Quick update. Here's what I'm seeing in [area]: [observation]. Here's what we're trying next: [strategy]. Support needed: [ask]. I'll follow up by [day].

— [Your Name]`,
  },
  {
    id: "team",
    name: "Team / PLC Next Steps",
    blurb: "After a PLC or team meeting",
    body: `Thanks for a productive team conversation about [focus]. Next steps: [step + who + by when]. Resources to use: [resource]. I'll check in on [day].

— [Your Name]`,
  },
];

export function Communication() {
  const [active, setActive] = useState(TEMPLATES[0].id);
  const tpl = TEMPLATES.find((t) => t.id === active)!;
  const [body, setBody] = useState(tpl.body);
  const [copied, setCopied] = useState(false);

  function selectTpl(id: string) {
    setActive(id);
    setBody(TEMPLATES.find((t) => t.id === id)!.body);
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">📣 Communication Companion (Instructional Coach)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use coach-safe, copy-paste templates to communicate with teachers and administrators in a
            calm, professional tone. Adjust as needed to reflect your voice and situation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Choose a template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTpl(t.id)}
                className={`rounded-md border p-3 text-left transition ${
                  active === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                }`}
              >
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.blurb}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Template — {tpl.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={9} className="bg-background font-mono text-sm" />
          <div className="flex items-center gap-3">
            <Button onClick={copy}>
              <Copy className="mr-2 h-4 w-4" /> Copy to clipboard
            </Button>
            {copied && <span className="text-sm text-emerald-600">✓ Copied!</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
