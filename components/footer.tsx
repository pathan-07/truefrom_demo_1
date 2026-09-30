import Link from 'next/link';
import { navItems, site } from '@/lib/content';
import { contactEmail, mailtoUrl, whatsappUrl } from '@/lib/contact';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="eyebrow">Trueform Digital</p>
          <p className="footer-tagline">{site.tagline}</p>
          <p className="footer-note">Websites for businesses, startups, and individuals ready to show up clearly online.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <div className="footer-nav">
            <a href={mailtoUrl()}>{contactEmail}</a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp +91 9328731251</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Trueform Digital</span>
        <span>Prices are ranges; final quotation depends on your requirements.</span>
      </div>
    </footer>
  );
}
