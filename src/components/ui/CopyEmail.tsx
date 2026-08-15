"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { identity } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Copy-to-clipboard with a live region so screen readers hear the result.
 * Falls back to selecting the address if the Clipboard API is unavailable.
 */
export function CopyEmail({ className }: { className?: string }) {
    const [copied, setCopied] = useState(false);
    const [failed, setFailed] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        clearTimeout(timer.current);
        try {
            await navigator.clipboard.writeText(identity.email);
            setCopied(true);
            setFailed(false);
        } catch {
            setFailed(true);
            setCopied(false);
        }
        timer.current = setTimeout(() => {
            setCopied(false);
            setFailed(false);
        }, 2200);
    };

    return (
        <div className={cn("flex flex-wrap items-center gap-3", className)}>
            <a
                href={`mailto:${identity.email}`}
                className="link-underline inline-flex min-h-11 items-center font-mono text-sm text-fg sm:text-base"
            >
                {identity.email}
            </a>

            <button
                type="button"
                onClick={copy}
                className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-border px-2.5",
                    "font-mono text-xs text-fg-muted transition-colors duration-[var(--dur)]",
                    "hover:border-primary/60 hover:text-primary",
                )}
            >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? "Copied" : failed ? "Select it" : "Copy"}
            </button>

            <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard" : failed ? "Copy failed, please select the address manually" : ""}
            </span>
        </div>
    );
}
