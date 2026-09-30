import { Hero } from '@/components/hero';
import { ServiceCard } from '@/components/service-card';
import { ProcessSteps } from '@/components/process-steps';
import { CtaBar } from '@/components/cta-bar';
import { CtaButton } from '@/components/cta-button';
import { services, packages } from '@/lib/content';

export default function HomePage() {
  return <>
    <div className="container"><Hero /></div>
    <section className="section container" id="services-preview">
      <div className="section-heading"><div><p className="eyebrow">What I do</p><h2>Good websites make<br /><span className="accent-text">good business sense.</span></h2></div><p>From a sharp first presence to a richer custom build, every project starts with understanding what you need to say and who needs to hear it.</p></div>
      <div className="service-grid">{services.map((service) => <ServiceCard key={service.number} {...service} />)}</div>
    </section>
    <section className="section section--tint">
      <div className="container split-section"><div><p className="eyebrow">A clear place to start</p><h2>Three ways to<br /><span className="accent-text">move forward.</span></h2><p className="section-copy">Transparent starting ranges, a written quotation, and a build shaped around your actual requirements.</p><CtaButton href="/packages" variant="secondary">Explore packages</CtaButton></div><div className="mini-packages">{packages.map((plan, index) => <div className="mini-package" key={plan.name}><span>0{index + 1}</span><strong>{plan.name}</strong><em>{plan.inr}</em></div>)}</div></div>
    </section>
    <section className="section container"><div className="section-heading"><div><p className="eyebrow">How it works</p><h2>From first thought<br /><span className="accent-text">to something real.</span></h2></div><p>A simple six-step process keeps the work understandable, documented, and moving.</p></div><ProcessSteps /></section>
    <CtaBar />
  </>;
}
