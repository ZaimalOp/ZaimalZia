"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="container max-w-5xl px-4 py-32 md:py-48 border-t border-border/40 text-center flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
            >
                <span className="font-mono text-sm text-primary tracking-wider mb-4 block">07. WHAT&apos;S NEXT?</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Let&apos;s Build Together</h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    Whether you have a question, a proposal for a greenfield AI project, or just want to say hi, I&apos;ll try my best to get back to you.
                </p>

                <a 
                    href="mailto:contact@zaimalzia.com" 
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                >
                    <Mail className="w-5 h-5" />
                    Say Hello
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>
        </section>
    );
}
