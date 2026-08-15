"use client";
import { Printer } from "lucide-react";
import { Button } from "./Button";

/** Browser print dialog — "Save as PDF" produces the download, no fake file. */
export function PrintButton() {
    return (
        <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Download PDF
        </Button>
    );
}
