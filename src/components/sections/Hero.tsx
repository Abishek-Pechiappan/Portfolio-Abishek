"use client";

import React from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import Typewriter from '../ui/Typewriter';
import LetterGlitch from '../ui/LetterGlitch';
import { ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen relative overflow-hidden" aria-label="Hero section - Introduction">

            {/* LetterGlitch Background - Balanced visibility */}
            <div className="absolute inset-0 z-0 opacity-60">
                <LetterGlitch
                    glitchColors={['#0a2818', '#00ff9c', '#00bcd4', '#061a10']}
                    glitchSpeed={80}
                    outerVignette={true}
                    centerVignette={false}
                    smooth={true}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>{}[]"
                />
            </div>

            {/* Subtle gradient overlay - lighter for more bg visibility */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-br from-cyber-black/40 via-transparent to-cyber-black/50" />

            {/* Content overlay */}
            <div className="relative z-10 min-h-screen flex items-center justify-center pt-16 pb-24">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl w-full">

                    {/* Top bar with name */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8 md:mb-16 gap-3"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-cyber-black/90 border border-accent-green/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_25px_rgba(0,255,156,0.2)] shrink-0">
                                <span className="font-bold text-base sm:text-xl text-accent-green drop-shadow-[0_0_10px_rgba(0,255,156,0.6)]">AP</span>
                            </div>
                            <div className="bg-cyber-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg min-w-0">
                                <div className="font-mono text-sm sm:text-lg md:text-xl text-text-primary font-bold truncate">Abishek Pechiappan</div>
                                <div className="font-mono text-[10px] sm:text-xs text-accent-cyan uppercase tracking-widest">Cybersecurity Student</div>
                            </div>
                        </div>

                    </motion.div>

                    {/* Main content */}
                    <div className="max-w-4xl">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-6 sm:mb-8">
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green via-accent-cyan to-accent-green shimmer-text inline-block"
                                    style={{
                                        filter: 'drop-shadow(0 0 20px rgba(0,255,156,0.35))'
                                    }}
                                >
                                    Defending Digital
                                </span>
                                <br />
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg sm:text-2xl sm:text-3xl font-mono flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 bg-cyber-black/50 backdrop-blur-sm w-fit px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg"
                        >
                            <span className="text-accent-green glow-text">{">>"}</span>
                            <Typewriter words={['Threat Detection', 'Vulnerability Assessment', 'Incident Response', 'Security Automation', 'Penetration Testing']} />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-text-secondary max-w-2xl text-base sm:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 bg-cyber-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-white/5"
                        >
                            Passionate about identifying vulnerabilities before attackers do.
                            Specializing in <span className="text-accent-green font-medium">network security</span>,
                            <span className="text-accent-cyan font-medium"> SOC operations</span>, and building
                            <span className="text-accent-green font-medium"> automated defense systems</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Button href="#projects" icon={<ChevronRight size={18} />}>
                                view projects
                            </Button>
                            <Button href="#contact" variant="secondary">
                                get in touch
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-4 mt-8 font-mono text-xs text-text-muted bg-cyber-black/50 backdrop-blur-sm w-fit px-4 py-2 rounded-full"
                        >
                            <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-accent-cyan" />
                                <span>India</span>
                            </div>
                            <span className="text-white/20">|</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_8px_rgba(0,255,156,0.8)]" />
                                <span>Open to opportunities</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
