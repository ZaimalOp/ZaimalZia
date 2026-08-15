/**
 * Single source of truth for identity, status, navigation and links.
 * Components must read from here rather than hardcoding strings.
 */

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://zaimal-zia-vfxr.vercel.app";

export const identity = {
    name: "Zaimal Zia",
    initials: "ZZ",
    /** Rendered as the rotating role line in the hero. */
    roles: ["AI Systems Builder", "ML Researcher", "Founder"],
    /** One-line positioning statement. */
    positioning: "Architecting AI systems from research to production.",
    summary:
        "I build end-to-end machine-learning systems and the products around them — with honest evaluation, explainability, and leakage auditing treated as engineering requirements rather than afterthoughts.",
    location: "Lahore, Pakistan",
    region: "Pakistan · PKT",
    timezone: "PKT (GMT+5)",
    education: "BS Artificial Intelligence · COMSATS",
    role: "Lead AI & ML Researcher @ Tkhex",
    email: "zaimalzia11@gmail.com",
    github: "https://github.com/ZaimalOp",
    githubHandle: "ZaimalOp",
    linkedin: "https://linkedin.com/in/zaimal-zia",
    linkedinHandle: "zaimal-zia",
} as const;

/** Compact system-status layer used by the nav, hero and footer. */
export const systemStatus = {
    system: "ONLINE",
    focus: "AI Systems",
    mode: "Building",
    location: identity.region,
    availability: "Open to exceptional opportunities",
} as const;

export const socials = [
    { label: "GitHub", href: identity.github, handle: identity.githubHandle, icon: "github" },
    { label: "LinkedIn", href: identity.linkedin, handle: identity.linkedinHandle, icon: "linkedin" },
    { label: "Email", href: `mailto:${identity.email}`, handle: identity.email, icon: "mail" },
] as const;

/** Section ids are the contract between nav, command palette and the page. */
export const sections = {
    hero: "hero",
    about: "about",
    principles: "principles",
    work: "work",
    neurofusion: "neurofusion",
    evinic: "evinic",
    lab: "lab",
    stack: "stack",
    trajectory: "trajectory",
    log: "log",
    contact: "contact",
} as const;

export type SectionId = (typeof sections)[keyof typeof sections];

export const navLinks: { id: SectionId; label: string }[] = [
    { id: sections.about, label: "About" },
    { id: sections.work, label: "Work" },
    { id: sections.lab, label: "Lab" },
    { id: sections.trajectory, label: "Timeline" },
    { id: sections.contact, label: "Contact" },
];

/** Sections the scroll-spy observes, in document order. */
export const spySections: SectionId[] = [
    sections.hero,
    sections.about,
    sections.principles,
    sections.work,
    sections.neurofusion,
    sections.evinic,
    sections.lab,
    sections.stack,
    sections.trajectory,
    sections.log,
    sections.contact,
];
