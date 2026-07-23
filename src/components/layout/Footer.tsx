export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background py-12 md:py-16">
            <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                    <div className="font-mono text-2xl font-bold tracking-tighter">
                        ZZ<span className="text-primary">.</span>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Architecting AI-driven products from zero to production.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/ZaimalOp" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/zaimal-zia" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        LinkedIn
                    </a>
                    <a href="mailto:contact@zaimalzia.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        Email
                    </a>
                </div>
            </div>
            <div className="container px-4 md:px-6 mt-12 text-center md:text-left text-xs text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center">
                <p>© {new Date().getFullYear()} Zaimal Zia. All rights reserved.</p>
                <p className="mt-2 md:mt-0 font-mono">Built with Next.js, PyTorch & Precision.</p>
            </div>
        </footer>
    );
}
