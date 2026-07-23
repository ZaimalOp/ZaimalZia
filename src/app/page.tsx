import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechnicalArsenal } from "@/components/sections/TechnicalArsenal";
import { EngineeringPulse } from "@/components/sections/EngineeringPulse";
import { Trajectory } from "@/components/sections/Trajectory";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { NeuroFusionCaseStudy } from "@/components/sections/NeuroFusionCaseStudy";
import { HafeezCaseStudy } from "@/components/sections/HafeezCaseStudy";
import { Experiments } from "@/components/sections/experiments";
import { AvailabilityDashboard } from "@/components/sections/AvailabilityDashboard";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Hero />
            <About />
            <TechnicalArsenal />
            <EngineeringPulse />
            <Trajectory />
            <FeaturedProjects />

            {/* Detailed Case Studies */}
            <NeuroFusionCaseStudy />
            <HafeezCaseStudy />

            {/* New Archive Section */}
            <Experiments />

            <AvailabilityDashboard />
            <Contact />
        </main>
    );
}