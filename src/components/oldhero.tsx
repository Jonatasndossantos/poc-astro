import { useLayoutEffect, useRef, type ComponentProps } from 'react';
import { type CuratedProfile, type Mode } from '../types';
import gsap from 'gsap';
import { ArrowDown } from '@phosphor-icons/react';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

const heroVariants = tv({
    base: 'relative min-h-screen w-full flex flex-col justify-center px-6 lg:px-20 overflow-hidden pt-32 pb-20',
});

interface HeroProps extends ComponentProps<'section'> {
  profile: CuratedProfile;
  mode: Mode;
  ui: any;
  className?: string;
}

export function Hero({ profile, mode, ui, className, ...props }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

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

      containerRef.current?.addEventListener('mousemove', (e) => {
         const { clientX, clientY } = e;
         const x = (clientX / window.innerWidth - 0.5) * 20;
         const y = (clientY / window.innerHeight - 0.5) * 20;
         
         gsap.to('.hero-parallax', {
             x: x,
             y: y,
             duration: 1,
             ease: 'power2.out'
         });
      });

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
          Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-glow">Jônatas</span>
          <br />
          <span className="opacity-80 text-4xl md:text-6xl font-light">Web Developer.</span>
        </h1>

        <p ref={subRef} className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10 text-pretty">
          {profile.bio}
        </p>

        <button 
          ref={ctaRef}
          onClick={() => document.getElementById('projects')?.scrollIntoView()}
          className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            {ui?.exploreWork} <ArrowDown />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block animate-bounce">
         <div className="text-xs font-mono text-white/30 rotate-90 origin-bottom-right tracking-widest">SCROLL TO NAVIGATE</div>
      </div>
    </section>
  );
}
