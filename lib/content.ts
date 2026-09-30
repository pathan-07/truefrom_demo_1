export type Package = {
  name: string;
  eyebrow: string;
  inr: string;
  usd: string;
  pages: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

export const site = {
  name: 'Trueform Digital',
  founder: 'Manan Sharma',
  tagline: 'Design that works, results that last.',
  description: 'Modern websites built for growth by Trueform Digital.',
};

export const services = [
  {
    number: '01',
    title: 'Responsive websites',
    description: 'Clear, modern pages that work beautifully across mobile, tablet, and desktop.',
  },
  {
    number: '02',
    title: 'Custom UI design',
    description: 'A considered visual direction shaped around your business, audience, and goals.',
  },
  {
    number: '03',
    title: 'Basic SEO setup',
    description: 'A strong technical and content foundation so your site can be found and understood.',
  },
  {
    number: '04',
    title: 'Prototype to launch',
    description: 'Move from a focused first concept to an agreed, polished website without the fog.',
  },
  {
    number: '05',
    title: 'CMS integration',
    description: 'Flexible content management when your project scope calls for it.',
  },
  {
    number: '06',
    title: 'Ongoing maintenance',
    description: 'Optional updates, content changes, technical checks, and practical support.',
  },
];

export const packages: Package[] = [
  {
    name: 'Starter',
    eyebrow: 'A focused first presence',
    inr: '₹13,000–₹20,000',
    usd: '$350–$400',
    pages: '1–3 pages',
    description: 'A clean, professional starting point for a business that needs to get online with clarity.',
    includes: ['Clean professional design', 'Basic setup and functionality', 'Responsive foundation'],
  },
  {
    name: 'Business',
    eyebrow: 'For a growing online presence',
    inr: '₹30,000–₹40,000',
    usd: '$450–$600',
    pages: '4–7 pages',
    description: 'A fuller website experience with responsive design and a basic SEO setup.',
    includes: ['Mobile, tablet, and desktop design', 'Basic SEO setup', 'Clear page structure'],
    featured: true,
  },
  {
    name: 'Professional',
    eyebrow: 'For a more expressive build',
    inr: '₹40,000–₹70,000',
    usd: '$700–$1,000',
    pages: 'Custom scope',
    description: 'A bespoke direction for projects that need richer interaction, custom UI, or CMS integration.',
    includes: ['Custom UI design', 'Animations and interactive elements', 'CMS integration depending on scope'],
  },
];

export const maintenance = {
  inr: '₹2,000–₹5,000 / month',
  usd: '$50–$100 / month',
  description: 'Optional ongoing support with agreed updates, content changes, and basic technical checks.',
};

export const processSteps = [
  ['Discovery', 'Understand your business, audience, requirements, budget, and deadline.'],
  ['Quotation & agreement', 'Document scope, package, price, payment terms, and responsibilities.'],
  ['Prototype', 'Aim for an initial direction once the required materials are available.'],
  ['Development', 'Build the agreed experience with responsive design and scoped features.'],
  ['Review & delivery', 'Review together, complete agreed revisions, and deliver the website.'],
  ['Maintenance', 'Continue with optional support when your project needs it.'],
] as const;

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/packages', label: 'Packages' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
