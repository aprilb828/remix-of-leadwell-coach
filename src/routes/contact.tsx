import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Need more personalized support? Tell us about coaching for your team, a school or district rollout, or a question about using the app day to day.",
      },
      { property: "og:title", content: "Contact — Companion Education-Coach Edition™" },
      {
        property: "og:description",
        content:
          "Tell us what you are working on — coaching, a school or district rollout, or a day-to-day question.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  role: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(160).optional(),
  message: z.string().trim().min(1, "Tell us how we can help").max(2000),
});

const EMPTY = { name: "", email: "", role: "", organization: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    // CRM funnel hookup goes here later.
    setTimeout(() => {
      setSubmitting(false);
      setForm(EMPTY);
      toast.success("Thanks — your message is on its way. April and the team read every one.");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">Contact</p>
            <h1 className="text-lg font-semibold sm:text-xl">Need more personalized support?</h1>
          </div>
          <Button asChild variant="secondary" size="sm" className="h-7 gap-1 text-xs">
            <Link to="/about">
              <ArrowLeft className="h-3 w-3" /> Back to about
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tell us what you are working on — coaching for your team, a school or district rollout, or
          a question about using the app day to day. April and the team read every message.
        </p>

        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-4 text-sm font-semibold text-primary">Tell us a bit about you</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Name</Label>
                  <Input id="name" value={form.name} onChange={set("name")} maxLength={100} placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={set("email")} maxLength={255} placeholder="you@school.org" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs">Role (optional)</Label>
                  <Input id="role" value={form.role} onChange={set("role")} maxLength={120} placeholder="Teacher, coach, principal..." />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="organization" className="text-xs">School or district (optional)</Label>
                  <Input id="organization" value={form.organization} onChange={set("organization")} maxLength={160} placeholder="Where you work" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">How can we help?</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={set("message")}
                  maxLength={2000}
                  rows={5}
                  placeholder="What kind of support are you looking for?"
                />
                <p className="text-xs text-muted-foreground">{form.message.length}/2000 characters</p>
              </div>

              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Prefer email? Write to{" "}
          <a href="mailto:april@companioneducation.com" className="underline">
            april@companioneducation.com
          </a>
          .
        </p>
      </main>
    </div>
  );
}
