'use client';
import Link from 'next/link';

type Tier = {
  name: string;
  priority: string;
  price: string;
  color: string;      // Tailwind text color
  borderColor: string;// Tailwind border colors for hover states
  glowColor: string;  // Hex/rgba string for box-shadow glow
  serial: string;
  clearanceLevel: string;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: 'SILVER',
    priority: '+25',
    price: '$25',
    color: 'text-slate-400',
    borderColor: 'border-slate-500/20 group-hover:border-slate-400/50',
    glowColor: 'rgba(148, 163, 184, 0.15)',
    serial: 'ITRP-SEC-SLV-025',
    clearanceLevel: 'CLEARANCE LEVEL I',
    features: [
      '+25 Queue Priority',
      '(stacks with other sources)',
      'Silver member badge on Discord & Web',
    ],
  },
  {
    name: 'GOLD',
    priority: '+40',
    price: '$40',
    color: 'text-amber-500',
    borderColor: 'border-amber-500/20 group-hover:border-amber-500/55',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    serial: 'ITRP-SEC-GLD-040',
    clearanceLevel: 'CLEARANCE LEVEL II',
    features: [
      '+40 Queue Priority',
      '(stacks with other sources)',
      'Gold member badge on Discord & Web',
      '1 Priority Application Review / mo',
      '(appeals & character, 7-day turn)',
    ],
  },
  {
    name: 'EMERALD',
    priority: '+60',
    price: '$60',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20 group-hover:border-emerald-400/55',
    glowColor: 'rgba(52, 211, 153, 0.18)',
    serial: 'ITRP-SEC-EMR-060',
    clearanceLevel: 'CLEARANCE LEVEL III',
    features: [
      '+60 Queue Priority',
      '(stacks with other sources)',
      'Emerald member badge on Discord & Web',
      '1 Priority Application Review / mo',
      '(appeals & character, 7-day turn)',
    ],
  },
  {
    name: 'PLATINUM',
    priority: '+80',
    price: '$80',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20 group-hover:border-cyan-400/55',
    glowColor: 'rgba(34, 211, 238, 0.18)',
    serial: 'ITRP-SEC-PLT-080',
    clearanceLevel: 'CLEARANCE LEVEL IV',
    features: [
      '+80 Queue Priority',
      '(stacks with other sources)',
      'Platinum member badge on Discord & Web',
      '1 Priority Application Review / mo',
      '(appeals & character, 7-day turn)',
    ],
  },
  {
    name: 'DIAMOND',
    priority: '+140',
    price: '$140',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20 group-hover:border-blue-400/55',
    glowColor: 'rgba(96, 165, 250, 0.18)',
    serial: 'ITRP-SEC-DMD-140',
    clearanceLevel: 'CLEARANCE LEVEL V',
    features: [
      '+140 Queue Priority',
      '(stacks with other sources)',
      'Diamond member badge on Discord & Web',
      '1 Priority Application Review / mo',
      '(appeals & character, 7-day turn)',
    ],
  },
  {
    name: 'ONYX',
    priority: '+250',
    price: '$250',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20 group-hover:border-purple-400/55',
    glowColor: 'rgba(192, 132, 252, 0.22)',
    serial: 'ITRP-OPR-ONX-250',
    clearanceLevel: 'OVERLORD ACCESS VI',
    features: [
      '+250 Queue Priority',
      '(stacks with other sources)',
      'Onyx member badge on Discord & Web',
      'Unlimited Priority Application Reviews',
      '(appeals & character, 7-day turn)',
    ],
  },
];

