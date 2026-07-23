"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';
        
        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
                >
                    <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest uppercase">
                        Initializing
                    </div>
                    <div className="flex items-center gap-2">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                        />
                        <div className="font-mono text-2xl font-bold tracking-tighter">
                            ZZ<span className="text-primary">.</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
