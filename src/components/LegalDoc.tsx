import { useEffect, useState, type ReactNode } from "react";

// Read-only fetch of shared legal docs (never write to this table).
const URL_BASE = "https://mrhdfxzendnaamzdnpsb.supabase.co/rest/v1/legal_docs";
const KEY = "sb_publishable_nF9Nvp27Ruitc0b1AKnksw_hwlIvrei";

type Doc = { title: string; content_md: string; updated_at: string };

// Inline formatting: **bold** only.
function renderInline(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

type ParaLine = { text: string; br: boolean };
type Block =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p"; lines: ParaLine[] };

// Minimal markdown: #/##/### headings, - bullet lists, blank-line paragraphs,
// and hard line breaks on lines ending with two spaces.
function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = [];
  let list: string[] = [];
  let para: ParaLine[] = [];

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };
  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", lines: para });
      para = [];
    }
  };

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      flushPara();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      flushPara();
      blocks.push({ type: "h3", text: line.slice(4) });
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      flushPara();
      blocks.push({ type: "h2", text: line.slice(3) });
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      flushPara();
      blocks.push({ type: "h1", text: line.slice(2) });
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
      continue;
    }
    flushList();
    para.push({ text: line, br: /  $/.test(raw) });
  }
  flushList();
  flushPara();
  return blocks;
}

function MarkdownView({ md }: { md: string }) {
  return (
    <div className="space-y-3">
      {parseMarkdown(md).map((block, i) => {
        if (block.type === "h1")
          return (
            <h2 key={i} className="text-2xl font-semibold">
              {renderInline(block.text)}
            </h2>
          );
        if (block.type === "h2")
          return (
            <h2 key={i} className="pt-3 text-base font-semibold">
              {renderInline(block.text)}
            </h2>
          );
        if (block.type === "h3")
          return (
            <h3 key={i} className="pt-2 text-sm font-semibold">
              {renderInline(block.text)}
            </h3>
          );
        if (block.type === "ul")
          return (
            <ul key={i} className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {block.lines.map((line, j) => (
              <span key={j}>
                {renderInline(line.text)}
                {line.br && j < block.lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

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
      <MarkdownView md={doc.content_md} />
    </div>
  );
}
