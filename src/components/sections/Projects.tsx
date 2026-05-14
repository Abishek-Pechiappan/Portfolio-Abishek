"use client";

import React, { useState } from 'react';
import Section from '../ui/Section';
import { Shield, Wrench, Box, ChevronRight, Activity, ExternalLink, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface Project {
    id: string;
    title: string;
    category: string;
    status: string;
    threat: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    description: string;
    details: string[];
    technologies: string[];
    Icon: React.ElementType;
    githubUrl?: string;
    comingSoon?: boolean;
}

const projects: Project[] = [
    {
        id: 'project4',
        title: 'Linux Threat Monitor',
        category: 'Linux Security',
        status: 'Completed',
        threat: 'HIGH',
        description: 'Lightweight Linux process monitor that reads live kernel data directly from /proc to detect suspicious activity — specifically root processes running from directories commonly used by malware.',
        details: [
            'Reads /proc/[pid]/comm, status, and cmdline directly from the kernel',
            'Flags root (UID 0) processes executing from /tmp, /dev/shm, /var/tmp',
            'Displays PID, process name, and privilege level for all running processes',
            'Tested against a simulated malicious process running from /tmp',
        ],
        technologies: ['Python', 'Linux', '/proc Filesystem', 'Security'],
        Icon: Activity,
        githubUrl: 'https://github.com/Abishek-Pechiappan/linux-system-monitoring',
    },
    {
        id: 'project2',
        title: 'Security Tool Automation',
        category: 'Security Automation',
        status: 'Completed',
        threat: 'HIGH',
        description: 'Automated security scanning and monitoring solutions using PowerShell scripting. Streamlined repetitive security checks to improve efficiency and consistency.',
        details: [
            'Automated vulnerability scanning',
            'Created security audit scripts',
            'Implemented scheduled monitoring',
            'Built reporting dashboards',
        ],
        technologies: ['PowerShell', 'Automation', 'Security Scanning'],
        Icon: Wrench,
    },
    {
        id: 'project3',
        title: 'Personal Automation Workflows',
        category: 'Productivity',
        status: 'In Progress',
        threat: 'MEDIUM',
        description: 'Comprehensive automation workflows for routine tasks using modern automation tools. Reducing manual effort and improving productivity through intelligent task orchestration.',
        details: [
            'Designed workflow architectures',
            'Automated repetitive processes',
            'Integrated multiple tools',
            'Optimized task sequences',
        ],
        technologies: ['Python', 'Automation', 'Workflows'],
        Icon: Box,
    },
    {
        id: 'project5',
        title: 'ZTI Framework',
        category: 'Cryptographic Evidence',
        status: 'Active',
        threat: 'CRITICAL',
        description: 'A proprietary framework for sealing digital evidence into tamper-evident, self-verifying containers. Designed to prove integrity and chain of custody offline — without relying on any central authority.',
        details: [
            'Cryptographic binding of content and metadata at the moment of capture',
            'Field-level tamper detection to isolate exactly what was changed',
            'Append-only custody chain that breaks if any event is removed or reordered',
            'Multi-party signature scheme supporting independent verification by each authority in the chain',
        ],
        technologies: ['Python', 'Cryptography', 'Dart'],
        Icon: Lock,
        comingSoon: true,
    },
    {
        id: 'project1',
        title: 'Ransomware Resilience Simulator',
        category: 'Cybersecurity',
        status: 'Active',
        threat: 'CRITICAL',
        description: 'Comprehensive study of ransomware attack lifecycle with focus on simulated attack and recovery scenarios. Developed resilience strategies emphasizing prevention, detection, and response mechanisms.',
        details: [
            'Analyzed ransomware propagation patterns',
            'Designed multi-layer defense strategies',
            'Created incident response playbooks',
            'Implemented recovery protocols',
        ],
        technologies: ['Python', 'Incident Response', 'Forensics'],
        Icon: Shield,
    },
];

const threatConfig = {
    CRITICAL: {
        textColor: 'text-red-400',
        borderColor: 'border-red-500/40',
        bgColor: 'bg-red-500/10',
    },
    HIGH: {
        textColor: 'text-orange-400',
        borderColor: 'border-orange-400/40',
        bgColor: 'bg-orange-400/10',
    },
    MEDIUM: {
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-400/40',
        bgColor: 'bg-yellow-400/10',
    },
};

const statusConfig: Record<string, { color: string; dotColor: string }> = {
    Active: { color: 'text-accent-green', dotColor: 'bg-accent-green' },
    Completed: { color: 'text-accent-cyan', dotColor: 'bg-accent-cyan' },
    'In Progress': { color: 'text-accent-purple', dotColor: 'bg-accent-purple' },
};

// ─── Featured Card (large, left 2/3) ────────────────────────────────────────
const FeaturedCard = ({ project }: { project: Project }) => {
    const threat = threatConfig[project.threat];
    const status = statusConfig[project.status] ?? { color: 'text-text-muted', dotColor: 'bg-text-muted' };
    const { Icon } = project;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full glass-panel rounded-2xl p-5 sm:p-8 flex flex-col relative overflow-hidden border border-accent-green/20 hover:border-accent-green/40 transition-colors duration-300 group"
        >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 via-transparent to-accent-cyan/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-green/5 rounded-bl-[120px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-accent-green/40 bg-cyber-dark flex items-center justify-center text-accent-green group-hover:shadow-[0_0_20px_rgba(0,255,156,0.25)] transition-shadow duration-300">
                        <Icon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">{project.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={clsx('w-2 h-2 rounded-full animate-pulse', status.dotColor)} />
                            <span className={clsx('text-xs font-mono', status.color)}>{project.status}</span>
                        </div>
                    </div>
                </div>

                <div className={clsx(
                    'px-3 py-1 rounded border text-xs font-bold font-mono uppercase shrink-0',
                    threat.textColor, threat.borderColor, threat.bgColor
                )}>
                    {project.threat}
                </div>
            </div>

            {/* Featured label */}
            <span className="text-[10px] font-mono text-accent-green/60 uppercase tracking-[0.2em] mb-3 relative z-10">
                ◆ Featured Project
            </span>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-4 relative z-10 leading-tight">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed mb-6 relative z-10">
                {project.description}
            </p>

            {/* Key details */}
            <ul className="space-y-2.5 mb-8 flex-1 relative z-10">
                {project.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                        <ChevronRight className="w-4 h-4 text-accent-green mt-0.5 shrink-0" />
                        <span>{detail}</span>
                    </li>
                ))}
            </ul>

            {/* Tech stack + GitHub */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/5 relative z-10">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-green/30 bg-accent-green/5 text-accent-green text-xs font-mono hover:border-accent-green/60 hover:bg-accent-green/10 transition-colors duration-200 shrink-0"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        GitHub
                    </a>
                )}
                {project.comingSoon && (
                    <span className="px-3 py-1.5 rounded-lg border border-text-muted/30 bg-text-muted/5 text-text-muted text-xs font-mono shrink-0">
                        Coming Soon
                    </span>
                )}
            </div>
        </motion.div>
    );
};

