import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Generated favicon — replaces the missing /favicon.ico the manifest pointed at. */
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#05070d",
                    color: "#2ec7f7",
                    fontSize: 268,
                    fontWeight: 700,
                    letterSpacing: -14,
                    fontFamily: "sans-serif",
                }}
            >
                Z
            </div>
        ),
        size,
    );
}
