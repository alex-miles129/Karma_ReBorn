import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | India Town Roleplay',
  description: 'Get in touch with India Town Roleplay team',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

