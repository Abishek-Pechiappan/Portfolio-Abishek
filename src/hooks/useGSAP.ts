'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for GSAP animations in React
 * Handles cleanup automatically when component unmounts
 *
 * Usage:
 * const containerRef = useGSAP(() => {
 *   gsap.to('.element', { x: 100 });
 * });
 *
 * @param animationFunction - Function containing GSAP animations
 * @param dependencies - Array of dependencies (like useEffect)
 * @returns ref to attach to container element
 */
export function useGSAP(
  animationFunction: (context: gsap.Context) => void,
  dependencies: any[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      animationFunction(ctx);
    }, containerRef);

    // Cleanup function - kills all animations in this context
    return () => ctx.revert();
  }, dependencies);

  return containerRef;
}
