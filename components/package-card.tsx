import { Package } from '@/lib/content';
import { whatsappUrl } from '@/lib/contact';

export function PackageCard({ plan }: { plan: Package }) {
  return (
    <article className={`package-card ${plan.featured ? 'package-card--featured' : ''}`}>
      {plan.featured && <span className="package-card__badge">Most popular</span>}
      <div className="package-card__topline"><span>{plan.eyebrow}</span><span>{plan.pages}</span></div>
      <h3>{plan.name}</h3>
      <div className="package-card__prices" aria-live="polite">
        <strong className="price-inr">{plan.inr}</strong>
        <strong className="price-usd">{plan.usd}</strong>
      </div>
      <p>{plan.description}</p>
      <ul>{plan.includes.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul>
      <a className="text-link" href={whatsappUrl(`Hi, I'd like a quotation for the ${plan.name} package.`)} target="_blank" rel="noreferrer">Discuss {plan.name} <span aria-hidden="true">↗</span></a>
    </article>
  );
}
