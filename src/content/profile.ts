import { identity } from "./site";
import { stackTree } from "./stack";

export const aboutMe = {
    title: "AI Systems Builder & Founder",
    bio: identity.summary,
    location: identity.location,
    education: identity.education,
    beyondCode: ["Cricket", "Early-morning gym"],
};

/**
 * Flat skill list for the resume route and structured data, derived from the
 * capability tree so the two can never drift apart. Edit ./stack.ts only.
 */
export const technicalArsenal = stackTree.map((node) => ({
    category: node.domain,
    skills: node.branches.flatMap((branch) => branch.items),
}));
