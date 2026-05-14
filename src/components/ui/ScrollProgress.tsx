"use client";

import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
            setScrollPercent(percent);
        };

        handleScroll(); // Initial call
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-5 right-5 z-50 hidden lg:block">
            {/* Progress Indicator */}
            <div className="font-mono text-sm font-bold text-accent-green bg-cyber-black/80 backdrop-blur-sm px-4 py-2 border-2 border-accent-green rounded shadow-[0_0_20px_rgba(0,255,156,0.3)]">
                <span className="text-accent-cyan">[</span>
                <span className="text-accent-green mr-1">SCROLL:</span>
                <span className="text-white min-w-[3ch] inline-block text-right">{scrollPercent}</span>
                <span className="text-accent-cyan">%]</span>
            </div>
        </div>
    );
};

export default ScrollProgress;
