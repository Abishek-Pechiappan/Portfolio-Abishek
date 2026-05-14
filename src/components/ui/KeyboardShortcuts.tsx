"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

const KeyboardShortcuts = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Open with '?' or close with 'Escape'
            if (e.key === '?' && !isOpen) {
                e.preventDefault();
                setIsOpen(true);
            } else if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const shortcuts = [
        {
            category: 'Navigation',
            items: [
                { keys: ['Tab'], description: 'Navigate between interactive elements' },
                { keys: ['Shift', 'Tab'], description: 'Navigate backwards' },
                { keys: ['Enter'], description: 'Activate buttons and links' },
                { keys: ['Esc'], description: 'Close modals and panels' },
            ]
        },
        {
            category: 'Projects Section',
            items: [
                { keys: ['←', '→'], description: 'Navigate between projects (left/right)' },
                { keys: ['↑', '↓'], description: 'Navigate between projects (up/down)' },
                { keys: ['Enter'], description: 'View project details' },
                { keys: ['Space'], description: 'View project details' },
                { keys: ['Esc'], description: 'Close project details panel' },
            ]
        },
        {
            category: 'General',
            items: [
                { keys: ['?'], description: 'Show this keyboard shortcuts help' },
                { keys: ['Esc'], description: 'Close this help modal' },
            ]
        }
    ];

    return (
        <>
            {/* Help Button - Fixed position */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-accent-green/10 border border-accent-green/30 rounded-lg text-accent-green hover:bg-accent-green/20 transition-all shadow-[0_0_20px_rgba(0,255,156,0.2)] hover:shadow-[0_0_30px_rgba(0,255,156,0.4)]"
                aria-label="Show keyboard shortcuts"
                title="Keyboard shortcuts (?)"
            >
                <Keyboard size={20} />
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-cyber-black/80 backdrop-blur-md z-[100]"
                            aria-hidden="true"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto glass-panel rounded-2xl p-8 z-[101]"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="shortcuts-title"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
                                        <Keyboard className="text-accent-green" size={20} />
                                    </div>
                                    <h2 id="shortcuts-title" className="text-2xl font-bold text-text-primary">
                                        Keyboard Shortcuts
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                    aria-label="Close keyboard shortcuts"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Shortcuts List */}
                            <div className="space-y-8">
                                {shortcuts.map((section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                        <h3 className="text-accent-green font-mono text-sm uppercase tracking-widest mb-4">
                                            {section.category}
                                        </h3>
                                        <div className="space-y-3">
                                            {section.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-cyber-black/50 border border-white/5">
                                                    <span className="text-text-secondary text-sm">
                                                        {item.description}
                                                    </span>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        {item.keys.map((key, keyIndex) => (
                                                            <React.Fragment key={keyIndex}>
                                                                {keyIndex > 0 && (
                                                                    <span className="text-text-muted text-xs">+</span>
                                                                )}
                                                                <kbd className="px-3 py-1.5 min-w-[36px] text-center bg-cyber-card border border-accent-green/30 rounded text-accent-green font-mono text-xs shadow-[0_0_10px_rgba(0,255,156,0.1)]">
                                                                    {key}
                                                                </kbd>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-text-muted text-sm font-mono">
                                    Press <kbd className="px-2 py-1 bg-cyber-card border border-accent-green/30 rounded text-accent-green text-xs">?</kbd> anytime to view shortcuts
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default KeyboardShortcuts;
