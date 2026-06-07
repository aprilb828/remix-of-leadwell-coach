import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const MORNING_LABELS: Record<string, string> = {
  encourage: "Encourage",
  priority: "Prioritize",
  decision: "Reduce friction",
  letgo: "Let go of",
};
const EOD_LABELS: Record<string, string> = {
  wins: "Today's wins",
  followups: "Follow-ups",
  prep: "Prep for tomorrow",
  inbox: "Inbox triage",
};

type Row = {
  id: string;
  entry_date: string;
  entry_type: "morning" | "eod";
  fields: Record<string, string>;
  updated_at: string;
};

export function History() {
  const { data, isLoading } = useQuery({
    queryKey: ["daily_reflections_history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_reflections")
        .select("*")
        .order("entry_date", { ascending: false })
        .limit(60);
      if (error) throw error;
      return data as unknown as Row[];
    },
  });

  const byDate = new Map<string, { morning?: Row; eod?: Row }>();
  data?.forEach((r) => {
    const slot = byDate.get(r.entry_date) ?? {};
    slot[r.entry_type] = r;
    byDate.set(r.entry_date, slot);
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">📅 Daily History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!isLoading && byDate.size === 0 && (
            <p className="text-sm text-muted-foreground">
              No entries yet. Use the Dashboard's Morning Check-In and End-of-Day Reset — entries auto-save to history each day.
            </p>
          )}
          <ul className="space-y-4">
            {Array.from(byDate.entries()).map(([date, slot]) => (
              <li key={date} className="rounded-md border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric", year: "numeric",
                    })}
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReflectionBlock title="🌅 Morning Check-In" row={slot.morning} labels={MORNING_LABELS} />
                  <ReflectionBlock title="🌙 End-of-Day Reset" row={slot.eod} labels={EOD_LABELS} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function ReflectionBlock({
  title, row, labels,
}: { title: string; row?: Row; labels: Record<string, string> }) {
  const hasContent = row && Object.values(row.fields ?? {}).some((v) => v && v.trim());
  return (
    <div className="rounded-md bg-muted/40 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="secondary">{title}</Badge>
      </div>
      {!hasContent && <p className="text-xs text-muted-foreground">No entry.</p>}
      {hasContent && (
        <dl className="space-y-2 text-sm">
          {Object.entries(labels).map(([k, label]) => {
            const val = row?.fields?.[k];
            if (!val || !val.trim()) return null;
            return (
              <div key={k}>
                <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                <dd className="whitespace-pre-wrap">{val}</dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
