export interface NavLink {
    id: string;
    label: string;
}

export interface SkillCategory {
    category: string;
    icon: string;
    skills: string[];
}

export interface Repo {
    name: string;
    description: string;
    tech: string[];
    url: string;
    highlight: boolean;
}

export interface TrajectoryItem {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    tags: string[];
}