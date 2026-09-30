import type { Metadata } from 'next';
import { CtaBar } from '@/components/cta-bar';
import { PackageCard } from '@/components/package-card';
import { maintenance, packages } from '@/lib/content';

export const metadata: Metadata = { title: 'Packages', description: 'Transparent starting ranges for Trueform Digital website development packages in India and internationally.' };

export default function PackagesPage() {
  return <>
    <section className="page-intro container"><p className="eyebrow">Packages / 02</p><h1>Choose a starting point.<br /><span className="accent-text">Make it yours.</span></h1><p>Transparent starting ranges. Your final quotation depends on pages, design complexity, functionality, and scope, confirmed in writing before work begins.</p></section>
    <section className="section container packages-page"><fieldset className="currency-toggle"><legend>Show pricing for</legend><label><input id="currency-inr" type="radio" name="currency" defaultChecked /> India <span>₹</span></label><label><input id="currency-usd" type="radio" name="currency" /> International <span>$</span></label></fieldset><div className="package-grid">{packages.map((plan) => <PackageCard key={plan.name} plan={plan} />)}</div><article className="maintenance-card"><div><p className="eyebrow">Optional ongoing support</p><h2>Website maintenance</h2><p>{maintenance.description}</p></div><div className="maintenance-card__price"><strong className="price-inr">{maintenance.inr}</strong><strong className="price-usd">{maintenance.usd}</strong><span>per client / month</span></div></article><p className="pricing-note">Prices are ranges and starting guidelines for discussion. The final quotation is based on your requirements and confirmed in writing.</p></section>
    <CtaBar />
  </>;
}
