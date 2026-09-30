'use client';

import { useActionState } from 'react';
import { submitContact, ContactState } from '@/app/contact/actions';
import { contactEmail, mailtoUrl, whatsappUrl } from '@/lib/contact';

const initialState: ContactState = { status: 'idle', message: '' };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  return (
    <form className="contact-form" action={action}>
      <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" required maxLength={80} /></div>
      <div className="form-field"><label htmlFor="business">Business name</label><input id="business" name="business" required maxLength={120} /></div>
      <div className="form-field"><label htmlFor="contact">Email or phone / WhatsApp</label><input id="contact" name="contact" required maxLength={160} /></div>
      <div className="form-field"><label htmlFor="requirements">What would you like to build?</label><textarea id="requirements" name="requirements" required maxLength={2000} rows={5} /></div>
      <div className="form-field"><label htmlFor="budget">Budget range</label><select id="budget" name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>Starter package</option><option>Business package</option><option>Professional package</option><option>Not sure yet</option></select></div>
      <div className="form-field"><label htmlFor="timeline">Timeline or context</label><input id="timeline" name="timeline" required maxLength={120} placeholder="For example: launching next month" /></div>
      <button className="cta-button cta-button--primary form-submit" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
      {state.message && <p className={`form-message form-message--${state.status}`} role="status">{state.message}</p>}
      <p className="form-direct">Prefer a direct conversation? <a href={whatsappUrl()}>WhatsApp</a> or <a href={mailtoUrl()}>{contactEmail}</a>.</p>
    </form>
  );
}
