"use client";

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    href?: string;
    icon?: React.ReactNode;
}

const Button = ({
    children,
    variant = 'primary',
    href,
    className,
    icon,
    ...props
}: ButtonProps) => {
    const baseStyles = "relative inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold tracking-wide uppercase transition-all duration-300 rounded overflow-hidden group backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-green/10 disabled:hover:text-accent-green disabled:hover:shadow-none";

    const variants = {
        primary: "bg-accent-green/10 text-accent-green border border-accent-green hover:bg-accent-green hover:text-cyber-black hover:shadow-[0_0_20px_rgba(0,255,156,0.4)]",
        secondary: "bg-white/5 text-text-primary border border-text-muted/50 hover:border-text-primary hover:bg-white/10",
    };

    // If href is provided, use Link, otherwise use button
    if (href) {
        return (
            <Link
                href={href}
                className={clsx(baseStyles, variants[variant], className)}
            >
                <span className="text-accent-cyan mr-1 group-hover:text-current transition-colors">$</span>
                {children}
                {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
            </Link>
        );
    }

    return (
        <button
            className={clsx(baseStyles, variants[variant], className)}
            {...props}
        >
            <span className="text-accent-cyan mr-1 group-hover:text-current transition-colors">$</span>
            {children}
            {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </button>
    );
};

export default Button;
