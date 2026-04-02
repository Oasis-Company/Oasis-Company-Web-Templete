import { FooterConfig } from './types';

export const amarFooterConfig: FooterConfig = {
  brand: {
    name: 'AMAR Engine',
    slogan: 'Advanced Motion and Rendering Engine',
    homeUrl: 'https://oasiscompany.com/amar-engine'
  },
  sections: [
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/amar-engine/docs' },
        { label: 'API Reference', href: '/amar-engine/api' },
        { label: 'Examples', href: '/amar-engine/examples' },
        { label: 'Tutorials', href: '/amar-engine/tutorials' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/Oasis-Company/AMAR-Engine', external: true },
        { label: 'Issues', href: 'https://github.com/Oasis-Company/AMAR-Engine/issues', external: true },
        { label: 'Discussions', href: 'https://github.com/Oasis-Company/AMAR-Engine/discussions', external: true },
        { label: 'Forum', href: '/forum/amar-engine' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Oasis Company', href: 'https://oasiscompany.com', external: true },
        { label: 'Other Products', href: 'https://oasiscompany.com/ecosystem', external: true },
        { label: 'Careers', href: 'https://oasiscompany.com/about/careers', external: true },
        { label: 'Contact', href: 'https://oasiscompany.com/about/contact', external: true }
      ]
    }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'License', href: 'https://github.com/Oasis-Company/AMAR-Engine/blob/main/LICENSE', external: true }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/Oasis-Company/AMAR-Engine', external: true },
    { label: 'Twitter', href: 'https://twitter.com/oasiscompany', external: true }
  ],
  theme: 'dark',
  locale: 'en-US'
};
