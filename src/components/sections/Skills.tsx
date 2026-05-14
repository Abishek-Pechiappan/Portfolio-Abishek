"use client";

import React from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import {
    Terminal, Shield, Crosshair, Activity,
    Code, Database, Wrench, Globe, Box, BookOpen, FileText, Wifi,
} from 'lucide-react';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
    name: string;
    tools: string;
    status: 'Active' | 'Learning';
    Icon: React.ElementType;
}

interface Category {
    id: string;
    title: string;
    Icon: React.ElementType;
    accent: 'green' | 'cyan' | 'purple';
    skills: Skill[];
    colSpan: 1 | 2;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Bento layout (3-col grid):
//  Row 1 → Languages (2col) | Linux (1col)
//  Row 2 → Security  (1col) | Tools (2col)
const categories: Category[] = [
    {
        id: 'languages',
        title: 'Languages',
        Icon: Code,
        accent: 'green',
        colSpan: 2,
        skills: [
            { name: 'Python',     tools: 'Automation • Scripting • Security', status: 'Active',   Icon: Code  },
            { name: 'HTML / CSS', tools: 'Web Structure • Styling',           status: 'Active',   Icon: Globe },
            { name: 'C',          tools: 'Systems Programming • Low-level',   status: 'Active',   Icon: Code  },
            { name: 'C++',        tools: 'OOP • Performance Computing',       status: 'Active',   Icon: Code  },
            { name: 'Java',       tools: 'OOP • Cross-platform',              status: 'Learning', Icon: Code  },
            { name: 'Dart',       tools: 'Flutter • Mobile Development',      status: 'Learning', Icon: Code  },
            { name: 'Bash',       tools: 'Shell Scripting • Automation',      status: 'Learning', Icon: Terminal },
        ],
    },
    {
        id: 'linux',
        title: 'Linux Systems',
        Icon: Terminal,
        accent: 'cyan',
        colSpan: 1,
        skills: [
            { name: 'Kali Linux', tools: 'Penetration Testing • Security Tools • CTF', status: 'Active',   Icon: Shield   },
            { name: 'Arch Linux', tools: 'Rolling Release • Custom Setup • CLI',      status: 'Learning', Icon: Terminal },
            { name: 'Ubuntu',     tools: 'General Purpose • Server Use',              status: 'Learning', Icon: Terminal },
            { name: 'Fedora',     tools: 'Enterprise Features • RHEL-based',          status: 'Active',   Icon: Terminal },
        ],
    },
    {
        id: 'security',
        title: 'Security',
        Icon: Shield,
        accent: 'green',
        colSpan: 1,
        skills: [
            { name: 'Penetration Testing', tools: 'Metasploit • Nmap • Burp Suite',        status: 'Learning', Icon: Crosshair },
            { name: 'Incident Response',   tools: 'Playbooks • Forensics • Recovery',    status: 'Learning', Icon: Activity  },
{ name: 'Wireshark',           tools: 'Packet Analysis • Network Forensics • Traffic Inspection', status: 'Active', Icon: Wifi },
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Productivity',
        Icon: Wrench,
        accent: 'purple',
        colSpan: 2,
        skills: [
            { name: 'Docker',            tools: 'Containerisation • DevOps',     status: 'Active', Icon: Box      },
            { name: 'Supabase',          tools: 'Backend • Database • Auth',     status: 'Active', Icon: Database },
            { name: 'Obsidian',          tools: 'Note-taking • Knowledge Base',  status: 'Active', Icon: BookOpen },
            { name: 'Word & PowerPoint', tools: 'Documentation • Presentations', status: 'Active', Icon: FileText },
        ],
    },
];

// ─── Accent class maps (full strings so Tailwind JIT picks them up) ───────────
const accentStyles = {
    green: {
        text:        'text-accent-green',
        border:      'border-accent-green/20',
        hoverBorder: 'hover:border-accent-green/40',
        leftBorder:  'border-l-4 border-l-accent-green',
        iconBg:      'bg-accent-green/10',
        iconBorder:  'border-accent-green/30',
        iconText:    'text-accent-green',
        badgeBg:     'bg-accent-green/10',
        badgeBorder: 'border-accent-green/30',
        badgeText:   'text-accent-green',
        tileBorder:  'border-accent-green/20',
        tileHover:   'hover:border-accent-green/40',
    },
    cyan: {
        text:        'text-accent-cyan',
        border:      'border-accent-cyan/20',
        hoverBorder: 'hover:border-accent-cyan/40',
        leftBorder:  'border-l-4 border-l-accent-cyan',
        iconBg:      'bg-accent-cyan/10',
        iconBorder:  'border-accent-cyan/30',
        iconText:    'text-accent-cyan',
        badgeBg:     'bg-accent-cyan/10',
        badgeBorder: 'border-accent-cyan/30',
        badgeText:   'text-accent-cyan',
        tileBorder:  'border-accent-cyan/20',
        tileHover:   'hover:border-accent-cyan/40',
    },
    purple: {
        text:        'text-accent-purple',
        border:      'border-accent-purple/20',
        hoverBorder: 'hover:border-accent-purple/40',
        leftBorder:  'border-l-4 border-l-accent-purple',
        iconBg:      'bg-accent-purple/10',
        iconBorder:  'border-accent-purple/30',
        iconText:    'text-accent-purple',
        badgeBg:     'bg-accent-purple/10',
        badgeBorder: 'border-accent-purple/30',
        badgeText:   'text-accent-purple',
        tileBorder:  'border-accent-purple/20',
        tileHover:   'hover:border-accent-purple/40',
    },
};

const statusStyles = {
    Active: {
        dot:    'bg-accent-green animate-pulse',
        text:   'text-accent-green',
        bg:     'bg-accent-green/10',
        border: 'border-accent-green/30',
    },
    Learning: {
        dot:    'bg-yellow-400',
        text:   'text-yellow-400',
        bg:     'bg-yellow-400/10',
        border: 'border-yellow-400/30',
    },
};

// ─── Skill Row (used inside col-span-1 and col-span-2 cards) ─────────────────
const SkillRow = ({ skill }: { skill: Skill }) => {
    const s = statusStyles[skill.status];
    const { Icon: SkillIcon } = skill;

    return (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-cyber-dark/60 border border-white/5 hover:border-white/10 transition-colors duration-200">
            <div className="w-8 h-8 rounded-lg bg-cyber-black/60 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <SkillIcon className="w-4 h-4 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary truncate">{skill.name}</span>
                    <div className={clsx(
                        'flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono shrink-0',
                        s.bg, s.border, s.text,
                    )}>
                        <span className={clsx('w-1.5 h-1.5 rounded-full', s.dot)} />
                        {skill.status}
                    </div>
                </div>
                <p className="text-xs text-text-muted font-mono leading-relaxed">{skill.tools}</p>
            </div>
        </div>
    );
};

// ─── Category Card ────────────────────────────────────────────────────────────
const CategoryCard = ({ category, delay }: { category: Category; delay: number }) => {
    const a = accentStyles[category.accent];
    const { Icon } = category;

    // col-span-1 and col-span-2: stacked rows, but col-span-2 uses a 2-column skill grid
    const skillsGrid = category.colSpan === 2
        ? 'grid grid-cols-1 md:grid-cols-2 gap-2.5'
        : 'space-y-2.5';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={clsx(
                'h-full glass-panel rounded-2xl overflow-hidden transition-colors duration-300',
                a.border, a.hoverBorder, a.leftBorder,
            )}
        >
            <div className="p-6 h-full flex flex-col">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className={clsx('w-10 h-10 rounded-xl border flex items-center justify-center', a.iconBg, a.iconBorder)}>
                            <Icon className={clsx('w-5 h-5', a.iconText)} />
                        </div>
                        <h3 className={clsx('text-xs font-bold font-mono uppercase tracking-wide', a.text)}>
                            {category.title}
                        </h3>
                    </div>
                    <span className={clsx('px-2.5 py-1 rounded-full text-xs font-mono border', a.badgeBg, a.badgeBorder, a.badgeText)}>
                        {category.skills.length} skills
                    </span>
                </div>

                {/* Skill rows / 2-col grid */}
                <div className={skillsGrid}>
                    {category.skills.map((skill, i) => (
                        <SkillRow key={i} skill={skill} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Skills = () => {
    return (
        <Section id="skills">
            {/* Header */}
            <div className="flex flex-col items-center mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-2 flex items-center gap-2"
                >
                    <span className="w-8 h-[1px] bg-accent-cyan" />
                    Technical Arsenal
                    <span className="w-8 h-[1px] bg-accent-cyan" />
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold"
                >
                    Skills &amp; <span className="shimmer-text">Expertise</span>
                </motion.h2>
            </div>

            {/* Bento grid — 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category, i) => (
                    <div
                        key={category.id}
                        className={clsx(
                            category.colSpan === 2 && 'md:col-span-2',
                        )}
                    >
                        <CategoryCard category={category} delay={i * 0.08} />
                    </div>
                ))}
            </div>

            {/* Spoken languages */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-center"
            >
                <div className="glass-panel px-4 py-2 rounded-full font-mono text-xs flex items-center gap-2">
                    <span className="text-text-muted">Spoken:</span>
                    <span className="text-accent-green">English (Fluent)</span>
                    <span className="text-white/20">•</span>
                    <span className="text-accent-cyan">Tamil</span>
                </div>
            </motion.div>
        </Section>
    );
};

export default Skills;
