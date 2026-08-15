import { identity, SITE_URL } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import { experiments } from "@/content/experiments";
import { technicalArsenal } from "@/content/profile";
import { trajectory } from "@/content/trajectory";

/**
 * Person + WebSite + CreativeWork graph.
 * Only facts already stated on the page are emitted — no invented awards,
 * ratings, employment claims or publication records.
 */
export function StructuredData() {
    const personId = `${SITE_URL}/#person`;
    const siteId = `${SITE_URL}/#website`;

    const graph = [
        {
            "@type": "Person",
            "@id": personId,
            name: identity.name,
            url: SITE_URL,
            email: `mailto:${identity.email}`,
            jobTitle: "AI Systems Builder & ML Researcher",
            description: identity.summary,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "PK",
            },
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "COMSATS University Islamabad",
            },
            worksFor: {
                "@type": "Organization",
                name: trajectory[0].company,
            },
            knowsAbout: technicalArsenal.flatMap((c) => c.skills).slice(0, 24),
            sameAs: [identity.github, identity.linkedin],
        },
        {
            "@type": "WebSite",
            "@id": siteId,
            url: SITE_URL,
            name: `${identity.name} — Portfolio`,
            inLanguage: "en",
            publisher: { "@id": personId },
            about: { "@id": personId },
        },
        ...featuredProjects.map((p) => ({
            "@type": "CreativeWork",
            "@id": `${SITE_URL}/#${p.id}`,
            name: p.name,
            description: p.description,
            url: `${SITE_URL}/${p.href}`,
            creator: { "@id": personId },
            keywords: p.stack.join(", "),
            isPartOf: { "@id": siteId },
        })),
        ...experiments.map((e) => ({
            "@type": "SoftwareSourceCode",
            "@id": `${SITE_URL}/#${e.id}`,
            name: e.name,
            description: e.description,
            codeRepository: e.url,
            programmingLanguage: e.stack.join(", "),
            author: { "@id": personId },
        })),
    ];

    return (
        <script
            type="application/ld+json"
            // Static, developer-authored content — no user input reaches this string.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
            }}
        />
    );
}
