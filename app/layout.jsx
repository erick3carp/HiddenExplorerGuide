import './globals.css';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Hidden Explorer Guide',
  description: 'Authentic New Smyrna Beach destinations through local photography and field-tested guides.',
};

const navItems = [
  { href: '/explore', label: 'Explore' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/map', label: 'Map' },
  { href: '/about', label: 'About' },
];

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
            <span>Hidden Explorer Guide helps travelers discover authentic places through local photography and guides.</span>
            <span>New Smyrna Beach MVP · 2026</span>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
