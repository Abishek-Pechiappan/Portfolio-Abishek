"use client";

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/Abishek-Pechiappan', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/abishek-pechiappan-638795290', label: 'LinkedIn' },
        { icon: Mail, href: '#contact', label: 'Email' },
    ];

    return (
        <footer className="relative bg-cyber-black border-t border-white/5 overflow-hidden">
            {/* Animated background pulse */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-green/5 blur-[100px] rounded-full" />
            </div>

            {/* Main footer content */}
            <div className="relative container mx-auto px-4 md:px-6 max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Brand column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
                                <Terminal size={22} className="text-accent-green" />
                            </div>
                            <div>
                                <div className="font-mono text-base font-bold text-text-primary">Abishek Pechiappan</div>
                                <div className="font-mono text-xs text-accent-cyan uppercase tracking-widest">Cybersecurity</div>
                            </div>
                        </div>
                        <p className="text-base text-text-muted max-w-xs">
                            Passionate about securing digital infrastructure and building resilient systems.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-6">
                        <h4 className="font-mono text-sm text-accent-green uppercase tracking-widest">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="font-mono text-base text-text-muted hover:text-accent-green transition-colors flex items-center gap-2 group"
                                >
                                    <span className="text-accent-green group-hover:translate-x-1 transition-transform">→</span>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-accent-green uppercase tracking-widest">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target={social.href.startsWith('http') ? '_blank' : undefined}
                                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-cyber-card border border-white/5 rounded-lg text-text-muted hover:text-accent-green hover:border-accent-green/30 hover:shadow-[0_0_15px_rgba(0,255,156,0.1)] transition-all"
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="font-mono text-xs text-text-muted">
                            <span className="text-accent-cyan">$</span> echo "Let's build something secure"
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-sm text-text-muted font-mono">
                        <span>© {currentYear} Abishek Pechiappan.</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Back to top button */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-accent-green/10 border border-accent-green/30 rounded-lg text-accent-green hover:bg-accent-green/20 transition-colors"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-accent-green via-accent-cyan to-accent-green" />
        </footer>
    );
};

export default Footer;
