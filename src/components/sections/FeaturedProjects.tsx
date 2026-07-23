"use client";
import { motion } from "framer-motion";
import { featuredProjects } from "@/content/projects";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
    return (
        <section id="featured-projects" className="container max-w-5xl px-4 py-24 md:py-32 border-t border-border/40">
            <div className="mb-12 md:mb-20">
                <span className="font-mono text-sm text-primary tracking-wider">05. WORK</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h2>
            </div>

            <div className="space-y-16 md:space-y-24">
                {featuredProjects.map((project, index) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
                    >
                        {/* Fake Project Cover/Image Container */}
                        <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl bg-card border overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-muted-foreground/30 text-4xl font-bold tracking-tighter">
                                {project.name.split(' ')[0]}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            <span className="text-primary font-mono text-sm mb-3">{project.category}</span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
                                {project.name}
                            </h3>
                            
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {project.metrics.map(metric => (
                                    <div key={metric.label} className="flex flex-col">
                                        <span className="text-xl font-bold text-foreground mb-1">{metric.value}</span>
                                        <span className="text-xs text-muted-foreground">{metric.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground border">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a 
                                href={project.href} 
                                className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors w-fit"
                            >
                                Read full case study
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
