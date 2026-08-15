/**
 * Editorial About section. Four movements, read top to bottom in ~25 seconds.
 * Content is a rewrite of the existing bio — no new biographical claims.
 */

export interface NarrativeBeat {
    key: string;
    label: string;
    heading: string;
    body: string;
}

export const narrative: NarrativeBeat[] = [
    {
        key: "who",
        label: "Who I am",
        // Must not restate the section title ("A researcher who ships.") —
        // they render a few centimetres apart.
        heading: "Building the model, and owning the outcome.",
        body: "I lead AI/ML research at Tkhex, and in parallel I found and run my own ventures. That means I have had to answer for both the model and the business it sits inside.",
    },
    {
        key: "what",
        label: "What I build",
        heading: "End-to-end machine-learning systems, and the products around them.",
        body: "Multi-modal screening pipelines with calibrated outputs and a fusion layer. Two-sided marketplaces built for a cash economy. Computer-vision and browser-graphics systems when the problem calls for them.",
    },
    {
        key: "how",
        label: "How I think",
        heading: "Protocol first, then the model.",
        body: "Subject-grouped and nested cross-validation, probability calibration, and assertions written specifically to catch my own mistakes. I would rather publish a defensible 0.84 than an inflated 0.97 I cannot account for.",
    },
    {
        key: "why",
        label: "Why I build",
        heading: "Because the gap between a working model and a usable system is where the value is.",
        body: "Plenty of models work in a notebook. Very few survive missing inputs, unfamiliar subjects and real users. Closing that gap is the part of the job I find worth doing.",
    },
];

/** Short factual chips rendered beside the narrative. */
export const beyondCode = ["Cricket", "Early-morning gym"];
