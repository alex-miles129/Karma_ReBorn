'use client';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

export function CtaSection() {
  const { data: session } = useSession();
  
  return (
    <section 
      className="relative z-10 w-full overflow-hidden py-24 sm:py-32 border-t border-border/20 -mt-6"
      style={{
        clipPath: 'polygon(0 24px, calc(50% - 500px) 24px, calc(50% - 476px) 0, calc(50% - 176px) 0, calc(50% - 152px) 24px, calc(50% + 152px) 24px, calc(50% + 176px) 0, calc(50% + 476px) 0, calc(50% + 500px) 24px, 100% 24px, 100% 100%, calc(50% + 174px) 100%, calc(50% + 150px) calc(100% - 24px), calc(50% - 150px) calc(100% - 24px), calc(50% - 174px) 100%, 0 100%)'
      }}
    >
      
      {/* Masked Glass Background */}
      <div 
        className="absolute inset-0 bg-background/40 backdrop-blur-md pointer-events-none"
        style={{
          maskImage: 'url(#cta-hex-mask)',
          WebkitMaskImage: 'url(#cta-hex-mask)',
        }}
      />

      {/* SVG Definitions & Hexagon Outlines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <polygon id="cta-hex" points="-50,-86.6 50,-86.6 100,0 50,86.6 -50,86.6 -100,0" />
          <g id="cta-hex-cluster-left">
            <use href="#cta-hex" x="0" y="0" />
            <use href="#cta-hex" x="-152" y="-88" />
            <use href="#cta-hex" x="152" y="-88" />
            <use href="#cta-hex" x="-152" y="88" />
            <use href="#cta-hex" x="152" y="88" />
            <use href="#cta-hex" x="304" y="0" />
          </g>
          <g id="cta-hex-cluster-right">
            <use href="#cta-hex" x="0" y="0" />
            <use href="#cta-hex" x="-152" y="-88" />
            <use href="#cta-hex" x="152" y="-88" />
            <use href="#cta-hex" x="-152" y="88" />
            <use href="#cta-hex" x="152" y="88" />
            <use href="#cta-hex" x="-304" y="0" />
          </g>
          <mask id="cta-hex-mask">
            <rect width="100%" height="100%" fill="white" />
            <use href="#cta-hex-cluster-left" x="0" y="50%" fill="black" className="invisible xl:visible" />
            <use href="#cta-hex-cluster-right" x="100%" y="50%" fill="black" className="invisible xl:visible" />
          </mask>
        </defs>

        {/* Outlines to enhance the glass cutout effect */}
        <use href="#cta-hex-cluster-left" x="0" y="50%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" className="invisible xl:visible" />
        <use href="#cta-hex-cluster-right" x="100%" y="50%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" className="invisible xl:visible" />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#0c0c18] to-foreground tracking-wider uppercase leading-[1.1] mb-1 font-sans">
            GOT A STORY?
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-950 to-red-600 tracking-wider uppercase leading-[1.1] mb-8 font-sans drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            LET'S WRITE IT<br />TOGETHER
          </h2>
          
          <p className="text-gray-300/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            One of FiveM's most watched GTA RP servers. Built for serious roleplayers, content creators, and streamers who want a world worth sharing. Apply for the whitelist or if you're new to GTA RP, get started on one of our two public servers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-lg mb-10">
            {session?.user ? (
              <Link 
                href="/applications" 
                className="flex-1 py-4 px-6 border-2 border-primary/40 hover:border-primary bg-background/50 hover:bg-primary/10 transition-all rounded-lg text-white font-bold uppercase tracking-widest text-sm text-center shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
              >
                APPLY NOW
              </Link>
            ) : (
              <button 
                onClick={() => signIn('discord', { callbackUrl: '/applications' })}
                className="flex-1 py-4 px-6 border-2 border-primary/40 hover:border-primary bg-background/50 hover:bg-primary/10 transition-all rounded-lg text-white font-bold uppercase tracking-widest text-sm text-center shadow-[0_0_15px_rgba(255,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
              >
                APPLY NOW
              </button>
            )}
            <Link 
              href="/rules" 
              className="flex-1 py-4 px-6 border-2 border-border hover:border-border/80 bg-background/50 hover:bg-accent transition-all rounded-lg text-white font-bold uppercase tracking-widest text-sm text-center"
            >
              CHECK THE RULES
            </Link>
          </div>
          
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase font-bold">
            RULES LAST UPDATED: APRIL 8, 2026
          </p>
          
        </div>
      </div>
    </section>
  );
}
