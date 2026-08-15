import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IndexBadge } from "./IndexBadge";
import { Reveal } from "./Reveal";

/**
 * The recurring section masthead: index / label, editorial heading, optional
 * lede. Keeps rhythm and heading hierarchy consistent across the page.
 */
export function SectionHeader({
    index,
    accent,
    label,
    title,
    lede,
    align = "left",
    className,
    children,
}: {
    /** Spine number. Omit for nested chapters such as the case studies. */
    index?: string;
    /** Hue for the index badge. */
    accent?: import("@/lib/accents").Accent;
    label: string;
    title: ReactNode;
    lede?: ReactNode;
    align?: "left" | "center";
    className?: string;
    children?: ReactNode;
}) {
    const centered = align === "center";

    return (
        <div
            className={cn(
                "mb-14 md:mb-20",
                centered && "mx-auto max-w-3xl text-center",
                className,
            )}
        >
            <Reveal
                className={cn(
                    "flex items-center gap-3 text-fg-subtle",
                    centered && "justify-center",
                )}
            >
                {index && <IndexBadge value={index} accent={accent} />}
                <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
                <span className="eyebrow">{label}</span>
            </Reveal>

            {/* Title and lede sit side by side on wide screens so the masthead
                uses the full measure instead of stranding the right half. */}
            <div
                className={cn(
                    "mt-5",
                    !centered && lede && "lg:grid lg:grid-cols-12 lg:items-start lg:gap-10",
                )}
            >
                <Reveal delay={60} className={cn(!centered && lede && "lg:col-span-7")}>
                    <h2 className="display text-display-md text-etched">{title}</h2>
                </Reveal>

                {lede && (
                    <Reveal
                        delay={120}
                        // Small top offset optically aligns the lede's first line
                        // with the display title's cap height.
                        className={cn(!centered && "lg:col-span-5 lg:pt-2")}
                    >
                        <p
                            className={cn(
                                "mt-5 text-lede text-fg-muted lg:mt-0",
                                centered ? "mx-auto max-w-2xl" : "max-w-2xl lg:max-w-none",
                            )}
                        >
                            {lede}
                        </p>
                    </Reveal>
                )}
            </div>

            {children}
        </div>
    );
}
