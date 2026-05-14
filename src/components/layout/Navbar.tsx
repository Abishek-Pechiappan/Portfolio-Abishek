"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Code, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Scroll progress
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
            setIsScrolled(scrollTop > 50);

            // Active section detection
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = scrollTop + window.innerHeight / 3;

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveSection(navItems[index].id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Escape key to close mobile menu
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen || !mobileMenuRef.current) return;

        const focusableElements = mobileMenuRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement?.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isMobileMenuOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}
                aria-label="Main navigation"
                role="navigation"
            >
                <div className="relative">
                    {/* Background blur */}
                    <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-xl rounded-full border border-white/10" />

                    {/* Nav items */}
                    <div className="relative flex items-center gap-1 px-2 py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${isActive
                                            ? 'text-accent-green'
                                            : 'text-text-muted hover:text-text-primary'
                                        }`}
                                    aria-label={`Navigate to ${item.label} section`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavBg"
                                            className="absolute inset-0 bg-accent-green/10 rounded-full border border-accent-green/30"
                                            transition={{ type: 'spring', duration: 0.5 }}
                                        />
                                    )}
                                    <Icon size={14} className="relative z-10" aria-hidden="true" />
                                    <span className="relative z-10 hidden lg:inline">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 md:hidden" aria-label="Mobile navigation" role="navigation">
                {/* Mobile header */}
                <div className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${isScrolled ? 'bg-cyber-black/90 backdrop-blur-lg border-b border-white/5' : ''}`}>
                    <div className="font-mono text-sm font-bold text-accent-green" aria-label="Abishek Pechiappan initials">AP</div>
                    <button
                        ref={menuButtonRef}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-primary rounded-lg hover:bg-white/5 transition-colors"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>

                {/* Mobile menu overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-cyber-black/60 backdrop-blur-sm z-40"
                                aria-hidden="true"
                            />

                            {/* Menu */}
                            <motion.div
                                ref={mobileMenuRef}
                                id="mobile-menu"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="absolute top-full left-0 right-0 bg-cyber-black/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50"
                                role="menu"
                                aria-label="Mobile navigation menu"
                            >
                                <div className="flex flex-col p-4 gap-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeSection === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${isActive
                                                        ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
                                                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                                                    }`}
                                                role="menuitem"
                                                aria-label={`Navigate to ${item.label} section`}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                <Icon size={18} aria-hidden="true" />
                                                <span>{item.label}</span>
                                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent-green ml-auto animate-pulse" aria-label="Current section" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
