"use client";
import { motion } from "framer-motion";
import { trajectory } from "@/content/trajectory";

export function Trajectory() {
    return (
        <section id="trajectory" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-16 md:mb-24">
                <span className="font-mono text-sm text-primary tracking-wider">04. TIMELINE</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Career Trajectory</h2>
            </div>

            <div className="relative border-l border-border/50 ml-4 md:ml-6 space-y-16">
                {trajectory.map((item, index) => (
                    <motion.div
                        key={item.role + item.company}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative pl-8 md:pl-12"
                    >
                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />

                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2 md:gap-4">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                {item.role} <span className="text-primary">@ {item.company}</span>
                            </h3>
                            <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                                {item.period}
                            </span>
                        </div>

                        <div className="text-sm text-muted-foreground mb-4">
                            {item.location}
                        </div>

                        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs font-medium rounded bg-secondary text-secondary-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
