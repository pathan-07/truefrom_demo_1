'use server';

export type ContactState = {
  status: 'idle' | 'success' | 'fallback' | 'error';
  message: string;
};

const initialState: ContactState = { status: 'idle', message: '' };

function value(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim();
}

export async function submitContact(_previous: ContactState = initialState, formData: FormData): Promise<ContactState> {
  void _previous;
  const fields = {
    name: value(formData, 'name'),
    business: value(formData, 'business'),
    contact: value(formData, 'contact'),
    requirements: value(formData, 'requirements'),
    budget: value(formData, 'budget'),
    timeline: value(formData, 'timeline'),
  };

  if (Object.values(fields).some((field) => !field) || fields.name.length > 80 || fields.business.length > 120 || fields.contact.length > 160 || fields.requirements.length > 2000 || fields.budget.length > 80 || fields.timeline.length > 120) {
    return { status: 'error', message: 'Please check each field and try again.' };
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  const secret = process.env.CONTACT_FORM_SECRET;

  if (!endpoint || !secret) {
    return { status: 'fallback', message: 'The form is not connected yet. Please send your requirements directly on WhatsApp or email below.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify(fields),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Contact provider failed');
    return { status: 'success', message: 'Thanks. Your enquiry has been sent.' };
  } catch {
    return { status: 'error', message: 'Something went wrong. Please use WhatsApp or email below instead.' };
  }
}
