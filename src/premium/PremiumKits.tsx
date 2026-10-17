import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivation } from "./ActivationContext";
import { isPremiumPlan } from "./plan";
import { kits, newestKitsFirst } from "./kits";

export function PremiumKits() {
  const { plan } = useActivation();
  if (!isPremiumPlan(plan)) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Premium Kits</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <LockKeyhole className="mb-4 h-6 w-6 text-muted-foreground" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Premium Kits are included with Companion Ed Premium — a new seasonal kit each month with an interactive calendar, checklists, ready-to-send templates, and reflection prompts. This month: Notice &amp; Nurture.
          </p>
          <Button asChild className="mt-5 gap-2">
            <a href="https://companioneducation.com/coach" target="_blank" rel="noopener noreferrer">Upgrade to Premium <ArrowUpRight className="h-4 w-4" /></a>
          </Button>
        </div>
      </section>
    );
  }

  const [newest, ...older] = newestKitsFirst(kits);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Premium Kits</h2>
      {newest && (
        <article className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-medium text-accent">{newest.month}</p>
          <h3 className="mt-2 text-2xl font-semibold">{newest.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{newest.description}</p>
          <Button asChild className="mt-5 gap-2">
            <a href={newest.file} target="_blank" rel="noopener noreferrer">Open kit <ArrowUpRight className="h-4 w-4" /></a>
          </Button>
        </article>
      )}
      {older.length > 0 && (
        <ul className="divide-y divide-border">
          {older.map((kit) => (
            <li key={kit.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div><p className="text-xs text-muted-foreground">{kit.month}</p><h3 className="font-medium">{kit.title}</h3></div>
              <Button asChild variant="outline" size="sm"><a href={kit.file} target="_blank" rel="noopener noreferrer">Open kit <ArrowUpRight className="h-4 w-4" /></a></Button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">Your kit notes and checklists are saved on this device.</p>
    </section>
  );
}