import { notFound } from "next/navigation";
import { featuredProjects } from "@/content/projects";

export function generateStaticParams() {
    return featuredProjects.map((project) => ({
        slug: project.name.toLowerCase().replace(/\s+/g, "-"),
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const project = featuredProjects.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === params.slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: project.name,
        description: project.description,
    };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const project = featuredProjects.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === params.slug);

    if (!project) notFound();

    return (
        <main className="container max-w-4xl px-4 py-24 md:py-32">
            <span className="font-mono text-sm text-primary tracking-wider">CASE STUDY</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">{project.name}</h1>
            <p className="mt-6 text-xl text-muted-foreground">{project.description}</p>

            <div className="mt-12 border border-dashed border-border rounded-2xl p-12 text-center">
                <h2 className="text-xl font-bold mb-2">Deep-Dive Content Pending</h2>
                <p className="text-muted-foreground">Factual engineering interview and technical visualization mapping in progress.</p>
            </div>
        </main>
    );
}