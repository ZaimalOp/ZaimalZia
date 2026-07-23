import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { InitialLoader } from "@/components/providers/InitialLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zaimalzia.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Zaimal Zia — AI Software Architect & Founder",
        template: "%s | Zaimal Zia",
    },
    description: "Architecting AI-driven products from zero to production. Specializing in machine learning, full-stack architecture, and scalable software systems.",
    keywords: ["AI Engineer", "Machine Learning", "Software Architect", "CTO", "Next.js", "PyTorch", "Zaimal Zia"],
    authors: [{ name: "Zaimal Zia" }],
    openGraph: {
        title: "Zaimal Zia — AI Software Architect & Founder",
        description: "Architecting AI-driven products from zero to production.",
        url: SITE_URL,
        siteName: "Zaimal Zia",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Zaimal Zia — AI Software Architect & Founder",
        description: "Architecting AI-driven products from zero to production.",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Zaimal Zia",
                            url: SITE_URL,
                            jobTitle: "AI Software Architect",
                            knowsAbout: ["Machine Learning", "Artificial Intelligence", "Software Architecture", "PyTorch"],
                            alumniOf: "COMSATS University Islamabad",
                        }),
                    }}
                />
            </head>
            <body className="min-h-screen bg-background font-sans text-foreground">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-md">
                    Skip to content
                </a>

                <ThemeProvider>
                    <InitialLoader />
                    <ScrollProgress />
                    <SmoothScroll>
                        <Navbar />
                        <main id="main-content" className="flex min-h-screen flex-col bg-background">
                            {children}
                        </main>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}