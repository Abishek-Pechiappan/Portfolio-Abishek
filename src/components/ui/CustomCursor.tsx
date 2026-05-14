"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement);
                setIsPointer(
                    computedStyle.cursor === 'pointer' ||
                    hoveredElement.tagName === 'A' ||
                    hoveredElement.tagName === 'BUTTON' ||
                    hoveredElement.closest('a') !== null ||
                    hoveredElement.closest('button') !== null
                );
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousemove', updateCursorType);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousemove', updateCursorType);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [position.x, position.y]);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isClicking ? 0.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
                <div className={`w-2 h-2 rounded-full ${isPointer ? 'bg-accent-cyan' : 'bg-accent-green'} transition-colors duration-200`} />
            </motion.div>

            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
                <div className={`w-10 h-10 rounded-full border ${isPointer ? 'border-accent-cyan/50' : 'border-accent-green/30'} transition-colors duration-200`} />
            </motion.div>

            {/* Cursor trail */}
            <motion.div
                className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
                animate={{
                    x: position.x - 2,
                    y: position.y - 2,
                    opacity: isHidden ? 0 : 0.3,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="w-1 h-1 rounded-full bg-accent-green blur-sm" />
            </motion.div>
        </>
    );
};

export default CustomCursor;