// ─── Small Card (right column, click to expand) ──────────────────────────────
const SmallCard = ({ project, delay }: { project: Project; delay: number }) => {
    const [expanded, setExpanded] = useState(false);
    const threat = threatConfig[project.threat];
    const status = statusConfig[project.status] ?? { color: 'text-text-muted', dotColor: 'bg-text-muted' };
    const { Icon } = project;

    return (
        <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={clsx(
                'h-full glass-panel rounded-2xl p-4 sm:p-6 flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer group',
                expanded
                    ? 'border border-accent-cyan/40 shadow-[0_0_30px_rgba(0,188,212,0.08)]'
                    : 'border border-white/10 hover:border-accent-green/30 hover:shadow-[0_0_20px_rgba(0,255,156,0.06)]'
            )}
            onClick={() => setExpanded(!expanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpanded(!expanded);
                }
            }}
            aria-expanded={expanded}
            aria-label={`${project.title} — click to ${expanded ? 'collapse' : 'expand'} details`}
        >
            {/* Subtle inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {/* Top row */}
            <div className="flex items-start justify-between mb-3 relative z-10">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{project.category}</p>
                <div className={clsx(
                    'px-2 py-0.5 rounded border text-[10px] font-bold font-mono uppercase',
                    threat.textColor, threat.borderColor, threat.bgColor
                )}>
                    {project.threat}
                </div>
            </div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className={clsx(
                    'w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-200 shrink-0',
                    expanded
                        ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                        : 'border-accent-green/30 bg-cyber-dark text-accent-green group-hover:border-accent-green/50'
                )}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-text-primary leading-snug">{project.title}</h3>
            </div>

            {/* Description */}
            <p className={clsx(
                'text-sm text-text-secondary leading-relaxed mb-4 relative z-10',
                !expanded && 'line-clamp-2'
            )}>
                {project.description}
            </p>

            {/* Expandable details */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden space-y-1.5 mb-4 relative z-10"
                    >
                        {project.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                                <ChevronRight className="w-3 h-3 text-accent-green mt-0.5 shrink-0" />
                                <span>{detail}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-2 relative z-10">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-accent-cyan/10 text-accent-cyan text-[10px] font-mono rounded-full border border-accent-cyan/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className={clsx('w-1.5 h-1.5 rounded-full', status.dotColor)} />
                        <span className={clsx('text-[10px] font-mono', status.color)}>{project.status}</span>
                    </div>
                </div>
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg border border-accent-green/30 bg-accent-green/5 text-accent-green text-[10px] font-mono hover:border-accent-green/60 hover:bg-accent-green/10 transition-colors duration-200"
                    >
                        <ExternalLink className="w-3 h-3" />
                        View on GitHub
                    </a>
                )}
                {project.comingSoon && (
                    <span className="self-start px-2.5 py-1 rounded-lg border border-text-muted/30 bg-text-muted/5 text-text-muted text-[10px] font-mono">
                        Coming Soon
                    </span>
                )}
            </div>

            {/* Click hint — always visible on touch, hover-only on desktop */}
            {!expanded && (
                <p className="absolute bottom-2 right-3 text-[10px] font-mono text-text-muted opacity-40 md:opacity-0 md:group-hover:opacity-60 transition-opacity pointer-events-none">
                    TAP TO EXPAND
                </p>
            )}
        </motion.div>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Projects = () => {
    const [featured, ...rest] = projects;

    return (
        <Section id="projects" className="bg-cyber-dark/30">
            {/* Header */}
            <div className="mb-16 text-center">
                <span className="text-accent-green font-mono text-base tracking-widest pl-2 border-l-2 border-accent-green mb-6 inline-block">
                    PROJECT DIRECTORY
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2">
                    My{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-cyan">
                        Projects
                    </span>
                </h2>
                <p className="text-text-secondary mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
                    A curated set of cybersecurity and automation builds
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Featured project — 2/3 width */}
                <div className="md:col-span-2">
                    <FeaturedCard project={featured} />
                </div>

                {/* Right column — two smaller cards stacked, filling the same height */}
                <div className="flex flex-col gap-4 md:gap-6">
                    {rest.map((project, i) => (
                        <div key={project.id} className="flex-1">
                            <SmallCard project={project} delay={0.15 + i * 0.1} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;
