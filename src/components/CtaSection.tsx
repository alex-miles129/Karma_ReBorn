'use client';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function CtaSection() {
  const { data: session } = useSession();
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = "One of FiveM's most watched GTA RP servers. Built for serious roleplayers, content creators, and streamers who want a world worth sharing. Apply for the whitelist or if you're new to GTA RP, get started on one of our public servers.";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const runTypewriter = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          setIsTypingComplete(currentIndex === fullText.length);
          currentIndex += 1;
          timer = setTimeout(runTypewriter, 20); // Snappy typing speed (20ms/char)
        } else {
          // Pause at complete text before starting backspace
          isDeleting = true;
          timer = setTimeout(runTypewriter, 4000); // Hold complete text for 4 seconds
        }
      } else {
        // Deleting (backspacing) phase character by character
        if (currentIndex > 0) {
          currentIndex -= 1;
          setTypedText(fullText.slice(0, currentIndex));
          setIsTypingComplete(false);
          timer = setTimeout(runTypewriter, 10); // Snappy backspacing speed (10ms/char)
        } else {
          // Pause at empty before restarting type loop
          isDeleting = false;
          timer = setTimeout(runTypewriter, 1000); // Hold blank space for 1 second
        }
      }
    };

    runTypewriter();

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      className="relative z-10 w-full overflow-hidden py-24 sm:py-32 border-t border-border/20 -mt-6"
      style={{
        clipPath: 'polygon(0 24px, calc(50% - 500px) 24px, calc(50% - 476px) 0, calc(50% - 176px) 0, calc(50% - 152px) 24px, calc(50% + 152px) 24px, calc(50% + 176px) 0, calc(50% + 476px) 0, calc(50% + 500px) 24px, 100% 24px, 100% 100%, calc(50% + 174px) 100%, calc(50% + 150px) calc(100% - 24px), calc(50% - 150px) calc(100% - 24px), calc(50% - 174px) 100%, 0 100%)'
      }}
    >
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hud-rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-hud-rotate-cw {
          animation: hud-rotate-clockwise 25s linear infinite;
        }
        @keyframes hud-rotate-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-hud-rotate-ccw {
          animation: hud-rotate-counter 20s linear infinite;
        }
        @keyframes wave-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        .animate-wave-flow {
          animation: wave-flow 4s linear infinite;
        }
      `}} />
      
      {/* Glass Backdrop */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-md pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-35 pointer-events-none" />

      {/* LEFT ACCENT: City Sector Radar Mapping Grid (Survival Collapsing City Theme) */}
      <div className="absolute inset-y-0 left-0 w-1/3 hidden xl:block pointer-events-none overflow-hidden z-20">
        <svg 
          className="absolute -left-12 top-1/2 -translate-y-1/2 w-80 h-80 text-red-500/35 drop-shadow-[0_0_10px_rgba(239,68,68,0.25)]" 
          viewBox="0 0 100 100"
        >


          {/* Map Grid Lines */}
          <path d="M 10 0 L 10 100 M 30 0 L 30 100 M 50 0 L 50 100 M 70 0 L 70 100 M 90 0 L 90 100 M 0 10 L 100 10 M 0 30 L 100 30 M 0 50 L 100 50 M 0 70 L 100 70 M 0 90 L 100 90" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />
          
          {/* City Street Blocks */}
          <rect x="15" y="15" width="10" height="10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          <rect x="35" y="15" width="15" height="10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          <rect x="55" y="35" width="30" height="10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          <rect x="15" y="55" width="10" height="30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          <rect x="35" y="55" width="30" height="10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          
          {/* Sonar Sweep Circle */}
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.6" strokeDasharray="4,4" />
          
          {/* Rotating Scan Line */}
          <line 
            x1="50" y1="50" x2="95" y2="50" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="origin-center animate-hud-rotate-cw" 
          />
          
          {/* Blinking signal nodes */}
          <circle cx="80" cy="50" r="2.5" fill="currentColor" className="animate-ping" />
          <circle cx="25" cy="70" r="2" fill="currentColor" className="animate-ping" style={{ animationDelay: '1.5s' }} />
          
          {/* HUD Brackets */}
          <path d="M 5 5 L 12 5 M 5 5 L 5 12" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 95 5 L 88 5 M 95 5 L 95 12" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 5 95 L 12 95 M 5 95 L 5 88" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 95 95 L 88 95 M 95 95 L 95 88" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* RIGHT ACCENT: Encrypted Network Frequency Oscilloscope Waveform */}
      <div className="absolute inset-y-0 right-0 w-1/3 hidden xl:block pointer-events-none overflow-hidden z-20">
        <svg 
          className="absolute -right-12 top-1/2 -translate-y-1/2 w-80 h-80 text-red-500/35 drop-shadow-[0_0_10px_rgba(239,68,68,0.25)]" 
          viewBox="0 0 100 100"
        >
          {/* Waveform signal bars */}
          <g opacity="0.3" stroke="currentColor" strokeWidth="0.75">
            <line x1="10" y1="90" x2="10" y2="60" />
            <line x1="15" y1="90" x2="15" y2="40" />
            <line x1="20" y1="90" x2="20" y2="50" />
            <line x1="25" y1="90" x2="25" y2="30" />
            <line x1="30" y1="90" x2="30" y2="70" />
            <line x1="35" y1="90" x2="35" y2="80" />
            
            <line x1="65" y1="10" x2="65" y2="40" />
            <line x1="70" y1="10" x2="70" y2="55" />
            <line x1="75" y1="10" x2="75" y2="30" />
            <line x1="80" y1="10" x2="80" y2="70" />
            <line x1="85" y1="10" x2="85" y2="50" />
            <line x1="90" y1="10" x2="90" y2="35" />
          </g>
          
          {/* Oscilloscope flowing waves */}
          <path 
            d="M 5,50 Q 25,20 45,50 T 85,50 T 95,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeDasharray="20 20" 
            className="animate-wave-flow" 
            opacity="0.8" 
          />
          <path 
            d="M 5,50 Q 25,80 45,50 T 85,50 T 95,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeDasharray="15 15" 
            className="animate-wave-flow" 
            style={{ animationDirection: 'reverse', animationDuration: '6s' }}
            opacity="0.5" 
          />
          
          {/* Compass Rings */}
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,2" fill="none" opacity="0.3" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
          
          {/* Encryption Target Box */}
          <rect x="40" y="44" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="0.75" className="animate-pulse" />
          <text 
            x="50" y="52" 
            fontSize="5" 
            fontWeight="bold" 
            fontFamily="monospace" 
            fill="currentColor" 
            textAnchor="middle" 
            className="animate-pulse"
          >
            SYS_LOCK
          </text>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Console Frame */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-950/40 border border-white/5 backdrop-blur-xl p-8 sm:p-12 md:p-16 relative overflow-hidden text-center flex flex-col items-center">
          
          {/* Laser Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-500/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500/40" />
          
          {/* Signal Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-zinc-950/80 border border-red-500/20 text-red-500/80 text-[9px] font-mono tracking-[0.25em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            [ESTABLISHING UPLINK BROADCASTING: SECTOR_ITRP]
          </div>

          {/* Left/Right Telemetry Data inside the panel on Desktop */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 font-mono text-[9px] text-zinc-400 text-left border-l border-zinc-800/80 pl-4">
            <div>
              <span className="text-zinc-500 block">SECTOR_COORD</span>
              <span className="text-zinc-200">28° 37' 0" N / 77° 12' 0" E</span>
            </div>
            <div>
              <span className="text-zinc-500 block">NET_PROTOCOL</span>
              <span className="text-zinc-200">PROTO-ZERO // ACTIVE</span>
            </div>
            <div>
              <span className="text-zinc-500 block">WHITELIST_GATE</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-450 animate-pulse" />
                ONLINE_SYNCED
              </span>
            </div>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 font-mono text-[9px] text-zinc-400 text-right border-r border-zinc-800/80 pr-4">
            <div>
              <span className="text-zinc-500 block">PEAK_BANDWIDTH</span>
              <span className="text-zinc-200">99.8% RESPONSE</span>
            </div>
            <div>
              <span className="text-zinc-500 block">CORE_STATUS</span>
              <span className="text-zinc-200">STABLE // RUNNING</span>
            </div>
            <div>
              <span className="text-zinc-500 block">DISCORD_INTEG</span>
              <span className="text-zinc-200">VERIFIED // STANDBY</span>
            </div>
          </div>

          {/* Core Content */}
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-widest font-mono uppercase mb-2">
              GOT A STORY?
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 tracking-widest font-mono uppercase mb-8 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              LET'S WRITE IT TOGETHER
            </h2>
            
            {/* Terminal typed response */}
            <p className="text-gray-300 text-sm sm:text-base mb-10 leading-relaxed font-mono min-h-[120px] sm:min-h-[80px] text-center">
              {typedText}
              {!isTypingComplete && (
                <span className="ml-1 text-red-500 font-extrabold animate-[pulse_0.6s_infinite]">
                  _
                </span>
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mb-8">
              {session?.user ? (
                <Link 
                  href="/applications" 
                  className="flex-1 py-3 px-6 border border-red-500/30 hover:border-red-500 bg-red-950/15 hover:bg-red-500/10 transition-all duration-300 rounded-lg text-white font-bold uppercase tracking-wider text-xs text-center shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center group/btn relative overflow-hidden"
                >
                  <span className="relative z-10">APPLY NOW</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </Link>
              ) : (
                <button 
                  onClick={() => signIn('discord', { callbackUrl: '/applications' })}
                  className="flex-1 py-3 px-6 border border-red-500/30 hover:border-red-500 bg-red-950/15 hover:bg-red-500/10 transition-all duration-300 rounded-lg text-white font-bold uppercase tracking-wider text-xs text-center shadow-[0_0_15px_rgba(239,68,68,0.08)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center group/btn relative overflow-hidden"
                >
                  <span className="relative z-10">APPLY NOW</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </button>
              )}
              <Link 
                href="/rules" 
                className="flex-1 py-3 px-6 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-white/[0.02] transition-all duration-300 rounded-lg text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-xs text-center flex items-center justify-center"
              >
                CHECK THE RULES
              </Link>
            </div>
            
            <p className="text-[9px] sm:text-xs tracking-[0.2em] text-zinc-600 font-mono font-bold">
              SYSTEM_RULES_UPDATED: 08_APRIL_2026
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
