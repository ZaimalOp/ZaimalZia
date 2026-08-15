import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium " +
    "transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--dur)] ease-out " +
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 " +
    // Touch targets stay >=44px tall at md
    "select-none";

const variants: Record<Variant, string> = {
    primary:
        "bg-fg text-bg hover:bg-primary hover:text-primary-fg shadow-sm hover:shadow",
    outline:
        "border border-border-strong bg-surface/60 text-fg hover:border-primary/60 hover:bg-surface hover:text-primary backdrop-blur-sm",
    ghost: "text-fg-muted hover:bg-fg/[0.06] hover:text-fg",
};

const sizes: Record<Size, string> = {
    sm: "h-9 px-3.5 text-[0.8125rem]",
    md: "h-11 px-5 text-sm md:h-12 md:px-6",
};

function classes(variant: Variant, size: Size, className?: string) {
    return cn(base, variants[variant], sizes[size], className);
}

export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
}: {
    variant?: Variant;
    size?: Size;
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={classes(variant, size, className)} {...rest}>
            {children}
        </button>
    );
}

export function ButtonLink({
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
}: {
    variant?: Variant;
    size?: Size;
    children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a className={classes(variant, size, className)} {...rest}>
            {children}
        </a>
    );
}
