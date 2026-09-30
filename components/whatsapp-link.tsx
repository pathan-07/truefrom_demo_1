import { whatsappNumber, whatsappUrl } from '@/lib/contact';

type WhatsAppLinkProps = {
  children: React.ReactNode;
  message?: string;
  className?: string;
};

export function WhatsAppLink({ children, message, className = '' }: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${children} on WhatsApp at +${whatsappNumber}`}
    >
      {children}
    </a>
  );
}
