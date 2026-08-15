"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            // Suppresses the colour-transition flash while every token swaps.
            disableTransitionOnChange
            storageKey="zz-theme"
        >
            {children}
        </NextThemesProvider>
    );
}
