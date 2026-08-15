"use client";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
            <p className="eyebrow text-amber-ink">Runtime error</p>
            <h1 className="display mt-5 text-display-md text-etched">Something failed to render.</h1>
            <p className="mt-5 max-w-md text-fg-muted">
                An unexpected error occurred while building this view. Retrying re-renders the section.
            </p>
            {error.digest && (
                <p className="mt-4 font-mono text-xs text-fg-subtle">Digest: {error.digest}</p>
            )}
            <button
                type="button"
                onClick={reset}
                className="mt-9 inline-flex h-11 items-center rounded-[var(--radius)] bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-primary hover:text-primary-fg"
            >
                Try again
            </button>
        </div>
    );
}
