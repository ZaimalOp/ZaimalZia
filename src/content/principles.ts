/**
 * Engineering philosophy. Each principle is tied to evidence that already
 * exists elsewhere in this site — no claim here is unsupported by the work.
 */

export interface Principle {
    id: string;
    index: string;
    title: string;
    body: string;
    /** Where this principle shows up in the actual work. */
    evidence: string;
}

export const principles: Principle[] = [
    {
        id: "evidence",
        index: "01",
        title: "Evidence over hype",
        body: "A number is only worth reporting if the protocol that produced it survives scrutiny. I report what the evaluation actually supports, with the dataset and the split it came from attached.",
        evidence: "NeuroFusion metrics are published as approximate, subject-level AUC with the dataset named.",
    },
    {
        id: "systems",
        index: "02",
        title: "Systems over demos",
        body: "A notebook that works once is not a result. I build the contract, the fallback path and the composition layer so the pieces keep working when one of them is missing.",
        evidence: "A shared module contract lets five modalities compose, with graceful fallback when inputs are absent.",
    },
    {
        id: "explainability",
        index: "03",
        title: "Explainability over black boxes",
        body: "If a model informs a decision about a person, someone has to be able to ask why. Interpretability is designed in at the model layer, not bolted on for a slide.",
        evidence: "Grad-CAM on the gait model; feature importance standardised across every modality.",
    },
    {
        id: "leakage",
        index: "04",
        title: "Assume leakage until proven otherwise",
        body: "Most surprisingly good results are bugs. I write sanity assertions whose job is to fail, and I treat a suspiciously high score as a defect report rather than a milestone.",
        evidence: "Assertions caught a label-inversion bug and a recording-length confound before they reached results.",
    },
    {
        id: "product",
        index: "05",
        title: "Product before technology",
        body: "The interesting architecture is the one the user will actually reach. Constraints from the market — cash economies, WhatsApp habits, low trust — decide the stack, not the other way round.",
        evidence: "Evinic is WhatsApp-native because that is where the market already transacts.",
    },
    {
        id: "ship",
        index: "06",
        title: "Ship, then measure honestly",
        body: "Shipping is how a hypothesis becomes data. Staging features behind evidence gates keeps the roadmap tied to demand instead of ambition.",
        evidence: "Evidence-gated feature staging and gate-based KPIs in the Evinic masterplan.",
    },
];
