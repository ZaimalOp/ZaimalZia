"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { identity, navLinks, spySections, systemStatus } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useIsMac } from "@/hooks/useReducedMotion";
import { useCommandCenter } from "@/components/providers/CommandProvider";
import { StatusDot } from "@/components/ui/StatusStrip";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { goToSection, goToTop } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const active = useActiveSection(spySections);
    const { setPaletteOpen } = useCommandCenter();

    const panelRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const mac = useIsMac();

    // Passive scroll listener; state only flips when the threshold is crossed.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        // Catch a restored scroll position without setting state during the effect.
        const id = requestAnimationFrame(onScroll);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Close the mobile sheet on Escape or when the viewport grows.
    useEffect(() => {
        if (!mobileOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileOpen(false);
                toggleRef.current?.focus();
            }
        };
        const mq = window.matchMedia("(min-width: 768px)");
        const onChange = () => mq.matches && setMobileOpen(false);

        document.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);
        return () => {
            document.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, [mobileOpen]);

    // Lock scroll behind the mobile sheet.
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    const jump = (id: string) => {
        setMobileOpen(false);
        goToSection(id);
    };

    /** Work sub-sections should keep the Work tab lit. */
    const isActive = (id: string) => {
        if (id === "work") return ["work", "neurofusion", "evinic"].includes(active);
        if (id === "lab") return ["lab", "stack"].includes(active);
        if (id === "about") return ["about", "principles"].includes(active);
        if (id === "trajectory") return ["trajectory", "log"].includes(active);
        return active === id;
    };

    return (
        <>
            {/* Dims the page behind the mobile sheet. It must sit OUTSIDE the
                header: the header's backdrop-filter makes it a containing block
                for fixed descendants, which would size this to the header. */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 cursor-default bg-bg-deep/80 backdrop-blur-sm md:hidden"
                />
            )}

            <header
                className={cn(
                    "no-print fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,backdrop-filter] duration-[var(--dur)] ease-out",
                scrolled || mobileOpen
                    ? "border-b border-border bg-bg/80 backdrop-blur-xl"
                    : "border-b border-transparent bg-transparent",
            )}
            style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
            <div
                className={cn(
                    "container flex items-center justify-between transition-[height] duration-[var(--dur)] ease-out",
                    scrolled ? "h-[3.25rem]" : "h-[3.75rem] md:h-[4.5rem]",
                )}
            >
                {/* Wordmark */}
                <button
                    type="button"
                    onClick={goToTop}
                    className="group flex shrink-0 items-center gap-2.5 rounded-[var(--radius-sm)]"
                    aria-label={`${identity.name} — back to top`}
                >
                    <span
                        aria-hidden="true"
                        className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] border border-border-strong bg-surface font-mono text-[11px] font-semibold text-primary transition-colors duration-[var(--dur)] group-hover:border-primary/60"
                    >
                        {identity.initials}
                    </span>
                    <span
                        className={cn(
                            "hidden font-mono text-[0.8125rem] tracking-[0.16em] text-fg transition-opacity duration-[var(--dur)] sm:block",
                            scrolled && "md:opacity-0 md:pointer-events-none",
                        )}
                    >
                        ZAIMAL ZIA
                    </span>
                </button>

                {/* Desktop links */}
                <nav aria-label="Sections" className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {navLinks.map((link) => {
                            const on = isActive(link.id);
                            return (
                                <li key={link.id}>
                                    <button
                                        type="button"
                                        onClick={() => jump(link.id)}
                                        aria-current={on ? "true" : undefined}
                                        className={cn(
                                            "relative rounded-[var(--radius-sm)] px-3 py-2 text-[0.8125rem] transition-colors duration-[var(--dur)]",
                                            on ? "text-fg" : "text-fg-muted hover:text-fg",
                                        )}
                                    >
                                        {link.label}
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                "absolute inset-x-3 -bottom-px h-px origin-center bg-primary transition-transform duration-[var(--dur)] ease-out",
                                                on ? "scale-x-100" : "scale-x-0",
                                            )}
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Right rail */}
                <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted lg:inline-flex">
                        <StatusDot />
                        {systemStatus.system}
                    </span>

                    <button
                        type="button"
                        onClick={() => setPaletteOpen(true)}
                        className="hidden items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-surface/60 py-1.5 pl-2.5 pr-2 text-xs text-fg-muted transition-colors duration-[var(--dur)] hover:border-primary/50 hover:text-fg sm:inline-flex"
                        aria-label="Open command palette"
                    >
                        <span className="font-mono">Search</span>
                        <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px]">
                            {mac ? "⌘" : "Ctrl"} K
                        </kbd>
                    </button>

                    <ThemeToggle />

                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] text-fg md:hidden"
                    >
                        {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {/* Mobile sheet */}
            <div
                id="mobile-nav"
                ref={panelRef}
                hidden={!mobileOpen}
                className="relative border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
            >
                <nav aria-label="Sections" className="container py-4">
                    <ul className="flex flex-col">
                        {navLinks.map((link) => {
                            const on = isActive(link.id);
                            return (
                                <li key={link.id}>
                                    <button
                                        type="button"
                                        onClick={() => jump(link.id)}
                                        aria-current={on ? "true" : undefined}
                                        className={cn(
                                            "flex w-full items-center justify-between border-b border-border py-4 text-left text-base transition-colors",
                                            on ? "text-primary" : "text-fg",
                                        )}
                                    >
                                        {link.label}
                                        <span className="font-mono text-[10px] text-fg-subtle">
                                            {String(navLinks.indexOf(link) + 1).padStart(2, "0")}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center justify-between pt-5">
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">
                            <StatusDot />
                            {systemStatus.system} · {systemStatus.mode}
                        </span>
                        <a
                            href={`mailto:${identity.email}`}
                            className="font-mono text-xs text-primary link-underline"
                        >
                            Email
                        </a>
                    </div>
                </nav>
            </div>
            </header>
        </>
    );
}
