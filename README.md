Zaimal Zia — Personal Operating System
A world-class, production-grade portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

🏗️ Architecture
This project is structured around a Single Source of Truth (SSOT) philosophy. All textual content, project data, and professional status live in TypeScript files under src/content/. The UI components are completely decoupled from the data.

Folder Structure
src/app/: Next.js App Router pages, layouts, and metadata routes.
src/components/: Reusable UI components, layout structures, and page sections.
src/content/: SSOT data files (profile, projects, trajectory, status). Update these to update the site.
src/hooks/: Custom React hooks for scroll, active sections, etc.
src/lib/: Utility functions (cn), motion variants, and constants.
src/types/: Centralized TypeScript definitions.
🚀 Getting Started
Install dependencies:```bashpnpm install```
Set environment variables:```bashcp .env.example .env.local
Update NEXT_PUBLIC_SITE_URL to your deployment URL
```
Run the development server:```bashpnpm dev```
🔄 Maintenance Guide
Update Availability: Edit src/content/status.ts.
Add/Edit Skills: Edit src/content/profile.ts.
Update Experience: Edit src/content/trajectory.ts.
Download Resume: Navigate to /resume and click "Download PDF" (uses native browser print-to-PDF with optimized CSS).
🚢 Deployment Guide
This project is optimized for Vercel.

Push the repository to GitHub.
Import the project into Vercel.
Set the NEXT_PUBLIC_SITE_URL environment variable in Vercel project settings.
Deploy. (OG images, sitemaps, and robots are generated automatically via Next.js metadata routes).
✅ Quality Assurance
Lighthouse Target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
Accessibility: WCAG AA compliant, reduced-motion respected, keyboard navigable.
Theming: Warm Obsidian (Dark) & Warm Ivory (Light) via CSS variables (no hydration flash).