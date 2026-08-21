import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import headshot from "@/assets/april-bryson-headshot.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Built by an educator who carried the same load. Meet April Stephens Bryson and the four principles of The Companion Ed Framework™.",
      },
      { property: "og:title", content: "About — Companion Education-Coach Edition™" },
      {
        property: "og:description",
        content:
          "Built by an educator who carried the same load. Meet April Stephens Bryson and The Companion Ed Framework™.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Capture what matters",
    body: "Speak a ten-second note while you're still circulating. No form to fill out, no app to hunt for between classes.",
  },
  {
    title: "Follow through on promises",
    body: "The call home, the reteach, the check-in you meant to do. Give it a date and it comes back to you instead of slipping.",
  },
  {
    title: "End the day with clarity",
    body: "Your notes become your end-of-day summary. You leave knowing what happened and what tomorrow needs.",
  },
  {
    title: "Protect your well-being",
    body: "You do not need to do everything. The framework is built to help you decide what actually matters today, and let the rest go.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">About us</p>
            <h1 className="text-lg font-semibold sm:text-xl">
              Built by an educator who carried the same load
            </h1>
          </div>
          <Button asChild variant="secondary" size="sm" className="h-7 gap-1 text-xs">
            <Link to="/">
              <ArrowLeft className="h-3 w-3" /> Back to app
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <Card className="border-none bg-primary text-primary-foreground">
          <CardContent className="space-y-2 pt-6">
            <p className="text-lg font-semibold">
              "You do not need to do everything. You need to do what matters."
            </p>
            <p className="text-xs opacity-80">April Stephens Bryson, Founder</p>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">Our founder</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <img
              src={headshot.url}
              alt="April Stephens Bryson, founder of Companion Education"
              loading="lazy"
              className="h-32 w-32 shrink-0 rounded-md object-cover"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              April Stephens Bryson is a former principal with 29 years of experience in education.
              She built Companion Education™ from real experience with school leaders and teachers
              who carry too much every day. After 22 years in the classroom and seven in
              administration, her mission is simple: give educators a steady, voice-first companion
              that helps them capture what matters, follow through on promises, and end each day with
              clarity —not guilt.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-primary">Our mission</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To give every educator a calm, practical system for the parts of the job that never fit
            on the lesson plan — the student moment worth remembering, the family who needs a call,
            the promise made in a hallway. We believe teachers should not have to choose between
            doing the work and documenting it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-primary">Our vision</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Classrooms led by educators who leave work with peace of mind. Not because the job got
            smaller, but because they stopped carrying it all in their heads. Stop trading your time
            for success — that is the goal behind everything we build.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-primary">The Companion Ed Framework™</h2>
          <p className="text-xs text-muted-foreground">
            Four principles that shape every part of the app.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.title}>
                <CardContent className="space-y-1 pt-5">
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <CardContent className="space-y-3 pt-6">
            <h2 className="text-sm font-semibold text-primary">See how it works</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Companion Education-Coach Edition™ turns a spoken ten-second note into a tagged,
              dated, searchable record — waiting for you at 3:00, already sorted into your
              end-of-day summary.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/">Open the app</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Companion Education-Coach Edition™ · The Companion Ed Framework™ · © 2026 Companion
          Education · Created by April Stephens Bryson
        </footer>
      </main>
    </div>
  );
}
