import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { identity, sections } from "@/content/site";
import { professionalStatus } from "@/content/status";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Reveal } from "@/components/ui/Reveal";
import { StatusDot } from "@/components/ui/StatusStrip";

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;

const CHANNELS = [
    { label: "GitHub", href: identity.github, handle: identity.githubHandle, icon: "github" as const, external: true },
    { label: "LinkedIn", href: identity.linkedin, handle: identity.linkedinHandle, icon: "linkedin" as const, external: true },
    { label: "Email", href: `mailto:${identity.email}`, handle: identity.email, icon: "mail" as const, external: false },
];

const PROBLEM_KINDS = [
    "An AI system",
    "An automation",
    "A product",
    "A research question",
    "An architecture",
];

export function Contact() {
    return (
        <section
            id={sections.contact}
            aria-labelledby="contact-heading"
            className="border-t border-border"
        >
            <div className="container py-28 md:py-40">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    {/* Statement */}
                    <div className="lg:col-span-7">
                        <Reveal className="flex items-center gap-3 text-fg-subtle">
                            <span className="eyebrow tabular text-primary">08</span>
                            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
                            <span className="eyebrow">Contact</span>
                        </Reveal>

                        <Reveal delay={60}>
                            <h2 id="contact-heading" className="display mt-6 text-display-lg text-etched">
                                Have a hard problem?
                            </h2>
                        </Reveal>

                        <Reveal delay={120}>
                            <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
                                {PROBLEM_KINDS.map((kind) => (
                                    <li
                                        key={kind}
                                        className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted"
                                    >
                                        {kind}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>

                        <Reveal delay={180}>
                            <p className="mt-8 max-w-lg text-lede text-fg-muted">
                                If it involves getting a model out of a notebook and into something people
                                can rely on, that is the work I want. Tell me what is breaking.
                            </p>
                        </Reveal>

                        <Reveal delay={240} className="mt-10">
                            <CopyEmail />
                        </Reveal>

                        <Reveal delay={300}>
                            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-fg-subtle">
                                <span className="inline-flex items-center gap-2">
                                    <StatusDot />
                                    Typical reply · {professionalStatus.responseTime}
                                </span>
                                <span>{identity.timezone}</span>
                            </p>
                        </Reveal>
                    </div>

                    {/* Channels + engagement fit */}
                    <div className="lg:col-span-5">
                        <Reveal delay={100}>
                            <ul className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
                                {CHANNELS.map((c) => {
                                    const Icon = ICONS[c.icon];
                                    return (
                                        <li key={c.label} className="border-b border-border last:border-b-0">
                                            <a
                                                href={c.href}
                                                {...(c.external
                                                    ? { target: "_blank", rel: "noreferrer noopener" }
                                                    : {})}
                                                className="group flex items-center gap-4 bg-surface p-5 transition-colors duration-[var(--dur)] hover:bg-surface-2"
                                            >
                                                <Icon className="h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-primary" aria-hidden="true" />
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-sm text-fg">{c.label}</span>
                                                    <span className="mt-0.5 block truncate font-mono text-[11px] text-fg-subtle">
                                                        {c.handle}
                                                    </span>
                                                </span>
                                                <ArrowUpRight
                                                    className="h-4 w-4 shrink-0 text-fg-subtle transition-all duration-[var(--dur)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Reveal>

                        <Reveal delay={180} className="mt-5 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
                            <h3 className="eyebrow text-fg-subtle">Best fit</h3>
                            <ul className="mt-4 space-y-2">
                                {professionalStatus.openTo.slice(0, 5).map((item) => (
                                    <li key={item} className="flex gap-2.5 text-[0.8125rem] text-fg-muted">
                                        <span aria-hidden="true" className="mt-2 h-px w-2.5 shrink-0 bg-emerald" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 border-t border-border pt-4 font-mono text-[11px] text-fg-subtle">
                                Availability · {professionalStatus.availability}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
