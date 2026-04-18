import { FooterConfig } from './types';

export const oasisbioFooterConfig: FooterConfig = {
  brand: {
    name: 'OasisBio',
    slogan: 'Biotechnology for the Future',
    homeUrl: 'https://oasiscompany.com/oasisbio'
  },
  sections: [
    {
      title: 'Product',
      links: [
        { label: 'Overview', href: '/oasisbio/overview' },
        { label: 'Features', href: '/oasisbio/features' },
        { label: 'Demo', href: '/oasisbio/demo' },
        { label: 'Roadmap', href: '/oasisbio/roadmap' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/oasisbio/docs' },
        { label: 'API Reference', href: '/oasisbio/api' },
        { label: 'Tutorials', href: '/oasisbio/tutorials' },
        { label: 'Support', href: '/oasisbio/support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Oasis Company', href: 'https://oasiscompany.com', external: true },
        { label: 'GitHub', href: 'https://github.com/Oasis-Company', external: true },
        { label: 'Careers', href: 'https://oasiscompany.com/about/careers', external: true },
        { label: 'Contact', href: 'https://oasiscompany.com/about/contact', external: true }
      ]
    }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'License', href: '/legal/license' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/Oasis-Company/OasisBio', external: true },
    { label: 'Twitter', href: 'https://twitter.com/oasiscompany', external: true }
  ],
  theme: 'dark',
  locale: 'zh-CN'
};
