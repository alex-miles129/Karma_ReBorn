import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers"
import { PageTransition } from "@/components/PageTransition"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'India Town Roleplay',
  description: 'Step into the blood-soaked streets of India Town Roleplay. No mercy, no second chances. Claim your turf or get buried under it. Only the ruthless survive.',
  openGraph: {
    title: 'India Town Roleplay',
    description: 'Step into the blood-soaked streets of India Town Roleplay. No mercy, no second chances. Claim your turf or get buried under it. Only the ruthless survive.',
    url: 'https://karma-re-born.vercel.app/',
    siteName: 'India Town Roleplay',
    images: [
      {
        url: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/ChatGPTImageJun22202601_24_19PM.png',
        width: 1200,
        height: 630,
        alt: 'India Town Roleplay Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Town Roleplay',
    description: 'Step into the blood-soaked streets of India Town Roleplay. No mercy, no second chances. Claim your turf or get buried under it. Only the ruthless survive.',
    images: ['https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/ChatGPTImageJun22202601_24_19PM.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
