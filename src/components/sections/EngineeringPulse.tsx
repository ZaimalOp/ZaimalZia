"use client";
import { motion } from "framer-motion";
import { engineeringPulse } from "@/content/profile";
import { Github, FolderGit2 } from "lucide-react";

export function EngineeringPulse() {
    return (
        <section id="engineering-pulse" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                <div>
                    <span className="font-mono text-sm text-primary tracking-wider">03. OPEN SOURCE</span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Engineering Pulse</h2>
                </div>
                <a 
                    href="https://github.com/ZaimalOp" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                    View all repositories <Github className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {engineeringPulse.map((repo, index) => (
                    <motion.a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        key={repo.name}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex flex-col p-6 rounded-2xl border bg-card/50 hover:border-primary/50 transition-colors h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <FolderGit2 className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                            <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">{repo.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                            {repo.description}
                        </p>
                        <div className="flex items-center gap-4 mt-auto text-xs font-mono text-muted-foreground">
                            {repo.tech.map(t => (
                                <span key={t} className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary/50" /> {t}
                                </span>
                            ))}
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
