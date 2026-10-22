import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc } from "@/components/LegalDoc";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Companion Education-Coach Edition™" },
      {
        name: "description",
        content:
          "Companion Education™ privacy policy: local-first educator tools designed to minimize sensitive information. No cloud database of classroom content.",
      },
      { property: "og:title", content: "Privacy Policy — Companion Education-Coach Edition™" },
      {
        property: "og:description",
        content:
          "Companion Education™ privacy policy: local-first educator tools designed to minimize sensitive information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://coach.app.companioneducation.com/social-preview.png" },
      { name: "twitter:image", content: "https://coach.app.companioneducation.com/social-preview.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
              <h1 className="text-lg font-semibold sm:text-xl">Companion Education™ Privacy</h1>
            </div>
          </div>
          <Button asChild variant="secondary" size="sm" className="h-7 gap-1 rounded-full px-3 text-xs">
            <Link to="/">
              <ArrowLeft className="h-3 w-3" /> Back to app
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <LegalDoc slug="privacy" />

        <SiteFooter />
      </main>
    </div>
  );
}
