import { processSteps } from '@/lib/content';

export function ProcessSteps() {
  return (
    <div className="process-grid">
      {processSteps.map(([title, description], index) => (
        <article className="process-step" key={title}>
          <span className="process-step__number">0{index + 1}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </article>
      ))}
    </div>
  );
}
