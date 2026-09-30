import Link from 'next/link';
import { whatsappUrl } from '@/lib/contact';

export default function NotFound() {
  return <div className="error-page"><p className="eyebrow">404 / Not found</p><h1>Nothing lives at this address.</h1><p>Head back to the studio, or start a conversation about what you need.</p><div className="hero__actions"><Link className="cta-button cta-button--primary" href="/">Back home <span aria-hidden="true">↗</span></Link><a className="cta-button cta-button--secondary" href={whatsappUrl()}>Start a project <span aria-hidden="true">↗</span></a></div></div>;
}
