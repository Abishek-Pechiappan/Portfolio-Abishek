"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootMessages = [
    '> SYSTEM BOOT INITIATED...',
    '> LOADING SECURITY MODULES...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> VERIFYING CREDENTIALS...',
    '> INITIALIZING FIREWALL...',
    '> ACCESS GRANTED ✓',
];

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        // Boot messages animation
        const lineInterval = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev >= bootMessages.length) {
                    clearInterval(lineInterval);
                    return bootMessages.length;
                }
                return prev + 1;
            });
        }, 300);

        // Hide loading screen after completion
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(lineInterval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-black"
                >
                    <div className="w-full max-w-md px-5 sm:px-6">
                        {/* Hex Loader Animation */}
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8">
                            <div className="absolute inset-0 border-2 border-t-accent-green border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                            <div className="absolute inset-2 border-2 border-t-transparent border-r-accent-cyan border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                            <div className="absolute inset-4 border-2 border-t-transparent border-r-transparent border-b-accent-green border-l-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                        </div>

                        {/* Boot Sequence */}
                        <div className="font-mono text-[11px] sm:text-sm bg-black/40 border border-accent-green/40 rounded p-3 sm:p-4 mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,255,156,0.1)] overflow-hidden">
                            {bootMessages.slice(0, visibleLines).map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`mb-1 truncate ${index === bootMessages.length - 1 ? 'text-accent-green font-bold' : 'text-accent-cyan'}`}
                                >
                                    {msg}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-5 sm:h-6 bg-black/40 border border-accent-green/40 rounded overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-green via-accent-cyan to-accent-green"
                                style={{ width: `${progress}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xs font-bold text-white drop-shadow-lg">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
