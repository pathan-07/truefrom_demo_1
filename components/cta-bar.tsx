import { CtaButton } from '@/components/cta-button';
import { contactEmail, mailtoUrl, whatsappUrl } from '@/lib/contact';

export function CtaBar() {
  return (
    <section className="cta-bar">
      <div className="container cta-bar__inner">
        <div><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make the first move.</h2></div>
        <div className="cta-bar__actions"><CtaButton href={whatsappUrl()}>Talk on WhatsApp</CtaButton><a className="text-link" href={mailtoUrl()}>{contactEmail} <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}
