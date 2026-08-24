import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Dashboard } from "@/components/sections/Dashboard";
import { VoiceCommand } from "@/components/VoiceCommand";
import { CoachingPlan } from "@/components/sections/CoachingPlan";
import { Instructional } from "@/components/sections/Instructional";
import { Communication } from "@/components/sections/Communication";
import { WeeklyReset } from "@/components/sections/WeeklyReset";
import { History } from "@/components/sections/History";
import { Goals } from "@/components/sections/Goals";
import { Compass, Info } from "lucide-react";
import { ExportData } from "@/components/ExportData";
import { TourDialog, useTour } from "@/components/TourDialog";
import { SiteFooter } from "@/components/SiteFooter";
import appleLogo from "@/assets/companion-apple.png";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Companion Education-Coach Edition™ — The Companion Ed Framework™" },
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
  const tour = useTour();
  const [activeTab, setActiveTab] = useState("dashboard");

  const today = new Date();
  const dateLine = today.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <TourDialog
        open={tour.open}
        onOpenChange={tour.setOpen}
        onDismissForever={() => tour.setDismissed(true)}
        onStartCoaching={() => setActiveTab("dashboard")}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-4 px-4 py-6">
          <div className="flex items-start gap-3">
            <img
              src={appleLogo}
              alt="Companion Education apple mark"
              className="h-11 w-11 shrink-0 rounded-xl bg-primary-foreground/10 p-1"
            />
            <div>
              <h1 className="text-lg font-semibold leading-tight sm:text-xl">
                Companion Education-Coach Edition™
              </h1>
              <p className="text-xs opacity-80 sm:text-sm">
                The Companion Ed Framework™ · Coach with clarity. Support teachers. Protect your well-being.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right text-xs sm:text-sm">
              <div className="font-semibold">{dateLine}</div>
              <div className="opacity-80">{weekday}</div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <ExportData />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => tour.setOpen(true)}
                className="h-7 gap-1 rounded-full px-3 text-xs"
              >
                <Compass className="h-3 w-3" />
                Tour
              </Button>
              <Button asChild variant="secondary" size="sm" className="h-7 gap-1 rounded-full px-3 text-xs">
                <Link to="/about">
                  <Info className="h-3 w-3" />
                  Framework
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>



      <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
            <TabsList className="h-auto w-max gap-1 rounded-full bg-surface p-1.5">
              {TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

          </div>

          <div className="mt-6">

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
          Companion Education-Coach Edition™ · The Companion Ed Framework™ · © 2026
          Companion Education · Created by April Stephens Bryson ·
          april@companioneducation.com
        </footer>
      </main>
    </div>
  );
}
