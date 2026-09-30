import Image from 'next/image';
import Link from 'next/link';
import { navItems } from '@/lib/content';
import { whatsappUrl } from '@/lib/contact';

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" href="/" aria-label="Trueform Digital home">
          <Image src="/logo.jpeg" alt="Trueform Digital" width={46} height={46} priority />
          <span className="brand__text"><strong>TRUEFORM</strong><small>DIGITAL</small></span>
        </Link>
        <div className="mobile-nav">
          <input id="mobile-menu" type="checkbox" />
          <label htmlFor="mobile-menu" aria-label="Open navigation"><span /><span /><span /></label>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">Start a project ↗</a>
          </nav>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <a className="header-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Start a project <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
