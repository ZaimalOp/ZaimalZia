import { ImageResponse } from "next/og";
import { identity } from "@/content/site";

export const alt = `${identity.name} — AI Systems Builder, Researcher & Founder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#05070d";
const FG = "#f0f4f8";
const MUTED = "#8b95a6";
const PRIMARY = "#2ec7f7";
const BORDER = "#1c2230";

/** Social card, built from the same tokens as the site. */
export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: BG,
                    // Horizon glow only. A 56px blueprint grid was also layered
                    // here, but three stacked gradients made the native SVG
                    // rasterizer fail intermittently at build time — and the
                    // grid is invisible at social-card size regardless.
                    backgroundImage:
                        "radial-gradient(1000px 460px at 50% -10%, rgba(46,199,247,0.16), transparent 70%)",
                    padding: 72,
                    color: FG,
                    fontFamily: "sans-serif",
                }}
            >
                {/* Top rail */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                border: `1px solid ${BORDER}`,
                                color: PRIMARY,
                                fontSize: 18,
                                fontWeight: 600,
                            }}
                        >
                            ZZ
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: 20, letterSpacing: 3 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 999, background: "#2ecf8f" }} />
                            SYSTEM ONLINE
                        </div>
                    </div>

                    <div style={{ color: MUTED, fontSize: 20, letterSpacing: 3 }}>PAKISTAN · PKT</div>
                </div>

                {/* Statement */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 116, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
                        Zaimal Zia
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                            marginTop: 26,
                            color: MUTED,
                            fontSize: 25,
                            letterSpacing: 5,
                        }}
                    >
                        <span>AI SYSTEMS BUILDER</span>
                        <div style={{ width: 5, height: 5, borderRadius: 999, background: PRIMARY }} />
                        <span>RESEARCHER</span>
                        <div style={{ width: 5, height: 5, borderRadius: 999, background: PRIMARY }} />
                        <span>FOUNDER</span>
                    </div>
                </div>

                {/* Positioning */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: `1px solid ${BORDER}`,
                        paddingTop: 26,
                    }}
                >
                    <div style={{ fontSize: 29, color: FG }}>{identity.positioning}</div>
                    <div style={{ fontSize: 21, color: MUTED }}>{identity.githubHandle}</div>
                </div>
            </div>
        ),
        size,
    );
}
