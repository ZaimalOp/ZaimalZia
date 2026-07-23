"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/providers/smooth-scroll";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
    { id: "about", label: "About" },
    { id: "technical-arsenal", label: "Arsenal" },
    { id: "trajectory", label: "Trajectory" },
    { id: "featured-projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            if (lenis) {
                lenis.scrollTo(el, { offset: -80 });
            } else {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-background/70 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
                <div 
                    className="font-mono text-xl font-bold tracking-tighter cursor-pointer"
                    onClick={() => {
                        if (lenis) lenis.scrollTo(0);
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    ZZ<span className="text-primary">.</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="w-px h-4 bg-border mx-2" />
                    <ThemeToggle />
                </nav>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-lg border-b overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-6 gap-6">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollTo(link.id)}
                                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
