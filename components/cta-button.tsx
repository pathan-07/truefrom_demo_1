import Link from 'next/link';

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function CtaButton({ href, children, variant = 'primary', className = '' }: CtaButtonProps) {
  const content = <>{children}<span aria-hidden="true">↗</span></>;
  const classes = `cta-button cta-button--${variant} ${className}`;

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return <a className={classes} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{content}</a>;
  }

  return <Link className={classes} href={href}>{content}</Link>;
}
