import type { MetadataRoute } from "next";
import { identity } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${identity.name} — AI Systems Builder`,
        short_name: identity.name,
        description: identity.positioning,
        start_url: "/",
        display: "standalone",
        background_color: "#05070d",
        theme_color: "#05070d",
        icons: [
            // Static asset — see src/og/ for the generator that produced it.
            { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
        ],
    };
}
