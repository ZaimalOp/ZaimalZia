import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Zaimal Zia — Portfolio",
        short_name: "Zaimal.ZIA",
        description: "AI Software Architect & Founder",
        start_url: "/",
        display: "standalone",
        background_color: "#0c0a09",
        theme_color: "#f59e0b",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}