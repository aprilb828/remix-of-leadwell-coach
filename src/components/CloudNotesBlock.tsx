import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function CloudNotesBlock({
  fieldKey,
  value,
  onChange,
  label,
  placeholder,
  rows = 2,
}: {
  fieldKey: string;
  value: string;
  onChange: (key: string, value: string) => void;
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y bg-background"
      />
    </div>
  );
}

export function CloudResetButton({ onReset }: { onReset: () => void | Promise<void> }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        if (window.confirm("Today's entries are saved to history. Clear the fields?")) {
          void onReset();
        }
      }}
      className="text-muted-foreground"
    >
      <RotateCcw className="mr-1 h-3 w-3" />
      Reset for today
    </Button>
  );
}
