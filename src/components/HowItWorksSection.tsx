'use client';

import { Users, Briefcase, Shield, Code } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Immersive Storytelling',
    description: 'Create a unique character and build your own legacy. Whether you want to be a humble citizen, a ruthless gang leader, or a highly decorated officer, your choices shape the city of India Town Roleplay.'
  },
  {
    icon: Briefcase,
    title: 'Player-Driven Economy',
    description: 'Experience a dynamic, living world where the economy reacts to player actions. Own businesses, trade goods, or engage in the underground black market to build your empire.'
  },
  {
    icon: Shield,
    title: 'Law & Order',
    description: 'Join the ranks of the Los Santos Police Department, save lives as EMS, or uphold justice in the DOJ. Prefer the dark side? Plan intricate heists and evade the authorities.'
  },
  {
    icon: Code,
    title: 'Custom Framework',
    description: 'Enjoy a seamless and optimized experience powered by our tailor-made scripts. Discover custom housing, unique vehicles, illegal activities, and interactive UI systems designed exclusively for our server.'
  }
];

export function HowItWorksSection() {
  return (
    <>
      {/* Fixed Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm"
          style={{
            backgroundImage: "url('https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/ChatGPTImageMar11202609_39_50PM.png')",
          }}
        />
        {/* Dark overlay with blur for better text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <section id="how-it-works" className="relative min-h-screen py-24 flex items-center">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16">
        {/* Title */}
        <div className="text-right mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight">
            HOW IT WORKS
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
              >
                {/* Red Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-red-600/20 rounded-lg border border-red-600/30">
                    <IconComponent className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/90 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}

