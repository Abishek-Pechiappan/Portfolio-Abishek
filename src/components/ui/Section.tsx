import React from 'react';
import clsx from 'clsx';

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

const Section = ({ id, className, children }: SectionProps) => {
    return (
        <section
            id={id}
            className={clsx("py-12 md:py-20 lg:py-32 relative", className)}
        >
            {/* Top fade — blends section into whatever is above it */}
            <div className="absolute top-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-b from-cyber-black to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20">
                {children}
            </div>

            {/* Bottom fade — melts section into whatever is below it */}
            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-cyber-black to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Section;
