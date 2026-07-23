"use client";
import { motion } from "framer-motion";
import { professionalStatus } from "@/content/status";
import { Activity, Clock, Globe, XCircle, CheckCircle } from "lucide-react";

export function AvailabilityDashboard() {
    return (
        <section id="availability-dashboard" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-12 md:mb-16">
                <span className="font-mono text-sm text-primary tracking-wider">06. STATUS</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Availability Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Current Focus - Large Span */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-8 p-6 md:p-8 rounded-2xl bg-card border relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Activity className="w-24 h-24 text-primary group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-mono mb-4">Current Focus</h3>
                    <p className="text-xl md:text-2xl font-semibold leading-snug max-w-md relative z-10">
                        {professionalStatus.currentFocus}
                    </p>
                </motion.div>

                {/* Quick Stats - Side Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-4 flex flex-col gap-4"
                >
                    <div className="flex-1 p-6 rounded-2xl bg-secondary/50 border flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-muted-foreground mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-mono">Response Time</span>
                        </div>
                        <p className="text-lg font-semibold">{professionalStatus.responseTime}</p>
                    </div>
                    <div className="flex-1 p-6 rounded-2xl bg-secondary/50 border flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-muted-foreground mb-2">
                            <Globe className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider font-mono">Timezone</span>
                        </div>
                        <p className="text-lg font-semibold">{professionalStatus.timezone}</p>
                    </div>
                </motion.div>

                {/* Open To vs Not Interested */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-6 p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-bold">Open to Discussions</h3>
                    </div>
                    <ul className="space-y-3">
                        {professionalStatus.openTo.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/80">
                                <span className="text-primary mt-1">▹</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-6 p-6 md:p-8 rounded-2xl border bg-card"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <XCircle className="w-5 h-5 text-destructive/80" />
                        <h3 className="text-lg font-bold text-muted-foreground">Not Interested In</h3>
                    </div>
                    <ul className="space-y-3">
                        {professionalStatus.notInterestedIn.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground/80">
                                <span className="text-destructive/50 mt-1">×</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
