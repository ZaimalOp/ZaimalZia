import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { identity, SITE_URL } from "@/content/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandProvider } from "@/components/providers/CommandProvider";
import { BootSequence } from "@/components/providers/BootSequence";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsDialog } from "@/components/ui/ShortcutsDialog";
import { StructuredData } from "@/components/seo/StructuredData";

const TITLE = `${identity.name} — AI Systems Builder, ML Researcher & Founder`;
const DESCRIPTION =
    "Zaimal Zia architects AI systems from research to production — multi-modal machine learning with honest evaluation and explainability, and the products built around them.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: `%s — ${identity.name}` },
    description: DESCRIPTION,
    applicationName: `${identity.name} — Portfolio`,
    keywords: [
        "Zaimal Zia",
        "AI systems builder",
        "machine learning researcher",
        "multi-modal machine learning",
        "explainable AI",
        "software architect",
        "PyTorch",
        "Next.js",
        "founder",
    ],
    authors: [{ name: identity.name, url: SITE_URL }],
    creator: identity.name,
    publisher: identity.name,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        siteName: identity.name,
        url: SITE_URL,
        title: TITLE,
        description: DESCRIPTION,
        locale: "en_US",
        images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        creator: `@${identity.githubHandle}`,
        images: ["/og.png"],
    },
    icons: {
        icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
        apple: [{ url: "/icon.png", sizes: "512x512" }],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    category: "technology",
    formatDetection: { telephone: false },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
        { media: "(prefers-color-scheme: dark)", color: "#05070d" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-bg font-sans text-fg">
                <StructuredData />

                <a
                    href="#main"
                    className="sr-only rounded-[var(--radius)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-boot focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:text-primary-fg"
                >
                    Skip to content
                </a>

                <ThemeProvider>
                    <CommandProvider>
                        <BootSequence />
                        <ScrollProgress />
                        <Navbar />

                        <main id="main">{children}</main>

                        <Footer />

                        <CommandPalette />
                        <ShortcutsDialog />
                    </CommandProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
