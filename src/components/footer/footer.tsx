import { useState, useEffect } from 'react';
import { FooterProps } from '../../config/footer/types';
import { colors, typography, spacing, breakpoints, transitions } from '../../tokens';
import './footer.css';

export function OasisFooter({ 
  config, 
  compact = false, 
  showThemeSwitch = true, 
  showLocaleSwitch = true, 
  slots 
}: FooterProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(config.theme === 'dark' || (config.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
  const [locale, setLocale] = useState<'zh-CN' | 'en-US'>(config.locale || 'zh-CN');
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLocale = () => {
    setLocale(prev => prev === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <footer className={`oasis-footer ${compact ? 'compact' : ''} ${theme}`}>
      {slots?.extraTop && (
        <div className="footer-extra-top">
          {slots.extraTop}
        </div>
      )}

      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          {config.brand.logoUrl ? (
            <a href={config.brand.homeUrl} className="footer-logo">
              <img src={config.brand.logoUrl} alt={config.brand.name} />
            </a>
          ) : (
            <a href={config.brand.homeUrl} className="footer-brand-name">
              {config.brand.name}
            </a>
          )}
          {config.brand.slogan && (
            <p className="footer-slogan">{config.brand.slogan}</p>
          )}
          {config.social.length > 0 && (
            <div className="footer-social">
              {config.social.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target={link.external ? '_blank' : undefined} 
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="footer-social-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="footer-sections">
          {config.sections.map((section, index) => (
            <div key={index} className="footer-section">
              <button 
                className="footer-section-title"
                onClick={() => toggleSection(index)}
              >
                {section.title}
                <span className={`footer-section-toggle ${expandedSections.includes(index) ? 'expanded' : ''}`}>
                  +
                </span>
              </button>
              <ul className={`footer-section-links ${expandedSections.includes(index) ? 'expanded' : ''}`}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      target={link.external ? '_blank' : undefined} 
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="footer-link"
                    >
                      {link.label}
                      {link.external && <span className="footer-link-external">↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Section */}
      {config.legal.length > 0 && (
        <div className="footer-legal">
          {config.legal.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target={link.external ? '_blank' : undefined} 
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="footer-legal-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} {config.brand.name}. All rights reserved.
        </div>
        <div className="footer-controls">
          {showLocaleSwitch && (
            <button onClick={toggleLocale} className="footer-control-button">
              {locale === 'zh-CN' ? '中文' : 'English'}
            </button>
          )}
          {showThemeSwitch && (
            <button onClick={toggleTheme} className="footer-control-button">
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          )}
        </div>
      </div>

      {slots?.extraBottom && (
        <div className="footer-extra-bottom">
          {slots.extraBottom}
        </div>
      )}
    </footer>
  );
}
