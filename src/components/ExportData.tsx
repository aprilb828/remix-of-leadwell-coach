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
import { getDeviceId } from "@/lib/device-id";
import { toast } from "sonner";

type Dataset = { name: string; rows: Record<string, unknown>[] };

async function fetchAll(): Promise<Dataset[]> {
  const [reflections, goals, updates, voice] = await Promise.all([
    supabase.from("daily_reflections").select("*").eq("device_id", getDeviceId()).order("entry_date", { ascending: false }),
    supabase.from("long_term_goals").select("*").eq("device_id", getDeviceId()).order("created_at", { ascending: false }),
    supabase.from("goal_updates").select("*").eq("device_id", getDeviceId()).order("created_at", { ascending: false }),
    supabase.from("voice_entries").select("*").eq("device_id", getDeviceId()).order("created_at", { ascending: false }),
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

  const handlePDF = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const datasets = await fetchAll();
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 40;
      const width = doc.internal.pageSize.getWidth() - margin * 2;
      const bottom = doc.internal.pageSize.getHeight() - margin;
      let y = margin;

      const nextLine = (h: number) => {
        if (y + h > bottom) {
          doc.addPage();
          y = margin;
        }
      };

      doc.setFontSize(16);
      doc.text("Companion Education-Coach Edition", margin, y);
      y += 18;
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Data export · ${stamp()}`, margin, y);
      doc.setTextColor(0);
      y += 24;

      for (const ds of datasets) {
        nextLine(30);
        doc.setFontSize(13);
        doc.text(ds.name.replace(/_/g, " "), margin, y);
        y += 16;
        doc.setFontSize(9);

        if (!ds.rows.length) {
          nextLine(14);
          doc.setTextColor(120);
          doc.text("No data", margin, y);
          doc.setTextColor(0);
          y += 20;
          continue;
        }

        for (const row of ds.rows) {
          const text = Object.entries(row)
            .filter(([, v]) => v !== null && v !== "" && v !== undefined)
            .map(([k, v]) => `${k}: ${String(v)}`)
            .join(" · ");
          const lines = doc.splitTextToSize(text, width) as string[];
          nextLine(lines.length * 11 + 8);
          doc.text(lines, margin, y);
          y += lines.length * 11 + 8;
        }
        y += 10;
      }

      doc.save(`coachwell-export-${stamp()}.pdf`);
      toast.success("PDF export ready");
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
        <DropdownMenuItem onClick={handlePDF}>PDF (.pdf)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

