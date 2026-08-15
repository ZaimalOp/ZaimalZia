import type { Config } from "tailwindcss";

/**
 * Every colour maps to a CSS variable defined in globals.css so that the
 * light/dark systems can diverge deliberately instead of being inverted.
 */
const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}",
        "./src/content/**/*.{ts,tsx}",
        // src/lib/accents.ts holds the palette class strings. Without this glob
        // Tailwind never sees them and silently generates none of those rules.
        "./src/lib/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
            screens: { "2xl": "1320px" },
        },
        extend: {
            colors: {
                bg: "hsl(var(--bg) / <alpha-value>)",
                "bg-deep": "hsl(var(--bg-deep) / <alpha-value>)",
                surface: "hsl(var(--surface) / <alpha-value>)",
                "surface-2": "hsl(var(--surface-2) / <alpha-value>)",
                elevated: "hsl(var(--elevated) / <alpha-value>)",

                fg: "hsl(var(--fg) / <alpha-value>)",
                "fg-muted": "hsl(var(--fg-muted) / <alpha-value>)",
                "fg-subtle": "hsl(var(--fg-subtle) / <alpha-value>)",

                border: "hsl(var(--border) / <alpha-value>)",
                "border-strong": "hsl(var(--border-strong) / <alpha-value>)",

                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    fg: "hsl(var(--primary-fg) / <alpha-value>)",
                    soft: "hsl(var(--primary-soft) / <alpha-value>)",
                },

                // Vivid variants for graphics; `-ink` for small text (see globals.css)
                emerald: {
                    DEFAULT: "hsl(var(--signal-emerald) / <alpha-value>)",
                    ink: "hsl(var(--signal-emerald-ink) / <alpha-value>)",
                },
                amber: {
                    DEFAULT: "hsl(var(--signal-amber) / <alpha-value>)",
                    ink: "hsl(var(--signal-amber-ink) / <alpha-value>)",
                },
                rose: {
                    DEFAULT: "hsl(var(--signal-rose) / <alpha-value>)",
                    ink: "hsl(var(--signal-rose-ink) / <alpha-value>)",
                },
                violet: {
                    DEFAULT: "hsl(var(--signal-violet) / <alpha-value>)",
                    ink: "hsl(var(--signal-violet-ink) / <alpha-value>)",
                },
                cyan: {
                    DEFAULT: "hsl(var(--signal-cyan) / <alpha-value>)",
                    ink: "hsl(var(--signal-cyan-ink) / <alpha-value>)",
                },

                ring: "hsl(var(--ring) / <alpha-value>)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                DEFAULT: "var(--radius)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                DEFAULT: "var(--shadow)",
                lg: "var(--shadow-lg)",
            },
            fontFamily: {
                // Provided by the `geist` package via GeistSans/GeistMono .variable
                sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            fontSize: {
                // Fluid editorial scale — no viewport jumps between breakpoints.
                // Tracking tightens as size grows, which is how optical sizing
                // works: large type needs negative tracking to stay cohesive.
                "display-xl": ["clamp(2.75rem, 1.2rem + 7.4vw, 7.5rem)", { lineHeight: "0.9", letterSpacing: "-0.042em" }],
                "display-lg": ["clamp(2.25rem, 1.1rem + 5.2vw, 5rem)", { lineHeight: "0.94", letterSpacing: "-0.036em" }],
                "display-md": ["clamp(1.875rem, 1.15rem + 3.1vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
                "display-sm": ["clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem)", { lineHeight: "1.14", letterSpacing: "-0.022em" }],
                lede: ["clamp(1.0625rem, 0.98rem + 0.42vw, 1.3125rem)", { lineHeight: "1.62", letterSpacing: "-0.011em" }],
            },
            transitionTimingFunction: {
                out: "var(--ease-out)",
                "in-out": "var(--ease-in-out)",
            },
            zIndex: {
                nav: "50",
                overlay: "80",
                palette: "100",
                boot: "120",
            },
            keyframes: {
                "signal-pulse": {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.55", transform: "scale(0.86)" },
                },
                "flow-dash": {
                    to: { strokeDashoffset: "-24" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "scale-in": {
                    from: { opacity: "0", transform: "translateY(-6px) scale(0.97)" },
                    to: { opacity: "1", transform: "translateY(0) scale(1)" },
                },
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "signal-pulse": "signal-pulse 2.4s var(--ease-in-out) infinite",
                "flow-dash": "flow-dash 1s linear infinite",
                "fade-in": "fade-in var(--dur) var(--ease-out) both",
                "scale-in": "scale-in 180ms var(--ease-out) both",
                marquee: "marquee 42s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;
