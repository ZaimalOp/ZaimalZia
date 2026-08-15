import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <div className="container flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
            <p className="eyebrow text-primary">Error 404</p>
            <h1 className="display mt-5 text-display-md text-etched">This route does not exist.</h1>
            <p className="mt-5 max-w-md text-fg-muted">
                The page you asked for is not part of this site. Everything lives on the home page or
                the resume.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                    href="/"
                    className="inline-flex h-11 items-center rounded-[var(--radius)] bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-primary hover:text-primary-fg"
                >
                    Back home
                </Link>
                <Link
                    href="/resume"
                    className="inline-flex h-11 items-center rounded-[var(--radius)] border border-border-strong px-5 text-sm font-medium text-fg transition-colors hover:border-primary/60 hover:text-primary"
                >
                    Resume
                </Link>
            </div>
        </div>
    );
}
