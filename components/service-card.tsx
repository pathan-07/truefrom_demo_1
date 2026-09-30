type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
};

export function ServiceCard({ number, title, description }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card__number">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-card__arrow" aria-hidden="true">↗</span>
    </article>
  );
}
