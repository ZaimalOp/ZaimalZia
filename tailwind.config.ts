import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                card: "hsl(var(--card) / <alpha-value>)",
                primary: "hsl(var(--primary) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",
                muted: "hsl(var(--muted) / <alpha-value>)",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            keyframes: {
                "pulse-amber": {
                    "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 hsl(25 95% 60% / 0.7)" },
                    "50%": { opacity: "0.8", boxShadow: "0 0 0 8px hsl(25 95% 60% / 0)" },
                },
            },
            animation: {
                "pulse-amber": "pulse-amber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;