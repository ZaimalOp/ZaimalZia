"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * No `mounted` flag and no theme-dependent markup: both icons and both labels
 * are rendered, and CSS picks one from the `dark` class on <html>. That keeps
 * the server and client trees identical, so there is nothing to mismatch.
 */
export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] text-fg-muted transition-colors duration-[var(--dur)] hover:bg-fg/[0.06] hover:text-fg"
        >
            <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
            <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />

            {/* Accessible name, swapped by the same CSS */}
            <span className="sr-only dark:hidden">Switch to dark theme</span>
            <span className="sr-only hidden dark:inline">Switch to light theme</span>
        </button>
    );
}
