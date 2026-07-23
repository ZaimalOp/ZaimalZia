import { Metadata } from "next";
import { trajectory } from "@/content/trajectory";
import { technicalArsenal } from "@/content/profile";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
    title: "Resume",
    description: "Downloadable resume of Zaimal Zia, AI Software Architect & Founder.",
};

export default function ResumePage() {
    return (
        <main className="container max-w-4xl px-4 py-12 md:py-24 print:py-0">
            <div className="hidden print:block">
                <h1 className="text-3xl font-bold">Zaimal Zia</h1>
                <p className="text-primary">AI Software Architect & Founder</p>
                <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span>zaimalzia11@gmail.com</span>
                    <span>github.com/ZaimalOp</span>
                    <span>linkedin.com/in/zaimal-zia</span>
                </div>
            </div>

            <div className="no-print mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Professional Resume</h1>
                <PrintButton />
            </div>

            <div className="space-y-8 print:space-y-4">
                {trajectory.map((item, i) => (
                    <div key={i} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h2 className="text-lg font-semibold">{item.role} · {item.company}</h2>
                            <span className="text-xs font-mono text-muted-foreground">{item.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map(tag => <span key={tag} className="text-xs font-mono px-2 py-0.5 border rounded bg-background">{tag}</span>)}
                        </div>
                    </div>
                ))}

                <div className="break-inside-avoid">
                    <h2 className="text-lg font-semibold mb-4">Technical Arsenal</h2>
                    {technicalArsenal.map(cat => (
                        <div key={cat.category} className="mb-4">
                            <h3 className="text-sm font-medium text-primary mb-2">{cat.category}</h3>
                            <p className="text-sm text-muted-foreground font-mono">{cat.skills.join(" · ")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}