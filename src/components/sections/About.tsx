"use client";
import { motion } from "framer-motion";
import { aboutMe } from "@/content/profile";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";

export function About() {
    return (
        <section id="about" className="container max-w-5xl px-4 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <motion.div
                    className="md:col-span-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="font-mono text-sm text-primary tracking-wider">01. ABOUT</span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{aboutMe.title}</h2>
                </motion.div>

                <motion.div
                    className="md:col-span-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {aboutMe.bio}
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <MapPin className="w-4 h-4 text-primary" /> {aboutMe.location}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80">
                            <GraduationCap className="w-4 h-4 text-primary" /> {aboutMe.education}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-foreground/80 col-span-2">
                            <Sparkles className="w-4 h-4 text-primary" /> Beyond code: {aboutMe.beyondCode.join(" · ")}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}