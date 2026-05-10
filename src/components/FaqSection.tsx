'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Karma ReBorn?",
    answer: "Karma ReBorn is a premium GTA V roleplay server that focuses on high-quality, immersive storytelling. We provide a dynamic environment where your choices matter, whether you play as a law-abiding citizen, law enforcement, or a criminal mastermind."
  },
  {
    question: "How do I join the server?",
    answer: "To join Karma ReBorn, you need to submit an application through our website. Once approved by our team, you will receive the whitelist role in Discord, granting you access to join the server and begin your story."
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

export function FaqSection() {
  return (
    <section 
      className="relative w-full py-24 sm:py-32 border-b border-white/10 z-0 -mt-6"
      style={{
        clipPath: 'polygon(0 24px, calc(50% - 174px) 24px, calc(50% - 150px) 0, calc(50% + 150px) 0, calc(50% + 174px) 24px, 100% 24px, 100% 100%, calc(50% + 174px) 100%, calc(50% + 150px) calc(100% - 24px), calc(50% - 150px) calc(100% - 24px), calc(50% - 174px) 100%, 0 100%)'
      }}
    >
      {/* Masked Glass Background */}
      <div 
        className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl pointer-events-none z-0"
        style={{
          maskImage: 'url(#faq-hex-mask)',
          WebkitMaskImage: 'url(#faq-hex-mask)',
        }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="faq-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(220,38,38,0.25)" />
            <stop offset="100%" stopColor="rgba(220,38,38,0)" />
          </linearGradient>
          
          <polygon id="faq-hex-base" points="-40,-69.28 40,-69.28 80,0 40,69.28 -40,69.28 -80,0" />
          <polygon id="faq-hex-solid" points="-40,-69.28 40,-69.28 80,0 40,69.28 -40,69.28 -80,0" fill="url(#faq-hex-grad)" stroke="rgba(220,38,38,0.2)" strokeWidth="1" />
          <polygon id="faq-hex-outline" points="-40,-69.28 40,-69.28 80,0 40,69.28 -40,69.28 -80,0" fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" />
          <polygon id="faq-hex-thick" points="-40,-69.28 40,-69.28 80,0 40,69.28 -40,69.28 -80,0" fill="rgba(220,38,38,0.02)" stroke="rgba(220,38,38,0.8)" strokeWidth="3" />
          <polygon id="faq-hex-dashed" points="-40,-69.28 40,-69.28 80,0 40,69.28 -40,69.28 -80,0" fill="none" stroke="rgba(220,38,38,0.6)" strokeWidth="2" strokeDasharray="10 10" />
          
          <g id="faq-node">
            <circle r="12" fill="rgba(220,38,38,0.15)" />
            <circle r="4" fill="#ef4444" />
          </g>
          
          <g id="faq-cluster-mask-left">
            <use href="#faq-hex-base" x="0" y="-138.56" />
            <use href="#faq-hex-base" x="0" y="0" />
            <use href="#faq-hex-base" x="0" y="138.56" />
            <use href="#faq-hex-base" x="120" y="-69.28" />
            <use href="#faq-hex-base" x="120" y="69.28" />
            <use href="#faq-hex-base" x="240" y="0" />
          </g>
          
          <g id="faq-cluster-mask-right">
            <use href="#faq-hex-base" x="0" y="-138.56" />
            <use href="#faq-hex-base" x="0" y="0" />
            <use href="#faq-hex-base" x="0" y="138.56" />
            <use href="#faq-hex-base" x="-120" y="-69.28" />
            <use href="#faq-hex-base" x="-120" y="69.28" />
            <use href="#faq-hex-base" x="-240" y="0" />
          </g>

          <mask id="faq-hex-mask">
            <rect width="100%" height="100%" fill="white" />
            <use href="#faq-cluster-mask-left" x="0" y="50%" fill="black" className="invisible xl:visible" />
            <use href="#faq-cluster-mask-right" x="100%" y="50%" fill="black" className="invisible xl:visible" />
          </mask>

          <g id="faq-cluster-left">
            <use href="#faq-hex-outline" x="0" y="-138.56" />
            <use href="#faq-hex-thick" x="0" y="0" />
            <use href="#faq-hex-solid" x="0" y="138.56" />
            <use href="#faq-hex-solid" x="120" y="-69.28" />
            <use href="#faq-hex-dashed" x="120" y="69.28" />
            <use href="#faq-hex-outline" x="240" y="0" />
            
            <use href="#faq-node" x="80" y="0" />
            <use href="#faq-node" x="40" y="-69.28" />
            <use href="#faq-node" x="160" y="69.28" />
            <use href="#faq-node" x="-40" y="69.28" />
          </g>

          <g id="faq-cluster-right">
            <use href="#faq-hex-outline" x="0" y="-138.56" />
            <use href="#faq-hex-thick" x="0" y="0" />
            <use href="#faq-hex-solid" x="0" y="138.56" />
            <use href="#faq-hex-solid" x="-120" y="-69.28" />
            <use href="#faq-hex-dashed" x="-120" y="69.28" />
            <use href="#faq-hex-outline" x="-240" y="0" />
            
            <use href="#faq-node" x="-80" y="0" />
            <use href="#faq-node" x="-40" y="-69.28" />
            <use href="#faq-node" x="-160" y="69.28" />
            <use href="#faq-node" x="40" y="69.28" />
          </g>
        </defs>

        <use href="#faq-cluster-left" x="0" y="50%" className="invisible xl:visible" />
        <use href="#faq-cluster-right" x="100%" y="50%" className="invisible xl:visible" />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-wider font-sans mb-2">
            Frequently Asked
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-700 to-red-600 tracking-wider font-sans drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-white/5 bg-transparent"
              >
                <AccordionTrigger className="text-sm sm:text-base font-bold text-gray-200 hover:text-red-500 hover:no-underline transition-colors text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-sm sm:text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
