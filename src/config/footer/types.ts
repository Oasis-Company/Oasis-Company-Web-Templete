export type Locale = 'zh-CN' | 'en-US';
export type Theme = 'light' | 'dark' | 'auto';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface BrandConfig {
  name: string;
  slogan?: string;
  logoUrl?: string;
  homeUrl: string;
}

export interface FooterConfig {
  brand: BrandConfig;
  sections: FooterSection[];
  legal: FooterLink[];
  social: FooterLink[];
  locale?: Locale;
  theme?: Theme;
}

export interface FooterProps {
  config: FooterConfig;
  compact?: boolean;
  showThemeSwitch?: boolean;
  showLocaleSwitch?: boolean;
  slots?: {
    extraTop?: React.ReactNode;
    extraBottom?: React.ReactNode;
  };
}
