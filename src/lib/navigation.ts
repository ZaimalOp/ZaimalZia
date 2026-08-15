/**
 * Anchor navigation. Uses native scrolling (CSS scroll-behavior + the
 * scroll-margin-top set in globals.css) so there is no scroll hijacking and
 * reduced-motion users get an instant jump for free.
 *
 * The hash is updated with replaceState so section jumps do not flood history.
 */
export function goToSection(id: string) {
    if (typeof document === "undefined") return;

    const el = document.getElementById(id);
    if (!el) {
        // The section lives on the home page and we are on another route
        // (/resume, 404). Without this the nav links silently do nothing.
        window.location.href = `/#${id}`;
        return;
    }

    el.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });

    // Move keyboard focus to the section so screen-reader users follow along.
    const focusTarget = el as HTMLElement;
    const hadTabIndex = focusTarget.hasAttribute("tabindex");
    if (!hadTabIndex) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
    if (!hadTabIndex) {
        focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
    }

    window.history.replaceState(null, "", `#${id}`);
}

export function goToTop() {
    if (typeof window === "undefined") return;

    // From a sub-route the wordmark should return to the site, not just scroll.
    if (window.location.pathname !== "/") {
        window.location.href = "/";
        return;
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
}

export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Case-insensitive subsequence match, so "nfa" finds "NeuroFusion AI". */
export function fuzzyMatch(query: string, target: string): boolean {
    if (!query) return true;
    const q = query.toLowerCase().replace(/\s+/g, "");
    const t = target.toLowerCase();
    let i = 0;
    for (const char of t) {
        if (char === q[i]) i += 1;
        if (i === q.length) return true;
    }
    return false;
}
