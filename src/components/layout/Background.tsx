'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { initGSAP } from '@/utils/gsap/setup';

const Background = () => {
  const aurora1Ref = useRef<HTMLDivElement>(null);
  const aurora2Ref = useRef<HTMLDivElement>(null);
  const aurora3Ref = useRef<HTMLDivElement>(null);
  const aurora4Ref = useRef<HTMLDivElement>(null);
  const aurora5Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    initGSAP();

    const tl = gsap.timeline({ repeat: -1 });
    timelineRef.current = tl;

    // Aurora blobs — GSAP kept only for these (smooth, organic movement)
    tl.to(aurora1Ref.current, { x: 100, y: 80, scale: 1.2, opacity: 0.2, duration: 20, ease: 'sine.inOut' }, 0);
    tl.to(aurora2Ref.current, { x: -120, y: 60, scale: 1.15, opacity: 0.18, duration: 20, ease: 'sine.inOut' }, 2);
    tl.to(aurora3Ref.current, { x: -80, y: -100, scale: 1.1, opacity: 0.12, duration: 20, ease: 'sine.inOut' }, 4);
    tl.to(aurora4Ref.current, { x: -60, y: 40, scale: 1.08, opacity: 0.06, duration: 20, ease: 'sine.inOut' }, 1);
    tl.to(aurora5Ref.current, { x: 50, y: -30, scale: 1.12, opacity: 0.06, duration: 20, ease: 'sine.inOut' }, 3);

    // Grid drift
    tl.to(gridRef.current, {
      x: 60, y: 60, duration: 25, ease: 'none', repeat: -1,
      modifiers: { x: gsap.utils.wrap(-60, 60), y: gsap.utils.wrap(-60, 60) },
    }, 0);

    // Scanline sweep
    tl.to(scanlineRef.current, { y: '100vh', duration: 4, ease: 'none', repeat: -1, repeatDelay: 0.5 }, 0);

    // Pause GSAP when the tab is hidden — saves CPU/GPU on background tabs
    const handleVisibility = () => {
      if (document.hidden) tl.pause();
      else tl.resume();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      tl.kill();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div>
      {/* Aurora blobs — blur values halved from original (120px→70px, 100px→60px) */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div ref={aurora1Ref} className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-green/15 blur-[70px]" />
        <div ref={aurora2Ref} className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent-cyan/15 blur-[60px]" />
        <div ref={aurora3Ref} className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-purple/10 blur-[60px]" />
        <div ref={aurora4Ref} className="absolute top-[20%] left-[60%] w-[25vw] h-[25vw] rounded-full bg-accent-green/5 blur-[50px]" />
        <div ref={aurora5Ref} className="absolute top-[70%] right-[30%] w-[20vw] h-[20vw] rounded-full bg-accent-cyan/5 blur-[40px]" />
      </div>

      {/* Cyber grid */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,156,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,156,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black via-transparent to-cyber-black opacity-50" />
      </div>

      {/* Binary rain — reduced from 12 to 6 streams, CSS animation (GPU composited) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <BinaryStream key={i} index={i} />
        ))}
      </div>

      {/* Hex codes — CSS animation instead of GSAP */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {['0x4F7A', '0xB2E9', '0x91C3', '0x6A8D', '0xF3D1', '0x2C7B'].map((hex, i) => (
          <div
            key={hex}
            className="animate-hex-flicker absolute font-mono text-[10px] text-accent-green/20"
            style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 30}%`, animationDelay: `${i * 0.8}s` }}
          >
            {hex}
          </div>
        ))}
      </div>

      {/* Corner brackets — static, no animation needed */}
      <div className="fixed top-8 left-8 z-0 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--accent-green)" strokeWidth="2">
          <path d="M0 15 L0 0 L15 0" />
        </svg>
      </div>
      <div className="fixed top-8 right-8 z-0 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--accent-green)" strokeWidth="2">
          <path d="M40 15 L40 0 L25 0" />
        </svg>
      </div>
      <div className="fixed bottom-8 left-8 z-0 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--accent-green)" strokeWidth="2">
          <path d="M0 25 L0 40 L15 40" />
        </svg>
      </div>
      <div className="fixed bottom-8 right-8 z-0 pointer-events-none opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--accent-green)" strokeWidth="2">
          <path d="M40 25 L40 40 L25 40" />
        </svg>
      </div>

      {/* Scanline */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          ref={scanlineRef}
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-accent-green to-transparent"
          style={{ top: '-2px' }}
        />
      </div>
    </div>
  );
};

// 6 streams spread evenly, using the existing CSS animate-binary class
const BinaryStream = ({ index }: { index: number }) => {
  const chars = ['0', '1', '0', '1', '1', '0', '1', '0', '0', '1'];
  return (
    <div
      className="animate-binary absolute top-0 flex flex-col gap-2 text-[10px] font-mono text-accent-green/20"
      style={{
        left: `${5 + index * 16}%`,
        animationDuration: `${12 + index * 0.5}s`,
        animationDelay: `${index * 0.5}s`,
      }}
    >
      {chars.map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </div>
  );
};

export default Background;
