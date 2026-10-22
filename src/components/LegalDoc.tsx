import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Read-only fetch of shared legal docs (never write to this table).
const URL_BASE = "https://mrhdfxzendnaamzdnpsb.supabase.co/rest/v1/legal_docs";
const KEY = "sb_publishable_nF9Nvp27Ruitc0b1AKnksw_hwlIvrei";

type Doc = { title: string; content_md: string; updated_at: string };

export function LegalDoc({ slug }: { slug: "terms" | "privacy" }) {
  const [doc, setDoc] = useState<Doc | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${URL_BASE}?slug=eq.${slug}&select=title,content_md,updated_at`, {
      headers: { apikey: KEY },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rows: Doc[]) => {
        if (cancelled) return;
        if (rows?.[0]?.content_md) setDoc(rows[0]);
        else setFailed(true);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (failed)
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load this page right now. Please email terms@companioneducation.com.
      </p>
    );
  if (!doc) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">{doc.title}</h2>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
          h2: ({ children }) => <h2 className="pt-3 text-base font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="pt-2 text-sm font-semibold">{children}</h3>,
          p: ({ children }) => <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>,
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">{children}</ol>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => <a href={href} className="text-primary underline">{children}</a>,
          hr: () => null,
        }}
      >
        {doc.content_md}
      </ReactMarkdown>
    </div>
  );
}
