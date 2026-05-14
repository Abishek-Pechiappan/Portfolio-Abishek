"use client";

import React from 'react';

interface SectionDividerProps {
    accent?: 'green' | 'cyan' | 'purple';
    label?: string; // kept for backwards compatibility, not rendered
}

const colorMap = {
    green:  'rgba(0,255,156,0.07)',
    cyan:   'rgba(0,188,212,0.07)',
    purple: 'rgba(139,92,246,0.07)',
};

const SectionDivider = ({ accent = 'green' }: SectionDividerProps) => (
    <div
        aria-hidden="true"
        className="pointer-events-none select-none h-28"
        style={{
            background: `linear-gradient(to bottom, transparent, ${colorMap[accent]}, transparent)`,
        }}
    />
);

export default SectionDivider;
