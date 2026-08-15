"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
    ArrowRight,
    Beaker,
    BookOpen,
    Braces,
    Compass,
    FileText,
    Github,
    Home,
    Linkedin,
    Mail,
    Moon,
    Search,
    Sun,
    Waypoints,
} from "lucide-react";
import { identity, sections } from "@/content/site";
import { useCommandCenter } from "@/components/providers/CommandProvider";
import { fuzzyMatch, goToSection, goToTop } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Cmd = {
    id: string;
    label: string;
    group: "Navigation" | "Work" | "Actions" | "Elsewhere";
    keywords?: string;
    icon: React.ElementType;
    shortcut?: string;
    run: () => void;
    /** Rendered as trailing text instead of an arrow. */
    hint?: string;
};

/**
 * Gate component. The dialog itself only mounts while open, so its query and
 * cursor state reset on every open without needing an effect to clear them.
 */
export function CommandPalette() {
    const { paletteOpen } = useCommandCenter();
    if (!paletteOpen) return null;
    return <Palette />;
}

function Palette() {
    const { setPaletteOpen, setShortcutsOpen } = useCommandCenter();
    const { resolvedTheme, setTheme } = useTheme();

    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const restoreFocusTo = useRef<HTMLElement | null>(null);

    const listboxId = useId();
    const titleId = useId();

    const close = () => setPaletteOpen(false);

    const commands = useMemo<Cmd[]>(() => {
        const nav = (id: string, label: string, icon: React.ElementType, group: Cmd["group"] = "Navigation", keywords?: string): Cmd => ({
            id,
            label,
            group,
            icon,
            keywords,
            run: () => goToSection(id),
        });

        return [
            { id: "top", label: "Go home", group: "Navigation", icon: Home, shortcut: "G H", run: goToTop },
            nav(sections.about, "About", BookOpen, "Navigation", "story bio who"),
            nav(sections.principles, "How I think", Compass, "Navigation", "philosophy principles"),
            nav(sections.work, "Featured work", Waypoints, "Navigation", "projects"),
            nav(sections.stack, "Technical depth", Braces, "Navigation", "skills stack capability"),
            nav(sections.trajectory, "Timeline", ArrowRight, "Navigation", "career experience"),
            nav(sections.contact, "Contact", Mail, "Navigation", "email hire"),

            nav(sections.neurofusion, "NeuroFusion AI", Beaker, "Work", "parkinson multimodal research case study"),
            nav(
                sections.evinic,
                "Evinic",
                Beaker,
                "Work",
                "marketplace retail navigation hafeez product venture case study",
            ),
            nav(sections.lab, "Engineering archive", Beaker, "Work", "lab experiments kratos sentinel"),

            {
                id: "resume",
                label: "View resume",
                group: "Actions",
                icon: FileText,
                keywords: "cv download pdf",
                run: () => {
                    window.location.href = "/resume";
                },
            },
            {
                id: "theme",
                label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
                group: "Actions",
                icon: resolvedTheme === "dark" ? Sun : Moon,
                keywords: "theme dark light appearance toggle",
                run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
            },
            {
                id: "shortcuts",
                label: "Keyboard shortcuts",
                group: "Actions",
                icon: Braces,
                shortcut: "?",
                keywords: "keys help",
                run: () => setShortcutsOpen(true),
            },
            {
                id: "copy-email",
                label: "Copy email address",
                group: "Actions",
                icon: Mail,
                hint: identity.email,
                keywords: "mail contact clipboard",
                run: () => {
                    void navigator.clipboard?.writeText(identity.email);
                },
            },

            {
                id: "github",
                label: "GitHub",
                group: "Elsewhere",
                icon: Github,
                hint: identity.githubHandle,
                run: () => window.open(identity.github, "_blank", "noopener,noreferrer"),
            },
            {
                id: "linkedin",
                label: "LinkedIn",
                group: "Elsewhere",
                icon: Linkedin,
                hint: identity.linkedinHandle,
                run: () => window.open(identity.linkedin, "_blank", "noopener,noreferrer"),
            },
            {
                id: "email",
                label: "Send an email",
                group: "Elsewhere",
                icon: Mail,
                hint: identity.email,
                run: () => {
                    window.location.href = `mailto:${identity.email}`;
                },
            },
        ];
    }, [resolvedTheme, setTheme, setShortcutsOpen]);

    const results = useMemo(() => {
        if (!query.trim()) return commands;
        return commands.filter((c) => fuzzyMatch(query, `${c.label} ${c.keywords ?? ""} ${c.group}`));
    }, [commands, query]);

    // Group while preserving the declaration order above.
    const grouped = useMemo(() => {
        const order: Cmd["group"][] = ["Navigation", "Work", "Actions", "Elsewhere"];
        return order
            .map((group) => ({ group, items: results.filter((c) => c.group === group) }))
            .filter((g) => g.items.length > 0);
    }, [results]);

    const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

    // Take focus on mount and hand it back on unmount. Focus synchronously —
    // preventScroll stops the page jumping, and rAF would be unreliable if the
    // tab is backgrounded or frames are throttled.
    useEffect(() => {
        restoreFocusTo.current = document.activeElement as HTMLElement;
        inputRef.current?.focus({ preventScroll: true });
        return () => {
            restoreFocusTo.current?.focus?.({ preventScroll: true });
        };
    }, []);

    // Keep the highlighted row in view during keyboard traversal.
    useEffect(() => {
        const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    // Guard against a stale cursor when filtering shrinks the list.
    const safeIndex = Math.min(activeIndex, Math.max(0, flat.length - 1));

    const runAt = (index: number) => {
        const cmd = flat[index];
        if (!cmd) return;
        close();
        // Let the overlay unmount before scrolling or navigating.
        requestAnimationFrame(() => cmd.run());
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                close();
                break;
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(flat.length === 0 ? 0 : (safeIndex + 1) % flat.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(flat.length === 0 ? 0 : (safeIndex - 1 + flat.length) % flat.length);
                break;
            case "Home":
                e.preventDefault();
                setActiveIndex(0);
                break;
            case "End":
                e.preventDefault();
                setActiveIndex(Math.max(0, flat.length - 1));
                break;
            case "Enter":
                e.preventDefault();
                runAt(safeIndex);
                break;
            case "Tab":
                // Single focusable element: trap by keeping focus on the input.
                e.preventDefault();
                break;
        }
    };

    let cursor = -1;

    return (
        <div
            className="fixed inset-0 z-palette flex items-start justify-center px-4 pt-[12vh] pb-8 animate-fade-in"
            onMouseDown={close}
        >
            <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md" aria-hidden="true" />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={onKeyDown}
                className={cn(
                    "relative w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)]",
                    "border border-border-strong bg-elevated shadow-lg animate-scale-in",
                )}
            >
                <h2 id={titleId} className="sr-only">
                    Command palette
                </h2>

                <div className="flex items-center gap-3 border-b border-border px-4">
                    <Search className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        placeholder="Search sections, work and actions…"
                        aria-label="Search commands"
                        aria-controls={listboxId}
                        aria-expanded="true"
                        aria-activedescendant={flat[safeIndex] ? `cmd-${flat[safeIndex].id}` : undefined}
                        role="combobox"
                        autoComplete="off"
                        spellCheck={false}
                        className="h-14 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-fg-subtle"
                    />
                    <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                        ESC
                    </kbd>
                </div>

                <div
                    ref={listRef}
                    id={listboxId}
                    role="listbox"
                    aria-label="Commands"
                    className="max-h-[min(28rem,60vh)] overflow-y-auto overscroll-contain p-2"
                >
                    {flat.length === 0 && (
                        <p className="px-3 py-10 text-center text-sm text-fg-muted">
                            No matches for “{query}”.
                        </p>
                    )}

                    {grouped.map(({ group, items }) => (
                        <div key={group} className="mb-1 last:mb-0">
                            <div className="eyebrow px-3 pb-1.5 pt-3 text-fg-subtle">{group}</div>
                            {items.map((cmd) => {
                                cursor += 1;
                                const index = cursor;
                                const active = index === safeIndex;
                                const Icon = cmd.icon;
                                return (
                                    <div
                                        key={cmd.id}
                                        id={`cmd-${cmd.id}`}
                                        data-index={index}
                                        role="option"
                                        aria-selected={active}
                                        onMouseMove={() => setActiveIndex(index)}
                                        onClick={() => runAt(index)}
                                        className={cn(
                                            "flex cursor-pointer items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-sm",
                                            active ? "bg-primary/10 text-fg" : "text-fg-muted",
                                        )}
                                    >
                                        <Icon
                                            className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-fg-subtle")}
                                            aria-hidden="true"
                                        />
                                        <span className="min-w-0 flex-1 truncate">{cmd.label}</span>
                                        {cmd.hint && (
                                            <span className="hidden truncate font-mono text-xs text-fg-subtle sm:block">
                                                {cmd.hint}
                                            </span>
                                        )}
                                        {cmd.shortcut && (
                                            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">
                                                {cmd.shortcut}
                                            </kbd>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[10px] text-fg-subtle">
                    <span>
                        <kbd>↑</kbd> <kbd>↓</kbd> navigate · <kbd>↵</kbd> select
                    </span>
                    <span>{flat.length} commands</span>
                </div>
            </div>
        </div>
    );
}
