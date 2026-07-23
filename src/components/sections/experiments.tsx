"use client";
import { motion } from "framer-motion";
import { experiments } from "@/content/experiments";
import { ArrowUpRight, Cpu, Brain, Database } from "lucide-react";
import { EASE } from "@/lib/motion";

export function Experiments() {
    return (
        <section id="archive" className="container max-w-5xl px-4 py-24 md:py-32">
            <div className="mb-12 flex flex-col items-center text-center">
                <span className="font-mono text-sm text-primary tracking-wider">07. ENGINEERING ARCHIVE</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Technical Experiments & Systems</h2>
                <p className="mt-4 text-muted-foreground max-w-xl">A collection of specialized ML models, computer vision pipelines, and browser-engineered simulations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiments.map((project, index) => (
                    <motion.a
                        key={project.name}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col rounded-2xl border bg-card p-6 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                    >
                        {/* Ambient hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    {/* Dynamic icons based on index */}
                                    {index === 0 && <Cpu className="w-5 h-5 text-primary" />}
                                    {index === 1 && <Brain className="w-5 h-5 text-primary" />}
                                    {index === 2 && <Database className="w-5 h-5 text-primary" />}
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                            <p className="text-xs text-primary mt-1 font-mono">{project.tagline}</p>
                            <p className="text-xs text-muted-foreground mt-1 mb-4">{project.category}</p>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                                {project.description}
                            </p>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 mb-4">
                                {project.metrics.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="text-sm font-bold text-foreground font-mono">{metric.value}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1 truncate">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Stack */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-background border border-border text-muted-foreground font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}