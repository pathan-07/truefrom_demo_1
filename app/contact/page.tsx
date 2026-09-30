import type { Metadata } from 'next';
import { CtaBar } from '@/components/cta-bar';
import { ContactForm } from '@/components/contact-form';
import { contactEmail, mailtoUrl, whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = { title: 'Contact', description: 'Tell Trueform Digital what you are building and receive a clear website development quotation.' };

export default function ContactPage() {
  return <>
    <section className="page-intro container"><p className="eyebrow">Contact / 04</p><h1>Tell me what<br /><span className="accent-text">you&apos;re building.</span></h1><p>Share the shape of your project. I&apos;ll come back with a clear recommendation and written quotation.</p></section>
    <section className="section container contact-layout"><div><ContactForm /></div><aside className="contact-aside"><div><p className="eyebrow">Prefer direct?</p><h2>Start a conversation.</h2><p>WhatsApp is the quickest way to talk through your needs. Email works just as well if you would rather write it out.</p><div className="contact-links"><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp <span>+91 9328731251</span><b>↗</b></a><a href={mailtoUrl()}>{contactEmail}<b>↗</b></a></div></div><div><p className="eyebrow">What happens next</p><ol className="next-steps"><li>We understand your requirements.</li><li>You receive a written proposal.</li><li>We agree the direction and begin the prototype.</li></ol></div></aside></section>
    <CtaBar />
  </>;
}
