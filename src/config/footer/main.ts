import { FooterConfig } from './types';

export const mainFooterConfig: FooterConfig = {
  brand: {
    name: 'Oasis Company',
    slogan: 'Unified Motion System',
    homeUrl: 'https://oasiscompany.com'
  },
  sections: [
    {
      title: 'About Oasis',
      links: [
        { label: 'Company', href: '/about/company' },
        { label: 'Team', href: '/about/team' },
        { label: 'Careers', href: '/about/careers' },
        { label: 'Contact', href: '/about/contact' }
      ]
    },
    {
      title: 'Ecosystem',
      links: [
        { label: 'OasisBio', href: '/ecosystem/oasisbio' },
        { label: 'AMAR Engine', href: '/ecosystem/amar-engine' },
        { label: 'Metaclass', href: '/ecosystem/metaclass' },
        { label: 'Forum', href: '/ecosystem/forum' }
      ]
    },
    {
      title: 'Developers',
      links: [
        { label: 'GitHub', href: 'https://github.com/Oasis-Company', external: true },
        { label: 'Docs', href: '/developers/docs' },
        { label: 'Open Source', href: '/developers/open-source' },
        { label: 'Changelog', href: '/developers/changelog' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/resources/blog' },
        { label: 'Roadmap', href: '/resources/roadmap' },
        { label: 'FAQ', href: '/resources/faq' },
        { label: 'Support', href: '/resources/support' }
      ]
    }
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookies', href: '/legal/cookies' },
    { label: 'License', href: '/legal/license' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/Oasis-Company', external: true },
    { label: 'Twitter', href: 'https://twitter.com/oasiscompany', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/oasiscompany', external: true }
  ],
  theme: 'dark',
  locale: 'zh-CN'
};
