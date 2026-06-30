import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { HeroSection } from '@/components/HeroSection';
import { CtaSection } from '@/components/CtaSection';
import { StoreSection } from '@/components/StoreSection';
import { FaqSection } from '@/components/FaqSection';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';

export default function HomePage() {
  return (
    <>
      <ScrollProgressBar />
      <SiteHeader />
      <main className="relative overflow-x-hidden w-full">
        <HeroSection />
        <StoreSection />
        <CtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
