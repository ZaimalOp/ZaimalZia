import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
            <span className="font-mono text-sm text-primary tracking-wider">ERROR_404</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">System Path Not Found</h1>
            <p className="mt-4 text-muted-foreground max-w-md">
                The requested route does not exist in this application. The simulation has diverged.
            </p>
            <Link href="/" className="mt-8 px-6 py-3 text-sm font-medium text-background bg-foreground rounded-md hover:bg-primary transition-colors">
                Return to Base
            </Link>
        </main>
    );
}