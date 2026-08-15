import { identity, systemStatus } from "@/content/site";
import { StatusDot } from "@/components/ui/StatusStrip";

const LINKS = [
    { label: "GitHub", href: identity.github, external: true },
    { label: "LinkedIn", href: identity.linkedin, external: true },
    { label: "Email", href: `mailto:${identity.email}`, external: false },
    { label: "Resume", href: "/resume", external: false },
];

export function Footer() {
    return (
        <footer className="no-print border-t border-border bg-bg-deep/50">
            <div className="container py-14">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="font-mono text-sm tracking-[0.16em] text-fg">ZAIMAL ZIA</p>
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                            AI systems · Research · Products
                        </p>
                        <p className="mt-1.5 font-mono text-[11px] text-fg-subtle">{identity.region}</p>
                    </div>

                    <nav aria-label="Footer">
                        {/* Generous vertical padding keeps these comfortable touch targets */}
                        <ul className="-my-2 flex flex-wrap gap-x-6">
                            {LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        {...(link.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                                        className="link-underline inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors hover:text-fg"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-[11px] text-fg-subtle">
                        © {new Date().getFullYear()} {identity.name}
                    </p>

                    <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                        <StatusDot />
                        System {systemStatus.system} · Press{" "}
                        <kbd className="rounded border border-border px-1 py-0.5 text-[10px] text-fg-muted">?</kbd>{" "}
                        for shortcuts
                    </p>
                </div>
            </div>
        </footer>
    );
}
