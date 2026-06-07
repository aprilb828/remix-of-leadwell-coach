import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Dataset = { name: string; rows: Record<string, unknown>[] };

async function fetchAll(): Promise<Dataset[]> {
  const [reflections, goals, updates, voice] = await Promise.all([
    supabase.from("daily_reflections").select("*").order("entry_date", { ascending: false }),
    supabase.from("long_term_goals").select("*").order("created_at", { ascending: false }),
    supabase.from("goal_updates").select("*").order("created_at", { ascending: false }),
    supabase.from("voice_entries").select("*").order("created_at", { ascending: false }),
  ]);

  const flatten = (rows: any[] | null) =>
    (rows ?? []).map((r) => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(r)) {
        out[k] = v && typeof v === "object" ? JSON.stringify(v) : v;
      }
      return out;
    });

  return [
    { name: "Dashboard_Reflections", rows: flatten(reflections.data) },
    { name: "Goals", rows: flatten(goals.data) },
    { name: "Goal_Updates", rows: flatten(updates.data) },
    { name: "Coach_VoiceLog", rows: flatten(voice.data) },
  ];
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const ws = XLSX.utils.json_to_sheet(rows);
  return XLSX.utils.sheet_to_csv(ws);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportData() {
  const [loading, setLoading] = useState(false);
  const stamp = () => new Date().toISOString().slice(0, 10);

  const handleExcel = async () => {
    setLoading(true);
    try {
      const datasets = await fetchAll();
      const wb = XLSX.utils.book_new();
      for (const ds of datasets) {
        const ws = XLSX.utils.json_to_sheet(ds.rows.length ? ds.rows : [{ note: "No data" }]);
        XLSX.utils.book_append_sheet(wb, ws, ds.name.slice(0, 31));
      }
      const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      downloadBlob(
        new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        `coachwell-export-${stamp()}.xlsx`,
      );
      toast.success("Excel export ready");
    } catch (e) {
      console.error(e);
      toast.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCSV = async () => {
    setLoading(true);
    try {
      const datasets = await fetchAll();
      const parts = datasets.map(
        (ds) => `# ${ds.name}\n${ds.rows.length ? toCSV(ds.rows) : "(no data)\n"}`,
      );
      const blob = new Blob([parts.join("\n\n")], { type: "text/csv;charset=utf-8" });
      downloadBlob(blob, `coachwell-export-${stamp()}.csv`);
      toast.success("CSV export ready");
    } catch (e) {
      console.error(e);
      toast.error("Export failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" disabled={loading} className="h-7 gap-1 text-xs">
          <Download className="h-3 w-3" />
          {loading ? "Exporting…" : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExcel}>Excel (.xlsx)</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCSV}>CSV (.csv)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
