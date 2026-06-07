import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { StartHere } from "@/components/sections/StartHere";
import { Dashboard } from "@/components/sections/Dashboard";
import { VoiceCommand } from "@/components/VoiceCommand";
import { CoachingPlan } from "@/components/sections/CoachingPlan";
import { Instructional } from "@/components/sections/Instructional";
import { Communication } from "@/components/sections/Communication";
import { WeeklyReset } from "@/components/sections/WeeklyReset";
import { History } from "@/components/sections/History";
import { Goals } from "@/components/sections/Goals";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Eye, EyeOff } from "lucide-react";
import { ExportData } from "@/components/ExportData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeadWell Instructional Coach Companion™ — CoachWell Framework" },
      {
        name: "description",
        content:
          "Calm, clear, voice-first daily companion for instructional coaches. Coach with clarity. Support teachers. Protect your well-being.",
      },
    ],
  }),
  component: Index,
});

const TABS = [
  { value: "start", label: "ℹ️ Start Here" },
  { value: "dashboard", label: "🏠 Dashboard" },
  { value: "log", label: "👥 Teacher & Team Log" },
  { value: "plan", label: "🧭 Coaching Plan" },
  { value: "instructional", label: "📋 Walkthroughs" },
  { value: "goals", label: "🏔️ Long-Term Goals" },
  { value: "communication", label: "📣 Communication" },
  { value: "weekly", label: "📅 Weekly Reset" },
  { value: "history", label: "🗂️ History" },
];

function Index() {
  const [hideStart, setHideStart] = useLocalStorage("cw.hideStartTab", false);
  const today = new Date();
  const dateLine = today.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-4 px-4 py-6">
          <div>
            <h1 className="text-lg font-semibold leading-tight sm:text-xl">
              LeadWell Instructional Coach Companion™
            </h1>
            <p className="text-xs opacity-80 sm:text-sm">
              The CoachWell Framework™ · Coach with clarity. Support teachers. Protect your well-being.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right text-xs sm:text-sm">
              <div className="font-semibold">{dateLine}</div>
              <div className="opacity-80">{weekday}</div>
            </div>
            <div className="flex gap-2">
              <ExportData />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setHideStart(!hideStart)}
                className="h-7 gap-1 text-xs"
              >
                {hideStart ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                {hideStart ? "Show Start" : "Hide Start"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4">
        <Tabs defaultValue={hideStart ? "dashboard" : "start"} className="w-full">
          <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
            <TabsList className="h-auto w-max bg-muted/60 p-1">
              {TABS.filter((t) => !hideStart || t.value !== "start").map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="whitespace-nowrap text-xs sm:text-sm">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-6">
            {!hideStart && (
              <TabsContent value="start"><StartHere /></TabsContent>
            )}
            <TabsContent value="dashboard"><Dashboard /></TabsContent>
            <TabsContent value="log"><VoiceCommand /></TabsContent>
            <TabsContent value="plan"><CoachingPlan /></TabsContent>
            <TabsContent value="instructional"><Instructional /></TabsContent>
            <TabsContent value="goals"><Goals /></TabsContent>
            <TabsContent value="communication"><Communication /></TabsContent>
            <TabsContent value="weekly"><WeeklyReset /></TabsContent>
            <TabsContent value="history"><History /></TabsContent>
          </div>
        </Tabs>

        <footer className="mt-12 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          LeadWell Instructional Coach Companion™ · The CoachWell Framework™ · © 2026
          Companion Education · Created by April Stephens Bryson ·
          april@companioneducation.com
        </footer>
      </main>
    </div>
  );
}
