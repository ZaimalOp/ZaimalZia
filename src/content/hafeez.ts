export const hafeezCaseStudy = {
    title: "Digital Retail Navigation Platform",
    subtitle: "Hafeez Center Marketplace",
    status: "Founder / Product · Full-Stack Build",
    overview: "A web-first market-discovery and trust platform that brings an informal cash electronics bazaar (Lahore's Hafeez Center) online. Its hero feature is a WhatsApp-native request-broadcast engine that gets shoppers trusted answers in minutes, with a shop directory serving as the data layer.",
    problem: "Informal physical tech markets lack digital trust and discovery. Shoppers cannot easily verify stock, pricing, or shop reputation without physically visiting the market or relying on fragmented, unverified WhatsApp groups.",
    solution: "A two-sided marketplace bridging the gap between shoppers and shopkeepers. By utilizing a WhatsApp-native request-broadcast engine, the platform matches shopper demands with verified vendors instantly, providing a trusted, evidence-gated discovery experience.",
    productStrategy: [
        {
            title: "15-Phase Product Definition",
            description: "Driven through a rigorous 15-phase process into a complete Startup Masterplan (v3) covering vision, TAM/SAM/SOM, gate-based KPIs, revenue model, expansion strategy, risk register, and a 30/60/90 execution plan."
        },
        {
            title: "Lean Hybrid Model",
            description: "Category-focused launch strategy (mobile repair & parts). Evidence-gated feature staging ensures development is tied to real user demand."
        },
        {
            title: "Trust & Anti-Fraud Safeguards",
            description: "Implemented a verified-review system with strict anti-fraud safeguards to maintain marketplace integrity in a historically cash-only, informal economy."
        }
    ],
    architecture: [
        {
            title: "Web + Mobile Wrapper",
            description: "Next.js (web-first) architecture wrapped for Android via Capacitor (Ionic), ensuring a single codebase deployment."
        },
        {
            title: "Backend & Data Layer",
            description: "Supabase (PostgreSQL, Auth, Storage) acting as the core data layer. Includes Postgres full-text search augmented with Roman-Urdu synonyms for localized search."
        },
        {
            title: "Notification & Comms",
            description: "Firebase Cloud Messaging for push notifications and OTP authentication. WhatsApp Business API integration for the core request-broadcast engine."
        }
    ],
    stack: ["Next.js", "Capacitor (Ionic)", "Supabase", "PostgreSQL", "Firebase", "WhatsApp Business API", "Node.js", "GA4"]
};