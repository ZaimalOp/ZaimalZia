"use client";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { sections } from "@/content/site";
import { goToSection, goToTop } from "@/lib/navigation";

interface CommandContextValue {
    paletteOpen: boolean;
    setPaletteOpen: (open: boolean) => void;
    shortcutsOpen: boolean;
    setShortcutsOpen: (open: boolean) => void;
    /** Transient hint shown when a `g` chord is armed. */
    chord: string | null;
}

const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommandCenter() {
    const ctx = useContext(CommandContext);
    if (!ctx) throw new Error("useCommandCenter must be used inside CommandProvider");
    return ctx;
}

/** `g` then a key jumps to a section, Vim/Linear style. */
const GOTO_CHORDS: Record<string, string> = {
    h: "top",
    a: sections.about,
    p: sections.work,
    w: sections.work,
    l: sections.lab,
    t: sections.trajectory,
    c: sections.contact,
};

function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
    );
}

/**
 * Owns every global keyboard affordance so there is exactly one document
 * listener rather than one per component.
 */
export function CommandProvider({ children }: { children: ReactNode }) {
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [shortcutsOpen, setShortcutsOpen] = useState(false);
    const [chord, setChord] = useState<string | null>(null);
    const chordTimer = useRef<ReturnType<typeof setTimeout>>();

    const clearChord = useCallback(() => {
        clearTimeout(chordTimer.current);
        setChord(null);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;

            // Cmd/Ctrl+K always works, including from inside the palette input.
            if (mod && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setShortcutsOpen(false);
                setPaletteOpen((v) => !v);
                return;
            }

            // Everything below is a bare key: never steal it while typing.
            if (isTypingTarget(e.target) || mod || e.altKey) return;

            if (e.key === "?") {
                e.preventDefault();
                setPaletteOpen(false);
                setShortcutsOpen((v) => !v);
                return;
            }

            if (chord === "g") {
                const dest = GOTO_CHORDS[e.key.toLowerCase()];
                clearChord();
                if (dest) {
                    e.preventDefault();
                    if (dest === "top") goToTop();
                    else goToSection(dest);
                }
                return;
            }

            if (e.key.toLowerCase() === "g") {
                setChord("g");
                clearTimeout(chordTimer.current);
                // Chord expires so a stray `g` does not swallow the next keypress.
                chordTimer.current = setTimeout(() => setChord(null), 1600);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            clearTimeout(chordTimer.current);
        };
    }, [chord, clearChord]);

    // Lock the page behind any open overlay, compensating for scrollbar width.
    useEffect(() => {
        const locked = paletteOpen || shortcutsOpen;
        if (!locked) return;

        const { body } = document;
        const prevOverflow = body.style.overflow;
        const prevPad = body.style.paddingRight;
        const gap = window.innerWidth - document.documentElement.clientWidth;

        body.style.overflow = "hidden";
        if (gap > 0) body.style.paddingRight = `${gap}px`;

        return () => {
            body.style.overflow = prevOverflow;
            body.style.paddingRight = prevPad;
        };
    }, [paletteOpen, shortcutsOpen]);

    const value = useMemo(
        () => ({ paletteOpen, setPaletteOpen, shortcutsOpen, setShortcutsOpen, chord }),
        [paletteOpen, shortcutsOpen, chord],
    );

    return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>;
}
