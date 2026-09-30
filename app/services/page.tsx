import type { Metadata } from 'next';
import { CtaBar } from '@/components/cta-bar';
import { ProcessSteps } from '@/components/process-steps';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/lib/content';

export const metadata: Metadata = { title: 'Services', description: 'Responsive website development, custom UI, basic SEO, prototypes, CMS integration, and maintenance by Trueform Digital.' };

export default function ServicesPage() {
  return <>
    <section className="page-intro container"><p className="eyebrow">Services / 01</p><h1>Digital work that<br /><span className="accent-text">earns its place.</span></h1><p>Trueform Digital builds professional online presences for businesses, startups, and individuals. Clear scope, thoughtful design, and a practical path from idea to launch.</p></section>
    <section className="section container"><div className="service-grid">{services.map((service) => <ServiceCard key={service.number} {...service} />)}</div></section>
    <section className="section section--tint"><div className="container"><div className="section-heading"><div><p className="eyebrow">The process</p><h2>Nothing hidden<br /><span className="accent-text">in the handover.</span></h2></div><p>We aim for an initial prototype in around 2 days once materials are ready, and full delivery typically takes 5–6 days depending on scope, feedback, and content.</p></div><ProcessSteps /><div className="notes-grid"><div><p className="eyebrow">Payment</p><h3>50% upfront<br />50% on delivery.</h3><p>All prices, additional charges, responsibilities, and scope are confirmed in writing.</p></div><div><p className="eyebrow">Domain + hosting</p><h3>You keep<br />ownership.</h3><p>Trueform assists with setup. Third-party costs are paid directly by you, and accounts remain under your ownership.</p></div></div></div></section>
    <CtaBar />
  </>;
}
