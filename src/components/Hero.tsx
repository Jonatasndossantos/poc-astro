import { useLayoutEffect, useRef, type ComponentProps } from 'react';
import { type Mode } from '../types';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react'; // Changed from phosphor-icons to lucide
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { getProfileData } from '../i18n/data'; // Import data bridge

const heroVariants = tv({
    base: 'relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-20 overflow-hidden pt-32 pb-20',
});

interface HeroProps extends ComponentProps<'section'> {
    mode: Mode;
    locale: string;
}

export default function Hero({ mode, locale, className, ...props }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    // Fetch data synchronously (data is static/JSON)
    const profile = getProfileData(locale);

    // Resolve localized strings based on mode
    const bio = profile.bio[mode] || profile.bio['fullstack']; // fallback
    const role = profile.role[mode] || profile.role['fullstack'];
    const greeting = profile.greeting;
    const exploreWork = profile.exploreWork;
    const scrollText = profile.scroll;
    // const universeText = profile.universeActive.replace('{0}', mode.toUpperCase()); // The json has "// Universe Active", we might need to compose it or just append the mode

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 }); // Reduced delay slightly

            tl.from(headlineRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                skewY: 7
            })
                .from(subRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1")
                .from(ctaRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.8");

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to('.hero-parallax', {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: 'power2.out'
                });
            };

            containerRef.current?.addEventListener('mousemove', handleMouseMove);

            return () => {
                containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            };

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={twMerge(heroVariants(), className)} {...props}>
            <div className="absolute inset-0 z-0 opacity-60 hero-parallax pointer-events-none">
                <iframe
                    src="https://my.spline.design/underwatertransition-PpOEUxeaaBac5MveqlrNIFpt/"
                    className="w-full h-full border-0"
                    title="3D Background"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-0 pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            <div className="relative z-10 max-w-4xl hero-parallax">
                <div className="inline-block px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                    <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">
            // {mode} Universe Active
                    </span>
                </div>

                <h1 ref={headlineRef} className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter text-white mb-6">
                    {greeting} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-glow">Jônatas</span>
                    <br />
                    <span className="opacity-80 text-4xl md:text-6xl font-light">{role}</span>
                </h1>

                <p ref={subRef} className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10 text-pretty">
                    {bio}
                </p>

                <button
                    ref={ctaRef}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {exploreWork} <ArrowDown className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </div>

            <div className="absolute bottom-10 right-10 hidden md:block animate-bounce">
                <div className="text-xs font-mono text-white/30 rotate-90 origin-bottom-right tracking-widest">{scrollText}</div>
            </div>
        </section>
    );
}
