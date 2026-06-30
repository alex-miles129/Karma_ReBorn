'use client';

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is India Town Roleplay?",
    answer: "India Town Roleplay is a premium GTA V roleplay server that focuses on high-quality, immersive storytelling. We provide a dynamic environment where your choices matter, whether you play as a law-abiding citizen, law enforcement, or a criminal mastermind."
  },
  {
    question: "How do I join the server?",
    answer: "To join India Town Roleplay, you need to submit an application through our website. Once approved by our team, you will receive the whitelist role in Discord, granting you access to join the server and begin your story."
  },
  {
    question: "What are subscriptions for?",
    answer: "Subscriptions are optional tiers that grant you enhanced queue priority, meaning you get into the city faster when the server is full. Higher tiers also provide priority application reviews and exclusive Discord roles to show your support."
  },
  {
    question: "Do I need prior RP experience?",
    answer: "While prior roleplay experience is beneficial, it is not strictly required. We welcome players of all experience levels as long as they are willing to learn, follow our rules, and stay in character at all times."
  },
  {
    question: "How do whitelist jobs work?",
    answer: "Whitelist jobs like Police (LSPD), Medical (EMS), and Department of Justice (DOJ) require a separate application process. Once you are a whitelisted server member, you can apply for these specialized roles via our Applications portal."
  }
];

function TypewriterAnswer({ answer, isOpen }: { answer: string; isOpen: boolean }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDisplayedText("");
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= answer.length) {
        setDisplayedText(answer.slice(0, currentIndex));
        currentIndex += 3; // Fast, smooth typewriter reveal
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [answer, isOpen]);

  return (
    <p className="font-sans leading-relaxed text-zinc-300">
      {displayedText}
      {isOpen && displayedText.length < answer.length && (
        <span className="ml-0.5 text-red-500 font-extrabold animate-[pulse_0.6s_infinite]">
          _
        </span>
      )}
    </p>
  );
}

export function FaqSection() {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  return (
    <section 
      className="relative w-full py-24 sm:py-32 border-b border-white/10 z-0 -mt-6"
      style={{
        clipPath: 'polygon(0 24px, calc(50% - 174px) 24px, calc(50% - 150px) 0, calc(50% + 150px) 0, calc(50% + 174px) 24px, 100% 24px, 100% 100%, calc(50% + 174px) 100%, calc(50% + 150px) calc(100% - 24px), calc(50% - 150px) calc(100% - 24px), calc(50% - 174px) 100%, 0 100%)'
      }}
    >
      {/* Glass Backdrop */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none z-0" />

      {/* Left/Right Telemetry Data on Wide Screens */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 font-mono text-[9px] text-zinc-400 text-left border-l border-zinc-800/80 pl-4 pointer-events-none select-none opacity-80 z-10">
        <div>
          <span className="text-zinc-500 block">DB_QUERIES</span>
          <span className="text-zinc-200">ACTIVE: 5 / 5 RESOLVED</span>
        </div>
        <div>
          <span className="text-zinc-500 block">NODE_IDENT</span>
          <span className="text-zinc-200">FAQ_GATEWAY_v1.99</span>
        </div>
        <div>
          <span className="text-zinc-500 block">ENCRYPTION</span>
          <span className="text-emerald-400 flex items-center gap-1 animate-pulse">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            STABLE_SSL
          </span>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 font-mono text-[9px] text-zinc-400 text-right border-r border-zinc-800/80 pr-4 pointer-events-none select-none opacity-80 z-10">
        <div>
          <span className="text-zinc-500 block">QUERY_RATE</span>
          <span className="text-zinc-200">100% SATISFACTORY</span>
        </div>
        <div>
          <span className="text-zinc-500 block">INDEX_LOAD</span>
          <span className="text-zinc-200">0.02 MS SEARCH TIME</span>
        </div>
        <div>
          <span className="text-zinc-500 block">SECTOR_LATENCY</span>
          <span className="text-zinc-200">12 MS RESPONSE</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-950/80 border border-red-500/20 text-red-500/80 text-[9px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            ITRP CENTRAL DIRECTORY GATEWAY
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-widest font-mono mb-2 uppercase">
            Frequently Asked
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 tracking-widest font-mono drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] uppercase">
            Questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="w-full max-w-3xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            value={activeItem}
            onValueChange={(val) => setActiveItem(val || undefined)}
            className="w-full space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = activeItem === `item-${index}`;
              return (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/5 bg-zinc-950/20 hover:bg-zinc-950/40 hover:border-red-500/25 rounded-xl px-5 py-2 transition-all duration-300 relative group"
                  style={{
                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4)`
                  }}
                >
                  {/* Corner Tick Accent */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-red-500/50 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-red-500/50 transition-colors" />

                  <AccordionTrigger className="text-xs sm:text-sm font-bold text-zinc-300 hover:text-white hover:no-underline transition-colors text-left py-4 flex items-center justify-between gap-4 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-zinc-500 group-hover:text-red-400 border border-zinc-800/80 px-2 py-0.5 rounded bg-zinc-950/60 transition-colors">
                        SYS_Q_0{index + 1}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed pb-4 pt-2 border-t border-white/5 relative">
                    <div className="flex gap-2">
                      <span className="text-red-500 font-mono select-none shrink-0 font-bold">» RESP:</span>
                      <TypewriterAnswer answer={faq.answer} isOpen={isOpen} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
