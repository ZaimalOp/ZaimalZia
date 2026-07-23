"use client";
import { motion } from "framer-motion";
import { hafeezCaseStudy } from "@/content/hafeez";
import { CheckCircle2, Layers, ShieldCheck, Smartphone } from "lucide-react";

export function HafeezCaseStudy() {
    return (
        <section id="hafeez-case-study" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-mono mb-6">
                    CASE STUDY 02
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    {hafeezCaseStudy.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                    {hafeezCaseStudy.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-foreground bg-secondary px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {hafeezCaseStudy.status}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {hafeezCaseStudy.problem}
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-4">The Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {hafeezCaseStudy.solution}
                    </p>
                </motion.div>
            </div>

            {/* Architecture Section */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-8 text-center">System Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hafeezCaseStudy.architecture.map((arch, i) => (
                        <motion.div
                            key={arch.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-card border"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                {i === 0 ? <Smartphone className="w-5 h-5" /> : i === 1 ? <Layers className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                            </div>
                            <h4 className="text-lg font-bold mb-3">{arch.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {arch.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Product Strategy */}
            <div>
                <h3 className="text-2xl font-bold mb-8 text-center">Product Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hafeezCaseStudy.productStrategy.map((strategy, i) => (
                        <motion.div
                            key={strategy.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-secondary/50 border hover:bg-secondary transition-colors"
                        >
                            <h4 className="text-md font-bold mb-3 text-foreground">{strategy.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {strategy.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-2">
                {hafeezCaseStudy.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-background border text-muted-foreground">
                        {tech}
                    </span>
                ))}
            </div>
        </section>
    );
}
