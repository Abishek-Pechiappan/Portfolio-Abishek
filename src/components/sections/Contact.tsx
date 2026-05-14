"use client";

import React, { useState, FormEvent } from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import {
    Send, Mail, CheckCircle, XCircle, Loader2,
    Copy, Check, Github, Linkedin, MapPin, Clock, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const FORMSPREE_URL = 'https://formspree.io/f/mzdajwel';
const EMAIL       = 'abishekpechiappan@gmail.com';
const GITHUB_URL  = 'https://github.com/Abishek-Pechiappan';
const LINKEDIN_URL = 'https://www.linkedin.com/in/abishek-pechiappan-638795290';

// ─── Right panel ──────────────────────────────────────────────────────────────
const ContactInfo = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    return (
        <div className="flex flex-col gap-4 h-full">

            {/* Identity card */}
            <div className="glass-panel rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyber-black/90 border border-accent-green/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,156,0.15)] shrink-0">
                        <span className="font-bold text-lg text-accent-green">AP</span>
                    </div>
                    <div>
                        <div className="font-bold text-text-primary text-sm">Abishek Pechiappan</div>
                        <div className="text-xs text-accent-cyan font-mono">Cybersecurity Student</div>
                    </div>
                </div>
                <div className="space-y-2 font-mono text-xs border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2 text-text-muted">
                        <MapPin size={12} className="text-accent-cyan shrink-0" />
                        <span>Chennai, Tamil Nadu</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-accent-green">Open to opportunities</span>
                    </div>
                </div>
            </div>

            {/* Section label */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] shrink-0">
                    Direct Contact
                </span>
                <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Email + copy */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-cyber-dark/60 border border-white/5 hover:border-accent-green/20 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-accent-green" />
                </div>
                <span className="text-[11px] text-text-secondary font-mono flex-1 truncate">{EMAIL}</span>
                <button
                    onClick={handleCopy}
                    className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-accent-green/10 transition-colors shrink-0"
                    aria-label="Copy email address"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Check size={13} className="text-accent-green" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Copy size={13} className="text-text-muted group-hover:text-accent-green transition-colors" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* LinkedIn */}
            <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-cyber-dark/60 border border-white/5 hover:border-accent-cyan/30 transition-colors group"
            >
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                    <Linkedin size={14} className="text-accent-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-text-primary">LinkedIn</div>
                    <div className="text-[10px] text-text-muted font-mono">Abishek Pechiappan</div>
                </div>
                <ChevronRight size={14} className="text-text-muted group-hover:text-accent-cyan transition-colors shrink-0" />
            </a>

            {/* GitHub */}
            <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-cyber-dark/60 border border-white/5 hover:border-white/20 transition-colors group"
            >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Github size={14} className="text-text-muted group-hover:text-text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-text-primary">GitHub</div>
                    <div className="text-[10px] text-text-muted font-mono">Abishek-Pechiappan</div>
                </div>
                <ChevronRight size={14} className="text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
            </a>

            {/* Response time */}
            <div className="mt-auto flex items-center gap-3 p-3.5 rounded-xl bg-accent-green/5 border border-accent-green/15">
                <Clock size={14} className="text-accent-green shrink-0" />
                <div>
                    <div className="text-xs font-semibold text-text-primary">Response time</div>
                    <div className="text-[10px] text-text-muted font-mono">Usually within 24 hours</div>
                </div>
            </div>
        </div>
    );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const Contact = () => {
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('loading');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setFormStatus('success');
                form.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setFormStatus('error');
            setErrorMessage('Failed to send message. Please try again or contact directly via email.');
        }
    };

    const inputClass = "w-full bg-cyber-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-accent-green focus:outline-none focus:shadow-[0_0_12px_rgba(0,255,156,0.1)] transition-all placeholder:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";
    const labelClass = "text-xs font-mono text-accent-cyan uppercase tracking-wider";

    return (
        <Section id="contact" className="pb-32">
            <div className="glass-panel max-w-5xl mx-auto rounded-2xl md:rounded-3xl relative overflow-hidden">

                {/* Top glow border */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-green to-transparent" />

                {/* Header */}
                <div className="text-center px-6 sm:px-10 pt-10 sm:pt-14 pb-8">
                    <span className="text-accent-green font-mono text-sm tracking-widest uppercase mb-3 block">
                        Contact
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                        Get In <span className="text-white">Touch</span>
                    </h2>
                    <p className="text-text-secondary text-base sm:text-lg">
                        Open to internships, collaborations, and entry-level opportunities.
                    </p>
                </div>

                {/* Horizontal rule */}
                <div className="h-px bg-white/5" />

                {/* Split body */}
                <div className="grid md:grid-cols-5">

                    {/* Left — Form */}
                    <div className="md:col-span-3 p-6 sm:p-8 md:p-10">

                        {/* Success */}
                        <AnimatePresence>
                            {formStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-accent-green/10 border border-accent-green/30 rounded-xl flex items-center gap-3"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    <CheckCircle className="text-accent-green w-5 h-5 shrink-0" aria-hidden="true" />
                                    <div>
                                        <h3 className="text-accent-green font-mono font-bold text-sm mb-0.5">Message Transmitted!</h3>
                                        <p className="text-text-secondary text-xs">I'll get back to you soon.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error */}
                        <AnimatePresence>
                            {formStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                                    role="alert"
                                    aria-live="assertive"
                                >
                                    <div className="flex items-start gap-3">
                                        <XCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                                        <div className="flex-1">
                                            <h3 className="text-red-500 font-mono font-bold text-sm mb-1">Transmission Failed</h3>
                                            <p className="text-text-secondary text-xs mb-3">{errorMessage}</p>
                                            <button
                                                onClick={() => setFormStatus('idle')}
                                                className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500 text-xs font-mono hover:bg-red-500/30 transition-colors"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form
                            action={FORMSPREE_URL}
                            method="POST"
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            aria-label="Contact form"
                        >
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="name" className={labelClass}>
                                        Name <span className="text-red-500" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        minLength={2}
                                        disabled={formStatus === 'loading'}
                                        aria-required="true"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className={labelClass}>
                                        Email <span className="text-red-500" aria-label="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        required
                                        disabled={formStatus === 'loading'}
                                        aria-required="true"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className={labelClass}>Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Project Inquiry"
                                    disabled={formStatus === 'loading'}
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className={labelClass}>
                                    Message <span className="text-red-500" aria-label="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    placeholder="Your message here..."
                                    required
                                    minLength={10}
                                    disabled={formStatus === 'loading'}
                                    aria-required="true"
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            {/* Formspree spam protection */}
                            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                            <Button
                                type="submit"
                                className="w-full justify-center"
                                icon={formStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                disabled={formStatus === 'loading'}
                                aria-busy={formStatus === 'loading'}
                            >
                                {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>

                    {/* Right — Info (border-t on mobile, border-l on desktop) */}
                    <div className="md:col-span-2 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-white/5">
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
