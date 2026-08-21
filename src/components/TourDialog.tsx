import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Slide = { title: string; body: React.ReactNode };

export const TOUR_SLIDES: Slide[] = [
  {
    title: "Welcome. I'm glad you're here.",
    body: (
      <div className="space-y-3">
        <p>
          This guide was created to help you focus on what matters most each day as an instructional
          coach. You do not need to do everything. You need to do what matters.
        </p>
        <p>
          The Companion Ed Framework™ is here to support you step-by-step. Begin here each morning
          and allow this system to help you focus.
        </p>
        <p className="font-semibold text-primary">
          Coach with clarity. Support teachers. Protect your well-being.
        </p>
      </div>
    ),
  },
  {
    title: "What this companion does for you",
    body: (
      <ul className="ml-5 list-disc space-y-2">
        <li>Focus the day on the highest-leverage coaching moves</li>
        <li>Support teachers with care and follow-through</li>
        <li>Strengthen teaching and learning, one teacher at a time</li>
        <li>Leave work with greater peace of mind</li>
      </ul>
    ),
  },
  {
    title: "🏠 Dashboard — start and end your day",
    body: (
      <div className="space-y-3">
        <p>Your Morning Coach Check-In sets four intentions:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>One teacher I will encourage today</li>
          <li>One grade level or team I will prioritize</li>
          <li>One coaching move to reduce friction</li>
          <li>One thing I will let go of today</li>
        </ul>
        <p>
          Track your Top 3 Coaching Priorities, jot Coach Notes, save Helpful Links, and close with
          the End-of-Day Reset. Everything auto-saves to your daily history.
        </p>
      </div>
    ),
  },
  {
    title: "👥 Teacher & Team Log — speak it, don't type it",
    body: (
      <div className="space-y-3">
        <p>
          Tap <strong className="text-primary">🎙 Speak a Command</strong> and say something like:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          <li>
            "Add a teacher log for Ms. Johnson — coaching cycle on small-group instruction,
            follow-up next Tuesday."
          </li>
          <li>
            "Log a team note for 3rd grade PLC — planning support needed for the next unit launch."
          </li>
          <li>
            "Walkthrough note for Mr. Lee — strong student discourse during math, recognize
            tomorrow."
          </li>
        </ul>
        <p className="text-muted-foreground">
          This app parses your words and pre-fills the form. You review and save — done in seconds.
          Works on iPad, iPhone Safari, Chrome &amp; Edge.
        </p>
      </div>
    ),
  },
  {
    title: "🧭 Coaching Plan & 📋 Walkthroughs",
    body: (
      <div className="space-y-3">
        <p>
          Use the Coaching Plan tab to map cycles, teams, and next steps so support is intentional
          rather than reactive.
        </p>
        <p>
          Use Walkthroughs to capture look-fors, evidence, and the one piece of feedback worth
          delivering — while it's still fresh.
        </p>
      </div>
    ),
  },
  {
    title: "🏔️ Long-Term Goals & 📣 Communication",
    body: (
      <div className="space-y-3">
        <p>
          Long-Term Goals keeps the big rocks visible and lets you log progress updates over the
          year.
        </p>
        <p>
          Communication holds your ready-to-send language for teachers, teams, and leadership, so
          you never start from a blank page.
        </p>
      </div>
    ),
  },
  {
    title: "📅 Weekly Reset & 🗂️ History",
    body: (
      <div className="space-y-3">
        <p>
          The Weekly Reset gives you a short, honest look back and a clear plan forward before the
          week starts again.
        </p>
        <p>
          History shows every saved reflection, log, and update by date — proof of the work you
          already did.
        </p>
      </div>
    ),
  },
  {
    title: "Export, About, and you're ready",
    body: (
      <div className="space-y-3">
        <p>
          <strong>Export</strong> (top right) downloads everything you've saved as Excel, CSV, or
          PDF.
        </p>
        <p>
          <strong>About</strong> tells the story behind Companion Education and the four principles
          of the framework.
        </p>
        <p className="italic text-muted-foreground">
          You do not have to solve everything today. Let's get started…
        </p>
        <p className="text-xs text-muted-foreground">
          — April Stephens Bryson, Retired Elementary Principal · april@companioneducation.com
        </p>
      </div>
    ),
  },
];

export function useTour() {
  const [dismissed, setDismissed] = useLocalStorage("cw.tour.dismissed", false);
  const [open, setOpen] = useState(!dismissed);
  return { open, setOpen, dismissed, setDismissed };
}

export function TourDialog({
  open,
  onOpenChange,
  onDismissForever,
  onStartCoaching,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onDismissForever: () => void;
  onStartCoaching?: () => void;
}) {
  const [i, setI] = useState(0);
  const slide = TOUR_SLIDES[i];
  const last = i === TOUR_SLIDES.length - 1;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setI(0);
      }}
    >
      <DialogContent className="max-w-xl">
        <div className="space-y-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            App Tour · {i + 1} of {TOUR_SLIDES.length}
          </div>
          <h2 className="text-xl font-semibold text-primary">{slide.title}</h2>
          <div className="min-h-[220px] text-sm leading-relaxed">{slide.body}</div>

          <div className="flex gap-1">
            {TOUR_SLIDES.map((_, n) => (
              <button
                key={n}
                aria-label={`Go to slide ${n + 1}`}
                onClick={() => setI(n)}
                className={`h-1.5 flex-1 rounded-full ${n <= i ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => setI(i - 1)}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {last ? (
              <Button
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  onStartCoaching?.();
                }}
              >
                Start coaching
              </Button>
            ) : (
              <Button size="sm" onClick={() => setI(i + 1)}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="border-t border-border pt-3 text-center">
            <button
              onClick={() => {
                onDismissForever();
                onOpenChange(false);
              }}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Do not show again
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
