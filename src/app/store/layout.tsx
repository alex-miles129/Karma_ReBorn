import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store | Karma ReBorn',
  description: 'Support the server and get exclusive perks in Karma ReBorn',
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


