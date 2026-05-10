'use client';
import Link from 'next/link';

type Tier = {
  name: string;
  priority: string;
  price: string;
  color: string;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: 'SILVER',
    priority: '+25',
    price: '$25',
    color: 'text-gray-300',
    features: [
      '+25 Queue Priority',
      '(stacks with other sources)',
      'Silver member badge on Discord & the Prodigy website',
    ],
  },
  {
    name: 'GOLD',
    priority: '+40',
    price: '$40',
    color: 'text-yellow-500',
    features: [
      '+40 Queue Priority',
      '(stacks with other sources)',
      'Gold member badge on Discord & the Prodigy website',
      '1 Priority Application Review per month',
      '(appeals & character requests, 7-day turnaround)',
    ],
  },
  {
    name: 'EMERALD',
    priority: '+60',
    price: '$60',
    color: 'text-emerald-500',
    features: [
      '+60 Queue Priority',
      '(stacks with other sources)',
      'Emerald member badge on Discord & the Prodigy website',
      '1 Priority Application Review per month',
      '(appeals & character requests, 7-day turnaround)',
    ],
  },
  {
    name: 'PLATINUM',
    priority: '+80',
    price: '$80',
    color: 'text-slate-300',
    features: [
      '+80 Queue Priority',
      '(stacks with other sources)',
      'Platinum member badge on Discord & the Prodigy website',
      '1 Priority Application Review per month',
      '(appeals & character requests, 7-day turnaround)',
    ],
  },
  {
    name: 'DIAMOND',
    priority: '+140',
    price: '$140',
    color: 'text-cyan-400',
    features: [
      '+140 Queue Priority',
      '(stacks with other sources)',
      'Diamond member badge on Discord & the Prodigy website',
      '1 Priority Application Review per month',
      '(appeals & character requests, 7-day turnaround)',
    ],
  },
  {
    name: 'ONYX',
    priority: '+250',
    price: '$250',
    color: 'text-purple-500',
    features: [
      '+250 Queue Priority',
      '(stacks with other sources)',
      'Onyx member badge on Discord & the Prodigy website',
      'Unlimited Priority Application Reviews',
      '(appeals & character requests, 7-day turnaround)',
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wider font-sans mb-1">
            Skip the Queue.
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-700 to-red-600 tracking-wider font-sans mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Play Faster.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Higher tier = higher priority. Get in the city while others wait.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {tiers.map((tier) => (
            <div key={tier.name} className="relative group flex flex-col h-full">
              {/* Outer wrapper for border gradient/color effect */}
              <div className="absolute inset-0 bg-[#120a0a] transition-colors duration-300 group-hover:bg-[#1a0f0f]" 
                   style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }} />
              
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-[16px] right-0 h-1 z-10 ${tier.color.replace('text-', 'bg-')}`} />

              {/* Badge Icon Placeholder */}
              <div className="absolute -top-6 -left-2 z-20 w-16 h-16 drop-shadow-xl">
                <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] ${tier.color}`}>
                  <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="currentColor" opacity="0.2" />
                  <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <text x="50" y="65" fontSize="40" fontWeight="900" fontFamily="sans-serif" fill="currentColor" textAnchor="middle">A</text>
                </svg>
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col flex-grow pt-14 px-6 pb-6"
                   style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }}>
                
                <div className="flex flex-col items-center text-center border-b border-white/5 pb-6 mb-6">
                  <h3 className={`text-sm font-bold tracking-[0.2em] uppercase mb-2 ${tier.color}`}>
                    {tier.name}
                  </h3>
                  <div className="text-5xl sm:text-6xl font-black text-white mb-1 font-sans">
                    {tier.priority}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase mb-4">
                    QUEUE PRIORITY
                  </div>
                  <div className="text-2xl font-bold text-white flex items-baseline">
                    {tier.price} <span className="text-sm font-normal text-gray-500 ml-1">/mo</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => {
                    const isParenthetical = feature.startsWith('(');
                    return (
                      <div key={idx} className="flex items-start text-left gap-3">
                        <div className={`mt-1.5 w-1.5 h-1.5 shrink-0 rotate-45 ${isParenthetical ? 'bg-transparent' : tier.color.replace('text-', 'bg-')}`} />
                        <span className={`text-xs leading-relaxed ${isParenthetical ? 'text-gray-500 -mt-2' : 'text-gray-400 font-medium'}`}>
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="https://crimetownrp.tebex.io/"
                  target="_blank"
                  className={`w-full py-3.5 mt-auto border border-gray-700 rounded text-xs font-bold tracking-[0.2em] uppercase text-center transition-all duration-300 hover:border-gray-500 hover:bg-white/5 ${tier.color.replace('text-', 'hover:text-')}`}
                >
                  SUBSCRIBE
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
