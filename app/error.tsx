'use client';

import { whatsappUrl } from '@/lib/contact';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="error-page"><p className="eyebrow">A temporary pause</p><h1>That page needs another moment.</h1><p>Try again, or reach out directly while we get things back in shape.</p><div className="hero__actions"><button className="cta-button cta-button--primary" onClick={() => reset()}>Try again <span aria-hidden="true">↻</span></button><a className="cta-button cta-button--secondary" href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a></div></div>;
}
