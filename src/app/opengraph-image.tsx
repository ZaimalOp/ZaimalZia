import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zaimal Zia — AI Software Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#0c0a09", // Warm Obsidian
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "80px",
                    color: "#fafaf9",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "15px", height: "15px", background: "#f59e0b", borderRadius: "50%" }} />
                    <span style={{ color: "#a8a29e", fontSize: "24px", fontFamily: "monospace" }}>AI ARCHITECT & FOUNDER</span>
                </div>
                <div style={{ fontSize: "72px", fontWeight: 700, lineHeight: 1.1 }}>
                    Zaimal Zia
                </div>
                <div style={{ fontSize: "32px", color: "#a8a29e", marginTop: "16px" }}>
                    Architecting AI-driven products from zero to production.
                </div>
            </div>
        ),
        { ...size }
    );
}