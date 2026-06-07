import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function NotesBlock({
  storageKey,
  label,
  placeholder,
  rows = 2,
}: {
  storageKey: string;
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  const [value, setValue] = useLocalStorage<string>(storageKey, "");
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y bg-background"
      />
    </div>
  );
}

export function ResetButton({ keys }: { keys: string[] }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        keys.forEach((k) => window.localStorage.removeItem(k));
        window.location.reload();
      }}
      className="text-muted-foreground"
    >
      <RotateCcw className="mr-1 h-3 w-3" />
      Reset
    </Button>
  );
}
