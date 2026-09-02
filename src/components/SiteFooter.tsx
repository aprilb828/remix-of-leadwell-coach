import { Link } from "@tanstack/react-router";

/** Shared Companion Education™ footer — identical link order on every page. */
export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border pt-4 text-center text-xs text-muted-foreground">
      <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Link to="/" className="underline underline-offset-2 hover:text-foreground">
          Instructional coaching companion
        </Link>
        <span aria-hidden>·</span>
        <Link to="/about" className="underline underline-offset-2 hover:text-foreground">
          About Companion Education™ &amp; our founder
        </Link>
        <span aria-hidden>·</span>
        <Link to="/contact" className="underline underline-offset-2 hover:text-foreground">
          Contact us
        </Link>
        <span aria-hidden>·</span>
        <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </Link>
      </nav>
      <p className="mt-3 leading-relaxed">
        Companion Education-Coach Edition™ · The Companion Ed Framework™ · © 2026 Companion
        Education™ · Created by April Stephens Bryson ·{" "}
        <a href="mailto:april@companioneducation.com" className="underline underline-offset-2">
          april@companioneducation.com
        </a>
      </p>
    </footer>
  );
}
