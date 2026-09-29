import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import appleLogo from "@/assets/companion-apple.png";
import { SiteFooter } from "@/components/SiteFooter";
import termsMd from "./-terms-content.md?raw";

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
    ],
  }),
  component: TermsPage,
});

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function renderTerms(md: string): ReactNode[] {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      const items = list;
      out.push(
        <ul key={`ul-${out.length}`} className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {items.map((li, i) => <li key={i}>{inline(li)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("- ")) { list.push(line.slice(2)); continue; }
    flush();
    if (!line || line === "---") continue;
    if (line.startsWith("## ")) out.push(<h2 key={out.length} className="pt-3 text-base font-semibold">{inline(line.slice(3))}</h2>);
    else if (line.startsWith("# ")) out.push(<h2 key={out.length} className="text-2xl font-semibold">{inline(line.slice(2))}</h2>);
    else out.push(<p key={out.length} className="text-sm leading-relaxed text-muted-foreground">{inline(line)}</p>);
  }
  flush();
  return out;
}

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
        {renderTerms(termsMd)}
      </main>

      <div className="mx-auto max-w-3xl px-4 pb-8">
        <SiteFooter />
      </div>
    </div>
  );
}
