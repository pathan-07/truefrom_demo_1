import type { Metadata } from 'next';
import { CtaBar } from '@/components/cta-bar';
import { site } from '@/lib/content';

export const metadata: Metadata = { title: 'About', description: 'Meet Manan Sharma, founder of Trueform Digital, a digital solutions company focused on modern website development.' };

export default function AboutPage() {
  return <>
    <section className="page-intro container"><p className="eyebrow">About / 03</p><h1>A small studio<br /><span className="accent-text">with a clear standard.</span></h1><p>Trueform Digital is a digital solutions company founded by {site.founder}. The focus is simple: build professional online presences with quality, clarity, and attention to detail.</p></section>
    <section className="section container about-layout"><div className="about-stamp"><span>TF</span><small>TRUEFORM<br />DIGITAL</small></div><div className="about-copy"><p className="eyebrow">The point of view</p><h2>Long-term relationships<br />start with <span className="accent-text">good work.</span></h2><p>Every project should leave you with a website you understand, a scope that was clear from the start, and a digital presence that feels like your business.</p><p>Today, the studio is focused on website development: responsive design, custom UI, basic SEO setup, prototypes, CMS integration where it fits, and optional maintenance.</p><div className="quote-line">“Design that works, results that last.”</div></div></section>
    <section className="section section--tint"><div className="container about-values"><div><p className="eyebrow">What matters</p><h2>Clear work.<br /><span className="accent-text">No theatre.</span></h2></div><ul><li><strong>Quality</strong><span>Careful decisions over decorative noise.</span></li><li><strong>Clarity</strong><span>Simple communication and written scope.</span></li><li><strong>Reliability</strong><span>A practical process you can follow.</span></li></ul></div></section>
    <CtaBar />
  </>;
}
