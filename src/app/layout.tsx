import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abishek Pechiappan | Cyber-Student",
  description: "Cybersecurity Portfolio - Security Researcher, Threat Analyst, Penetration Tester",
  keywords: ["cybersecurity", "portfolio", "security researcher", "penetration testing", "threat analysis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          inter.variable,
          jetbrainsMono.variable,
          "antialiased bg-cyber-black text-text-primary min-h-screen",
          "selection:bg-accent-green selection:text-cyber-black",
          "noise-overlay crt-lines" // Add cyber overlays
        )}
      >
        {children}
      </body>
    </html>
  );
}
