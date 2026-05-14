// GSAP Setup - Configuration for the entire project
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Register GSAP plugins
 * Plugins extend GSAP's capabilities
 */
export function registerGSAPPlugins() {
  // Register ScrollTrigger plugin for scroll-based animations
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP configuration defaults
 * These settings apply to ALL animations unless overridden
 */
export function configureGSAP() {
  // Set global defaults
  gsap.defaults({
    ease: 'power2.inOut',  // Smooth easing curve
    duration: 1,            // Default 1 second animations
  });

  // Disable GSAP's CSS prefixing (Next.js handles this)
  gsap.config({
    autoSleep: 60,          // Pause after 60s of inactivity (performance)
    force3D: true,          // Use GPU acceleration
  });
}

/**
 * Initialize GSAP
 * Call this once when the app loads
 */
export function initGSAP() {
  registerGSAPPlugins();
  configureGSAP();
}
