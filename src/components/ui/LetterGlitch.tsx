"use client";

import { useRef, useEffect } from 'react';

interface Letter {
    char: string;
    color: string;
    targetColor: string;
    colorProgress: number;
    startRgb: { r: number; g: number; b: number } | null;
    endRgb: { r: number; g: number; b: number } | null;
}

interface LetterGlitchProps {
    glitchColors?: string[];
    className?: string;
    glitchSpeed?: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    smooth?: boolean;
    characters?: string;
}

const LetterGlitch = ({
    glitchColors = ['#0a2818', '#00ff9c', '#00bcd4'],
    className = '',
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}: LetterGlitchProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const letters = useRef<Letter[]>([]);
    // Only track letters actively transitioning — avoids iterating all letters every frame
    const transitioningIndices = useRef<Set<number>>(new Set());
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());
    const isVisible = useRef(true);

    const lettersAndSymbols = Array.from(characters);

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () =>
        lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];

    const getRandomColor = () =>
        glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
            : null;
    };

    const interpolateColor = (
        start: { r: number; g: number; b: number },
        end: { r: number; g: number; b: number },
        factor: number
    ) => {
        const r = Math.round(start.r + (end.r - start.r) * factor);
        const g = Math.round(start.g + (end.g - start.g) * factor);
        const b = Math.round(start.b + (end.b - start.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        letters.current = Array.from({ length: columns * rows }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1,
            startRgb: null,
            endRgb: null,
        }));
        transitioningIndices.current.clear();
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        // Cap DPR at 1.5 — high-density screens (2x, 3x) don't need full resolution for this effect
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        if (context.current) {
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const columns = Math.ceil(rect.width / charWidth);
        const rows = Math.ceil(rect.height / charHeight);
        initializeLetters(columns, rows);
        drawLetters();
    };

    const drawLetters = () => {
        if (!context.current || letters.current.length === 0 || !canvasRef.current) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        // Update 3% of letters per tick (down from 5%) for less CPU churn
        const updateCount = Math.max(1, Math.floor(letters.current.length * 0.03));

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            const letter = letters.current[index];
            if (!letter) continue;

            letter.char = getRandomChar();
            letter.targetColor = getRandomColor();

            if (!smooth) {
                letter.color = letter.targetColor;
                letter.colorProgress = 1;
            } else {
                // Cache RGB at transition start — no more hex parsing every frame
                letter.startRgb = hexToRgb(letter.color);
                letter.endRgb = hexToRgb(letter.targetColor);
                letter.colorProgress = 0;
                transitioningIndices.current.add(index);
            }
        }
    };

    const handleSmoothTransitions = () => {
        if (transitioningIndices.current.size === 0) return;

        let needsRedraw = false;
        const done: number[] = [];

        transitioningIndices.current.forEach(index => {
            const letter = letters.current[index];
            if (!letter) { done.push(index); return; }

            letter.colorProgress += 0.05;
            if (letter.colorProgress >= 1) {
                letter.colorProgress = 1;
                done.push(index);
            }

            // Use pre-cached RGB — avoids regex on every frame
            if (letter.startRgb && letter.endRgb) {
                letter.color = interpolateColor(letter.startRgb, letter.endRgb, letter.colorProgress);
                needsRedraw = true;
            }
        });

        done.forEach(i => transitioningIndices.current.delete(i));

        if (needsRedraw) drawLetters();
    };

    const animate = () => {
        // Skip all work when the tab is not visible
        if (isVisible.current) {
            const now = Date.now();
            if (now - lastGlitchTime.current >= glitchSpeed) {
                updateLetters();
                drawLetters();
                lastGlitchTime.current = now;
            }

            if (smooth) {
                handleSmoothTransitions();
            }
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext('2d');
        resizeCanvas();
        animate();

        const handleVisibility = () => {
            isVisible.current = !document.hidden;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cancelAnimationFrame(animationRef.current);
                resizeCanvas();
                animate();
            }, 150);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [glitchSpeed, smooth]);

    return (
        <div
            className={className}
            style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#050708', overflow: 'hidden' }}
        >
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            {outerVignette && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle, rgba(5,7,8,0) 40%, rgba(5,7,8,1) 100%)'
                }} />
            )}
            {centerVignette && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle, rgba(5,7,8,0.9) 0%, rgba(5,7,8,0) 60%)'
                }} />
            )}
        </div>
    );
};

export default LetterGlitch;
