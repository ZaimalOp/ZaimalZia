"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">System Malfunction</h2>
      <p className="text-muted-foreground max-w-md">An unexpected error occurred while rendering this section.</p>
      <button
        onClick={reset}
        className="px-4 py-2 mt-4 text-sm font-medium text-background bg-foreground rounded-md hover:bg-primary/90"
      >
        Attempt Recovery
      </button>
    </div>
  );
}
