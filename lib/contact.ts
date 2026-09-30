const fallbackEmail = 'trueform.digitals@gmail.com';
const fallbackWhatsApp = '919328731251';

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || fallbackEmail;
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || fallbackWhatsApp;

export function whatsappUrl(message = "Hi, I'm interested in a website for my business.") {
  return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject = 'Website enquiry for Trueform Digital') {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}
