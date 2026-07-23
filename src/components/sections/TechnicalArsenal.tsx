"use client";
import { motion } from "framer-motion";
import { technicalArsenal } from "@/content/profile";
import { BrainCircuit, Code2, Database, Compass } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    BrainCircuit,
    Code2,
    Database,
    Compass
};

export function TechnicalArsenal() {
    return (
        <section id="technical-arsenal" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-12 md:mb-16">
                <span className="font-mono text-sm text-primary tracking-wider">02. ARSENAL</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Technical Arsenal</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technicalArsenal.map((category, index) => {
                    const Icon = iconMap[category.icon] || Code2;
                    return (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative flex flex-col p-6 rounded-2xl border bg-card/50 hover:bg-card transition-colors overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                                <Icon className="w-32 h-32" />
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold">{category.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                                {category.skills.map(skill => (
                                    <span 
                                        key={skill} 
                                        className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground border border-border/50"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
