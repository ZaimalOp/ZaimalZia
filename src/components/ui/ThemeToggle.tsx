"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = resolvedTheme === "dark" || theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
            >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </motion.div>
        </button>
    );
}