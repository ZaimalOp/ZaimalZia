"use client";
import { Command } from "cmdk";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLenis } from "@/components/providers/smooth-scroll";
import { Search, Moon, Sun, Github, Linkedin, FileDown, ArrowRight } from "lucide-react";

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const { setTheme, theme } = useTheme();
    const lenis = useLenis();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (cmd: () => void) => {
        setOpen(false);
        cmd();
    };

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            if (lenis) {
                lenis.scrollTo(el, { offset: -100 });
            } else {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted-foreground rounded-full border bg-background/50 hover:border-primary/50 transition-colors"
            >
                <Search className="w-3 h-3" /> Search
                <kbd className="ml-4 px-1.5 py-0.5 text-[10px] border rounded bg-foreground/5">⌘K</kbd>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: -10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: -10 }}
                            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
                            className="w-full max-w-xl bg-card border rounded-2xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Command loop>
                                <div className="flex items-center gap-2 px-4 border-b">
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                    <Command.Input
                                        placeholder="Type a command or search..."
                                        className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground font-mono"
                                    />
                                </div>
                                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>

                                    <Command.Group heading="Navigation" className="text-muted-foreground text-xs px-2 mb-2">
                                        {[
                                            { name: "About", id: "about" },
                                            { name: "Technical Arsenal", id: "arsenal" },
                                            { name: "Trajectory", id: "trajectory" },
                                            { name: "Availability", id: "availability" },
                                        ].map((item) => (
                                            <Command.Item
                                                key={item.id}
                                                onSelect={() => runCommand(() => scrollTo(item.id))}
                                                className="flex items-center justify-between py-2.5 px-2 rounded-lg cursor-pointer text-foreground aria-selected:bg-foreground/5"
                                            >
                                                <span className="text-sm">{item.name}</span>
                                                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                            </Command.Item>
                                        ))}
                                    </Command.Group>

                                    <Command.Group heading="Actions" className="text-muted-foreground text-xs px-2 mb-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
                                            className="flex items-center gap-3 py-2.5 px-2 rounded-lg cursor-pointer text-foreground aria-selected:bg-foreground/5"
                                        >
                                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                            <span className="text-sm">Toggle Theme</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.print())}
                                            className="flex items-center gap-3 py-2.5 px-2 rounded-lg cursor-pointer text-foreground aria-selected:bg-foreground/5"
                                        >
                                            <FileDown className="w-4 h-4" />
                                            <span className="text-sm">Download Resume</span>
                                        </Command.Item>
                                    </Command.Group>

                                    <Command.Group heading="Socials" className="text-muted-foreground text-xs px-2">
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.open("https://github.com/ZaimalOp", "_blank"))}
                                            className="flex items-center gap-3 py-2.5 px-2 rounded-lg cursor-pointer text-foreground aria-selected:bg-foreground/5"
                                        >
                                            <Github className="w-4 h-4" /> <span className="text-sm">Open GitHub</span>
                                        </Command.Item>
                                        <Command.Item
                                            onSelect={() => runCommand(() => window.open("https://linkedin.com/in/zaimal-zia", "_blank"))}
                                            className="flex items-center gap-3 py-2.5 px-2 rounded-lg cursor-pointer text-foreground aria-selected:bg-foreground/5"
                                        >
                                            <Linkedin className="w-4 h-4" /> <span className="text-sm">Open LinkedIn</span>
                                        </Command.Item>
                                    </Command.Group>
                                </Command.List>
                            </Command>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}