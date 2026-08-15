import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trajectory } from "@/content/trajectory";
import { technicalArsenal } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { experiments } from "@/content/experiments";
import { identity } from "@/content/site";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
    title: "Resume",
    description: `Resume of ${identity.name} — AI systems builder, ML researcher and founder.`,
    alternates: { canonical: "/resume" },
};

/** Section heading with the ruled underline used throughout the document. */
function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-7 break-avoid print:mt-0">
            <h2 className="doc-heading">{title}</h2>
            {children}
        </section>
    );
}

export default function ResumePage() {
    const contact = [
        identity.email,
        `github.com/${identity.githubHandle}`,
        `linkedin.com/in/${identity.linkedinHandle}`,
        identity.location,
    ];

    return (
        <div className="mx-auto w-full max-w-[46rem] px-5 py-16 print:max-w-none print:px-0 print:py-0">
            {/* Screen-only toolbar */}
            <div className="no-print mb-10 flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span className="link-underline">Back to site</span>
                </Link>
                <PrintButton />
            </div>

            <article className="resume-doc resume-sheet">
                {/* ---- Masthead ---- */}
                <header className="break-avoid border-b-2 border-fg pb-4 text-center">
                    <h1 className="text-[2rem] font-bold leading-none tracking-tight">
                        {identity.name}
                    </h1>
                    <p className="doc-meta mt-2 text-[0.9375rem]">
                        AI Systems Builder · Machine Learning Researcher · Founder
                    </p>
                    <p className="doc-meta mt-2.5 text-[0.8125rem] text-fg-muted">
                        {contact.join("  ·  ")}
                    </p>
                </header>

                {/* ---- Profile ---- */}
                <DocSection title="Profile">
                    <p className="doc-body leading-relaxed">{identity.summary}</p>
                </DocSection>

                {/* ---- Experience ---- */}
                <DocSection title="Experience">
                    <div className="space-y-5">
                        {trajectory.map((item) => (
                            <div key={`${item.role}-${item.company}`} className="break-avoid">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="text-[1rem] font-bold leading-snug">
                                        {item.role}, {item.company}
                                    </h3>
                                    <span className="doc-meta shrink-0 whitespace-nowrap">
                                        {item.period}
                                    </span>
                                </div>
                                <p className="doc-meta italic text-fg-muted">{item.location}</p>

                                <p className="doc-body mt-1.5 leading-relaxed">{item.description}</p>

                                <ul className="doc-body mt-1.5 list-disc space-y-0.5 pl-5 leading-relaxed">
                                    {item.responsibilities.map((r) => (
                                        <li key={r}>{r}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </DocSection>

                {/* ---- Projects ---- */}
                <DocSection title="Selected Projects">
                    <div className="space-y-4">
                        {featuredProjects.map((p) => (
                            <div key={p.id} className="break-avoid">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="text-[1rem] font-bold leading-snug">{p.name}</h3>
                                    <span className="doc-meta shrink-0 whitespace-nowrap">{p.kind}</span>
                                </div>
                                <p className="doc-body mt-1 leading-relaxed">{p.description}</p>
                                <p className="doc-meta mt-1">
                                    <span className="font-bold">Results: </span>
                                    {p.metrics
                                        .map((m) => `${m.label} ${m.value}${m.note ? ` (${m.note})` : ""}`)
                                        .join("; ")}
                                </p>
                                <p className="doc-meta">
                                    <span className="font-bold">Stack: </span>
                                    {p.stack.join(", ")}
                                </p>
                            </div>
                        ))}

                        {/* Archive projects: name, one-line framing and stack.
                            Full descriptions live on the site — a CV needs to
                            stay scannable and inside two pages. */}
                        {experiments.map((e) => (
                            <div key={e.id} className="break-avoid">
                                <h3 className="doc-body font-bold leading-snug">
                                    {e.name}
                                    <span className="font-normal italic"> — {e.tagline}</span>
                                </h3>
                                <p className="doc-meta">
                                    <span className="font-bold">Stack: </span>
                                    {e.stack.join(", ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </DocSection>

                {/* ---- Skills ---- */}
                <DocSection title="Technical Skills">
                    {/* Curated for a scanned document: the site shows the full
                        capability tree, a CV shows the headline set per domain. */}
                    <dl className="space-y-1.5">
                        {technicalArsenal.map((cat) => (
                            <div key={cat.category} className="doc-body flex gap-2 leading-relaxed">
                                <dt className="w-[11rem] shrink-0 font-bold">{cat.category}</dt>
                                <dd className="flex-1">{cat.skills.slice(0, 10).join(", ")}</dd>
                            </div>
                        ))}
                    </dl>
                </DocSection>

                {/* ---- Education ---- */}
                <DocSection title="Education">
                    <p className="doc-body">{identity.education}</p>
                </DocSection>
            </article>
        </div>
    );
}
