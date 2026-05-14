import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent-green focus:text-cyber-black focus:font-mono focus:text-sm focus:uppercase focus:tracking-wider focus:rounded-lg focus:shadow-[0_0_20px_rgba(0,255,156,0.6)] focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-cyber-black"
      >
        Skip to Content
      </a>

      <main className="relative min-h-screen">
        <Background />
        <Navbar />

        <div id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>

        <Footer />
      </main>
    </>
  );
}
