import { site } from '@/lib/content';
import { whatsappUrl } from '@/lib/contact';
import { BlurText } from '@/components/react-bits/blur-text';
import { CtaButton } from '@/components/cta-button';

export function Hero() {
  return (
    <section className="hero section-grid">
      <div className="hero__content">
        <p className="eyebrow hero__eyebrow">Independent digital studio · India + worldwide</p>
        <h1>Websites with a <span>point of view.</span></h1>
        <BlurText className="hero__tagline" text={site.tagline} />
        <p className="hero__intro">I&apos;m Manan Sharma, founder of Trueform Digital. I build modern, responsive websites that help businesses establish a professional online presence.</p>
        <div className="hero__actions">
          <CtaButton href={whatsappUrl()}>Let&apos;s build something</CtaButton>
          <CtaButton href="/packages" variant="secondary">See packages</CtaButton>
        </div>
        <div className="hero__proof"><span className="signal-dot" /> Clear scope. Written quotations. No noise.</div>
      </div>
      <div className="hero__visual" aria-label="Trueform Digital brand mark">
        <div className="hero__ring hero__ring--outer" />
        <div className="hero__ring hero__ring--inner" />
        <div className="hero__mark">TF<span>/</span></div>
        <div className="hero__visual-label"><span>01</span><span>Ideas → websites → impact</span></div>
      </div>
    </section>
  );
}
