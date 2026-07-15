import './globals.css';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { defaultDescription, defaultOgImage, metadataBase, siteName } from '../lib/seo';

export const metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: '/',
    siteName,
    images: [defaultOgImage],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: [defaultOgImage.url],
  },
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/map', label: 'Map' },
  { href: '/about', label: 'About' },
];

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="nav">
            <Link href="/" className="brand">
              <span className="brand-mark">HE</span>
              <span>Hidden Explorer Guide</span>
            </Link>
            <div className="nav-links">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <span>Helping people discover local destinations through trusted guides, original photography, and practical travel information.</span>
            <span>&copy; 2026 Hidden Explorer Guide &bull; Explore Local</span>
          </div>
        </footer>
        <SpeedInsights />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaMeasurementId)});
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
