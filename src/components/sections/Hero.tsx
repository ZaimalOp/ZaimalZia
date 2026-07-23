"use client";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    <motion.div
                        className="md:col-span-7"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-6 text-xs text-muted-foreground font-mono bg-background/50 backdrop-blur">
                            <span className="text-primary">●</span> Lead AI & ML Researcher @ Tkhex
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gradient">
                            Architecting AI-driven products from zero to production.
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                            I design, architect, and build production-grade machine learning systems and full-stack applications. Currently scaling multi-modal AI and leading technical execution at Tkhex.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a href="#featured-projects" className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-background bg-foreground rounded-md hover:bg-primary transition-colors duration-300">
                                Explore Ventures
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a href="/resume" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground border rounded-md hover:bg-foreground/5 transition-colors duration-300">
                                Download Resume
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hidden md:block md:col-span-5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative aspect-square rounded-2xl border bg-card/50 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                            <div className="relative font-mono text-xs text-muted-foreground space-y-1 text-left p-4 w-full">
                                <div className="text-primary">&gt; INITIALIZING_SYSTEM...</div>
                                <div>&gt; LOADING_MODALITIES: [VOICE, GAIT, TREMOR]</div>
                                <div>&gt; MODEL_STATUS: ACTIVE</div>
                                <div>&gt; AUC_SCORE: 0.88</div>
                                <div className="text-primary">&gt; READY_FOR_INFERENCE.</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}