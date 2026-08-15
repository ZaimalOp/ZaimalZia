import { systemStatus } from "@/content/site";
import { cn } from "@/lib/utils";

/** A live-looking but honest indicator: it reflects static structured status. */
export function StatusDot({ className, tone = "emerald" }: { className?: string; tone?: "emerald" | "primary" }) {
    return (
        <span className={cn("relative flex h-1.5 w-1.5 shrink-0", className)} aria-hidden="true">
            <span
                className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-70 animate-signal-pulse",
                    tone === "emerald" ? "bg-emerald" : "bg-primary",
                )}
            />
            <span
                className={cn(
                    "relative inline-flex h-1.5 w-1.5 rounded-full",
                    tone === "emerald" ? "bg-emerald" : "bg-primary",
                )}
            />
        </span>
    );
}

const rows = [
    { key: "system", label: "System", value: systemStatus.system, signal: true },
    { key: "focus", label: "Current focus", value: systemStatus.focus },
    { key: "mode", label: "Mode", value: systemStatus.mode },
    { key: "location", label: "Location", value: systemStatus.location },
];

/**
 * Compact system-status layer. All values come from content/site.ts.
 */
export function StatusStrip({ className }: { className?: string }) {
    return (
        <dl
            className={cn(
                "grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4",
                className,
            )}
        >
            {rows.map((row) => (
                <div key={row.key} className="min-w-0">
                    <dt className="eyebrow text-fg-subtle">{row.label}</dt>
                    <dd className="mt-2 flex items-center gap-2 font-mono text-[0.8125rem] text-fg">
                        {row.signal && <StatusDot />}
                        <span className="truncate">{row.value}</span>
                    </dd>
                </div>
            ))}
        </dl>
    );
}
