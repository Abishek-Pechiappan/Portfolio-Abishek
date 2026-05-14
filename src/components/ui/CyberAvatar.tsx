import React from 'react';

const CyberAvatar = () => {
    return (
        <div className="relative w-full aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 bg-accent-primary/20 blur-[60px] rounded-full" />
            <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(0,255,156,0.2)]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="hoodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(99,102,241,0.3)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(6,0,16,0.9)', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgba(6,0,16,0.8)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(99,102,241,0.2)', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                {/* Hood */}
                <path d="M100 20 L60 80 L60 120 L100 140 L140 120 L140 80 Z" fill="url(#hoodGradient)" stroke="var(--color-accent-green)" strokeWidth="2" />

                {/* Face Shadow */}
                <ellipse cx="100" cy="90" rx="25" ry="35" fill="rgba(0,0,0,0.8)" />

                {/* Glowing Eyes */}
                <circle cx="90" cy="85" r="4" fill="var(--color-accent-green)" className="animate-pulse" />
                <circle cx="110" cy="85" r="4" fill="var(--color-accent-green)" className="animate-pulse" />

                {/* Eye Glow */}
                <circle cx="90" cy="85" r="8" fill="var(--color-accent-green)" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="110" cy="85" r="8" fill="var(--color-accent-green)" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Face Mask */}
                <path d="M85 95 Q100 105 115 95" stroke="var(--color-accent-green)" strokeWidth="1.5" fill="none" opacity="0.6" />

                {/* Body */}
                <path d="M60 120 L50 160 L80 180 L100 175 L120 180 L150 160 L140 120" fill="url(#bodyGradient)" stroke="var(--color-accent-green)" strokeWidth="1.5" opacity="0.8" />

                {/* Tech Dots */}
                <circle cx="75" cy="140" r="3" fill="var(--color-accent-cyan)" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="125" cy="140" r="3" fill="var(--color-accent-cyan)" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* Hex Border */}
                <polygon points="100,10 160,50 160,130 100,170 40,130 40,50" fill="none" stroke="var(--color-accent-green)" strokeWidth="1.5" opacity="0.6" />
                <polygon points="100,10 160,50 160,130 100,170 40,130 40,50" fill="none" stroke="var(--color-accent-cyan)" strokeWidth="1" opacity="0.4" strokeDasharray="10,5">
                    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
                </polygon>
            </svg>

            {/* Floating Code Bits */}
            <div className="absolute top-[20%] left-[10%] text-xs font-mono text-accent-green/50 animate-bounce">0x4F</div>
            <div className="absolute bottom-[30%] right-[10%] text-xs font-mono text-accent-cyan/50 animate-pulse">0xB2</div>
        </div>
    );
};

export default CyberAvatar;
