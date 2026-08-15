import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Principles } from "@/components/sections/Principles";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { NeuroFusionCaseStudy } from "@/components/sections/NeuroFusionCaseStudy";
import { EvinicCaseStudy } from "@/components/sections/EvinicCaseStudy";
import { Lab } from "@/components/sections/Lab";
import { TechnicalDepth } from "@/components/sections/TechnicalDepth";
import { Trajectory } from "@/components/sections/Trajectory";
import { BuildLog } from "@/components/sections/BuildLog";
import { Contact } from "@/components/sections/Contact";

/**
 * Reading order: statement → evidence → detail → interaction → next statement.
 * Each case study follows the index that introduces it.
 */
export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Principles />
            <FeaturedWork />
            <NeuroFusionCaseStudy />
            <EvinicCaseStudy />
            <Lab />
            <TechnicalDepth />
            <Trajectory />
            <BuildLog />
            <Contact />
        </>
    );
}