export function StoreSection() {
  return (
    <section 
      className="relative z-10 w-full pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white/[0.03] backdrop-blur-xl border-y border-white/10 -mt-6"
      style={{
        clipPath: 'polygon(0 24px, calc(50% - 500px) 24px, calc(50% - 476px) 0, calc(50% - 176px) 0, calc(50% - 152px) 24px, calc(50% + 152px) 24px, calc(50% + 176px) 0, calc(50% + 476px) 0, calc(50% + 500px) 24px, 100% 24px, 100% 100%, calc(50% + 500px) 100%, calc(50% + 476px) calc(100% - 24px), calc(50% + 176px) calc(100% - 24px), calc(50% + 152px) 100%, calc(50% - 152px) 100%, calc(50% - 176px) calc(100% - 24px), calc(50% - 476px) calc(100% - 24px), calc(50% - 500px) 100%, 0 100%)'
      }}
    >
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { transform: translateY(-10%); }
          50% { transform: translateY(390px); }
          100% { transform: translateY(-10%); }
        }
        .animate-scanline {
          animation: scanline 5s linear infinite;
        }
        @keyframes hud-rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-hud-rotate-cw {
          animation: hud-rotate-clockwise 20s linear infinite;
        }
        @keyframes hud-rotate-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-hud-rotate-ccw {
          animation: hud-rotate-counter 12s linear infinite;
        }
      `}} />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141a_1px,transparent_1px),linear-gradient(to_bottom,#14141a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70 pointer-events-none" />
      
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-zinc-950/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Terminal */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-950 border border-red-500/20 text-red-500/80 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            ITRP SECURE CLEARANCE SYSTEM v1.99
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-widest font-mono mb-2 uppercase">
            Network Clearance
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 tracking-widest font-mono mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase">
            Upgrade Authorization
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Gain elevated operational priority inside the sector. Higher credentials guarantee expedited uplink connectivity during peak hours.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {tiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`relative group flex flex-col h-[420px] rounded-xl bg-zinc-950/60 hover:bg-zinc-950/90 border ${tier.borderColor} transition-all duration-500 hover:-translate-y-2`}
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.01)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 40px ${tier.glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 30px rgba(0, 0, 0, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.01)`;
              }}
            >
              {/* Inner Card Dot Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-50" />

              {/* Scanning Holographic Laser Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
                <div 
                  className={`w-full h-[3px] opacity-0 group-hover:opacity-60 bg-gradient-to-r from-transparent via-current to-transparent absolute top-0 left-0 animate-scanline ${tier.color}`}
                />
              </div>

              {/* Card Header Info */}
              <div className="relative z-10 flex items-start justify-between p-4 pb-2">
                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold tracking-widest ${tier.color}`}>
                    {tier.name}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase">
                    {tier.clearanceLevel}
                  </span>
                </div>
                {/* Access Chip Icon */}
                <div className={`${tier.color} opacity-40 group-hover:opacity-80 transition-opacity duration-300`}>
                  <svg viewBox="0 0 100 100" className="w-7 h-7">
                    <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="22" y="22" width="56" height="56" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="36" y1="22" x2="36" y2="78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                    <line x1="64" y1="22" x2="64" y2="78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                </div>
              </div>

              {/* HUD Priority Ring Visualizer */}
              <div className="relative z-10 flex justify-center items-center my-3 h-24">
                {/* Outer HUD Rings */}
                <div className={`absolute w-24 h-24 rounded-full border border-dashed border-zinc-800 pointer-events-none`} />
                <svg className={`absolute w-[86px] h-[86px] animate-hud-rotate-cw ${tier.color} opacity-30 group-hover:opacity-50`} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6, 12" fill="none" />
                </svg>
                <svg 
                  className={`absolute w-[76px] h-[76px] animate-hud-rotate-ccw ${tier.color} opacity-40 group-hover:opacity-75`} 
                  viewBox="0 0 100 100" 
                  style={{ animationDuration: tier.name === 'ONYX' ? '6s' : tier.name === 'DIAMOND' ? '8s' : '14s' }}
                >
                  <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="25, 45, 10, 20" fill="none" />
                </svg>
                
                {/* Central Value */}
                <div className="flex flex-col items-center justify-center z-10">
                  <span className="text-3xl font-black tracking-tighter text-white font-mono leading-none">
                    {tier.priority}
                  </span>
                  <span className="text-[7px] font-mono tracking-widest text-zinc-500 font-bold uppercase mt-1">
                    SYS_PRIO
                  </span>
                </div>
              </div>

              {/* Price Details */}
              <div className="relative z-10 text-center px-4 mb-3">
                <span className="text-[8px] font-mono text-zinc-600 block tracking-wider uppercase mb-0.5">
                  AUTHORIZATION FEE
                </span>
                <div className="text-xl font-bold text-white flex items-baseline justify-center">
                  {tier.price} <span className="text-[10px] font-mono text-zinc-500 ml-1">/ mo</span>
                </div>
              </div>

              {/* Features List */}
              <div className="relative z-10 flex flex-col gap-1.5 px-5 mb-5 flex-grow text-left overflow-y-auto scrollbar-none">
                {tier.features.map((feature, idx) => {
                  const isParenthetical = feature.startsWith('(');
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      {!isParenthetical ? (
                        <span className={`w-1.5 h-1.5 rounded-sm rotate-45 shrink-0 mt-1.5 bg-zinc-700 group-hover:bg-zinc-400 transition-colors`} />
                      ) : (
                        <span className="w-1 h-1 shrink-0 mt-1.5" />
                      )}
                      <span className={`text-[10px] leading-relaxed ${isParenthetical ? 'text-zinc-500 font-mono -mt-1' : 'text-zinc-300 font-medium'}`}>
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="relative z-10 p-4 pt-0 mt-auto">
                <Link
                  href="/store"
                  className={`w-full py-2.5 rounded-lg border border-zinc-800 text-[10px] font-bold tracking-[0.25em] text-zinc-400 hover:text-white uppercase text-center transition-all duration-300 flex items-center justify-center gap-1.5 hover:bg-white/[0.02] ${tier.color.replace('text-', 'hover:border-')}`}
                >
                  Authorize Uplink
                </Link>
              </div>

              {/* Barcode & Tech Mockup Serial */}
              <div className="relative z-10 px-4 pb-3 flex flex-col items-center">
                <div className="text-[8px] font-mono text-zinc-600 mb-1 scale-90">
                  {tier.serial}
                </div>
                {/* SVG Barcode */}
                <svg className="h-4 w-11/12 text-zinc-800 group-hover:text-zinc-600 transition-colors duration-300" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <rect x="0" y="0" width="3" height="20" fill="currentColor" />
                  <rect x="5" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="8" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="12" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="15" y="0" width="3" height="20" fill="currentColor" />
                  <rect x="20" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="23" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="27" y="0" width="4" height="20" fill="currentColor" />
                  <rect x="33" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="36" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="40" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="43" y="0" width="3" height="20" fill="currentColor" />
                  <rect x="48" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="52" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="55" y="0" width="3" height="20" fill="currentColor" />
                  <rect x="60" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="63" y="0" width="4" height="20" fill="currentColor" />
                  <rect x="69" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="73" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="76" y="0" width="3" height="20" fill="currentColor" />
                  <rect x="81" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="85" y="0" width="1" height="20" fill="currentColor" />
                  <rect x="88" y="0" width="4" height="20" fill="currentColor" />
                  <rect x="94" y="0" width="2" height="20" fill="currentColor" />
                  <rect x="98" y="0" width="2" height="20" fill="currentColor" />
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
