import Link from 'next/link';
import { 
  AlertTriangle, 
  Construction, 
  Wrench, 
  Terminal, 
  ArrowLeft, 
  ChevronRight, 
  ShieldAlert,
  Server
} from 'lucide-react';
import { discordInviteLink } from '@/config/siteConfig';

export const metadata = {
  title: 'Store Under Construction | India Town Roleplay',
  description: 'Our Tebex store is currently under construction. Stay tuned for premium city access, queue priority, and perks.',
};

export default function StoreUnderConstructionPage() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden py-8 px-4 sm:px-6">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-amber-950/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hazard Stripes Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, transparent 10px, transparent 20px)`
        }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center flex flex-col items-center">
        
        {/* Construction Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
          <Construction className="w-4 h-4 text-amber-500" />
          <span>Store Offline</span>
        </div>

        {/* Under Construction Signs & Title */}
        <div className="space-y-3 mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-sans leading-none">
            Store Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-red-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">Construction</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our Tebex gateways and package distributions are currently being set up. We are deploying secure payment options, priority queue syncs, and premium server perks.
          </p>
        </div>

        {/* Warning Indicator Card */}
        <div className="w-full max-w-2xl mx-auto mb-8 bg-zinc-950/80 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl relative">
          {/* Animated Caution Border */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-black to-amber-500 bg-[length:40px_100%] animate-[shimmer_1.5s_linear_infinite]" 
               style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #000 10px, #000 20px)' }} />
          
          <div className="p-5 sm:p-6 space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-950/50 border border-red-500/30 flex items-center justify-center shrink-0 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-100 uppercase tracking-wider">RESTRICTED ZONE: Tebex Sandbox Mode</h3>
                <p className="text-xs text-zinc-400">Our automated synchronization with the Discord bot and the in-game database is being finalized.</p>
              </div>
            </div>

            {/* Progress Terminal */}
            <div className="bg-black/80 rounded-lg p-4 border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-2 shadow-inner">
              <div className="flex items-center gap-2 text-zinc-500">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>DEPL_LOGS_SYSTEM_INIT</span>
              </div>
              <div className="border-t border-zinc-900 pt-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ChevronRight className="w-3 h-3" /> Initialize Tebex API Hook
                  </span>
                  <span className="text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded text-[9px] font-bold">READY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ChevronRight className="w-3 h-3" /> Configure Queue Priority Tiers
                  </span>
                  <span className="text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded text-[9px] font-bold">READY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
                    <ChevronRight className="w-3 h-3" /> Sync In-Game Asset Distribution
                  </span>
                  <span className="text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded text-[9px] font-bold animate-pulse">IN PROGRESS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-amber-400 animate-pulse">
                    <ChevronRight className="w-3 h-3" /> Configure Secure Payment Options
                  </span>
                  <span className="text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded text-[9px] font-bold animate-pulse">IN PROGRESS</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3" /> Final Security Audit & Launch
                  </span>
                  <span className="text-zinc-700 bg-zinc-900/60 px-2 py-0.5 rounded text-[9px] font-bold">PENDING</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <a
            href={discordInviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold tracking-wider uppercase rounded-lg text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          >
            <Server className="w-4 h-4" />
            <span>Join Discord for Updates</span>
          </a>
        </div>

      </div>
    </main>
  );
}
