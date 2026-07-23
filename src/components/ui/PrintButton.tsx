"use client";

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md hover:bg-primary transition-colors"
        >
            Download PDF
        </button>
    );
}
