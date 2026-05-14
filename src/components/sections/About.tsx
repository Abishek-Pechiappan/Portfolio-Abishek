"use client";

import React from 'react';
import Section from '../ui/Section';
import CyberAvatar from '../ui/CyberAvatar';
import { motion } from 'framer-motion';
import { GraduationCap, Shield, Zap, Terminal, ChevronRight, MapPin, Phone, Mail, Award, Briefcase } from 'lucide-react';

const About = () => {
    const stats = [
        { icon: GraduationCap, label: 'B.Tech CSE (Cyber Security)', sublabel: 'Hindustan University', color: 'accent-green' },
        { icon: Briefcase, label: 'IT Intern Experience', sublabel: 'Gorica Industries', color: 'accent-cyan' },
        { icon: Award, label: 'CSI Chapter Secretary', sublabel: '2024-2025', color: 'accent-green' }
    ];

    const certifications: string[] = [];

    return (
        <Section id="about">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
                {/* Avatar Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="order-2 md:order-1 relative"
                >
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-accent-green/30 rounded-tl-xl" />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-accent-cyan/30 rounded-br-xl" />

                    <CyberAvatar />

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 glass-panel p-4 rounded-lg space-y-2 font-mono text-xs"
                    >
                        <div className="flex items-center gap-3 text-text-muted">
                            <MapPin size={14} className="text-accent-green" />
                            <span>Chennai, Tamil Nadu</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-muted min-w-0">
                            <Mail size={14} className="text-accent-cyan shrink-0" />
                            <span className="truncate">abishekpechiappan@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                            <span className="text-accent-green">Available for opportunities</span>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 glass-panel p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-2 mb-3 text-accent-green text-xs font-mono uppercase tracking-widest">
                                <Award size={14} />
                                <span>Certifications</span>
                            </div>
                            <ul className="space-y-2">
                                {certifications.map((cert, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary font-mono">
                                        <span className="text-accent-cyan mt-0.5">▹</span>
                                        <span>{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </motion.div>

                {/* Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="order-1 md:order-2 space-y-6"
                >
                    {/* Section tag */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-3 font-mono text-sm"
                    >
                        <Terminal size={14} className="text-accent-cyan" />
                        <span className="text-accent-cyan tracking-widest uppercase">About Me</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-accent-cyan/50 to-transparent" />
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-text-primary leading-tight">
                        Cybersecurity Student{' '}
                        <span className="shimmer-text">& Fresher</span>
                    </h2>

                    {/* Description */}
                    <div className="space-y-4 text-text-secondary text-base lg:text-xl leading-relaxed">
                        <p>
                            Motivated and proactive, I am pursuing opportunities to deepen my expertise in
                            <span className="text-accent-green font-medium"> ethical hacking</span> and strengthen my grasp of the evolving
                            <span className="text-accent-cyan font-medium"> cyber landscape</span>.
                        </p>
                        <p>
                            I have experience operating within <span className="text-accent-green">Arch Linux</span> environments,
                            and established a solid foundation in technical concepts.
                        </p>
                    </div>

                    {/* Education */}
                    <div className="glass-panel p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-4 text-accent-green text-sm font-mono uppercase tracking-widest">
                            <GraduationCap size={16} />
                            <span>Education</span>
                        </div>
                        <div className="space-y-4">
                            <div className="border-l-2 border-accent-green/30 pl-4">
                                <div className="font-bold text-text-primary text-base">B.Tech Computer Science & Engineering</div>
                                <div className="text-accent-cyan text-sm font-mono">Specialization in Cyber Security</div>
                                <div className="text-text-muted text-sm">Hindustan Institute of Technology and Science • 2022-2026</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ scale: 1.02, y: -3 }}
                                className="glass-panel p-3 rounded-lg flex flex-col items-center text-center gap-1 group cursor-default relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                <div className={`p-2 rounded-lg bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors`}>
                                    <stat.icon className={`text-${stat.color} w-4 h-4`} />
                                </div>
                                <span className="text-xs font-medium text-text-primary">{stat.label}</span>
                                <span className="text-[10px] text-text-muted">{stat.sublabel}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Experience highlight */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2 text-sm text-text-muted font-mono pt-2"
                    >
                        <ChevronRight size={14} className="text-accent-green animate-pulse" />
                        <span>Passionate about solving complex security challenges</span>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
