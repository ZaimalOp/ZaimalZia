"use client";
import { motion } from "framer-motion";
import { neurofusionCaseStudy } from "@/content/neurofusion";
import { CheckCircle2, Cpu, Database, Activity, GitMerge } from "lucide-react";

export function NeuroFusionCaseStudy() {
    return (
        <section id="neurofusion-case-study" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-mono mb-6">
                    CASE STUDY 01
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    {neurofusionCaseStudy.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                    {neurofusionCaseStudy.subtitle}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-foreground bg-secondary px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {neurofusionCaseStudy.status}
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
                        {neurofusionCaseStudy.problem}
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
                        {neurofusionCaseStudy.solution}
                    </p>
                </motion.div>
            </div>

            {/* Modalities Bento Grid */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-8 text-center">Multi-Modal Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {neurofusionCaseStudy.modalities.map((modality, i) => (
                        <motion.div
                            key={modality.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-md text-primary">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold">{modality.name}</h4>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Architecture</span>
                                    <span className="font-medium">{modality.architecture}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Dataset</span>
                                    <span className="font-medium">{modality.dataset}</span>
                                </div>
                                <div className="pt-2 border-t border-border/50">
                                    <span className="text-primary font-mono">{modality.metric}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Fusion Layer Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="p-6 rounded-2xl bg-primary text-primary-foreground border-transparent flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <GitMerge className="w-6 h-6" />
                            <h4 className="text-lg font-bold">Fusion Layer</h4>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {neurofusionCaseStudy.fusionLayer}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Engineering Rigor */}
            <div>
                <h3 className="text-2xl font-bold mb-8 text-center">Engineering Rigor</h3>
                <div className="space-y-6">
                    {neurofusionCaseStudy.engineeringRigor.map((rigor, i) => (
                        <motion.div
                            key={rigor.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-6 md:p-8 rounded-2xl bg-secondary/50 border flex flex-col md:flex-row gap-6 items-start"
                        >
                            <div className="p-3 bg-background rounded-xl shadow-sm shrink-0">
                                <Cpu className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">{rigor.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    {rigor.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-16 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
                <p className="mb-2">{neurofusionCaseStudy.infrastructure}</p>
                <p>{neurofusionCaseStudy.roadmap}</p>
            </div>
        </section>
    );
}
