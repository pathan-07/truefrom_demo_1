import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Trueform Digital', template: '%s | Trueform Digital' },
  description: 'Modern websites built for growth by Trueform Digital. Design that works, results that last.',
  openGraph: {
    title: 'Trueform Digital',
    description: 'Modern websites built for growth by Trueform Digital.',
    type: 'website',
    images: [{ url: '/logo.jpeg', width: 768, height: 768, alt: 'Trueform Digital' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
