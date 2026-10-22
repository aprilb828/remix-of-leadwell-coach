import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";
import { LegalDoc } from "@/components/LegalDoc";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Companion Education™ Terms & Conditions governing the use of our educator productivity tools, voice features, and local-first applications.",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Companion Education-Coach Edition™",
      },
      {
        property: "og:description",
        content:
          "Companion Education™ Terms & Conditions governing the use of our educator productivity tools, voice features, and local-first applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://coach.app.companioneducation.com/social-preview.png" },
      { name: "twitter:image", content: "https://coach.app.companioneducation.com/social-preview.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-start gap-3">
            <img
              src={appleLogo}
              alt="Companion Education apple mark"
              className="h-11 w-11 shrink-0 rounded-xl bg-primary-foreground/10 p-1"
            />
            <div>
              <p className="text-xs uppercase tracking-wide opacity-80">Legal</p>
              <h1 className="text-lg font-semibold sm:text-xl">Companion Education™ Terms</h1>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm" className="h-7 gap-1 rounded-full px-3 text-xs">
            <Link to="/">
              <ArrowLeft className="h-3 w-3" /> Back to app
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-3 px-4 py-8">
        <LegalDoc slug="terms" />
      </main>

      <div className="mx-auto max-w-3xl px-4 pb-8">
        <SiteFooter />
      </div>
    </div>
  );
}
