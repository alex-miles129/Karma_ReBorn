import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { RulesContent } from '@/components/RulesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rules | Karma ReBorn',
  description: 'Server rules and guidelines for Karma ReBorn',
};

export default function RulesPage() {
  return (
    <>
      <ScrollProgressBar />
      <SiteHeader />
      {/* Fixed Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm"
          style={{
            backgroundImage: "url('https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/ChatGPTImageMar17202612_51_05AM.png')",
          }}
        />
        {/* Dark overlay with blur for better text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <main className="relative min-h-screen">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <RulesContent />
        </div>
      </main>
      <SiteFooter />
    </>
  );
} 