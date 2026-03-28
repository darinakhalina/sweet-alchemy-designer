import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const colors = [
  { name: '--brand-600', value: '#FE7BCF', var: 'var(--brand-600)' },
  { name: '--brand-800', value: '#F42EAD', var: 'var(--brand-800)' },
  { name: '--neutral-400', value: '#2B2117', var: 'var(--neutral-400)' },
  { name: '--neutral-200', value: '#626049', var: 'var(--neutral-200)' },
  { name: '--neutral-100', value: '#C3C2AD', var: 'var(--neutral-100)' },
  { name: '--neutral-50', value: '#E9E8E3', var: 'var(--neutral-50)' },
  { name: '--white', value: '#FFFFFF', var: 'var(--white)' },
];

const semanticColors = [
  { name: '--color-text', desc: 'neutral-400' },
  { name: '--color-text-secondary', desc: 'neutral-200' },
  { name: '--color-text-muted', desc: 'neutral-100' },
  { name: '--color-border', desc: 'neutral-100' },
  { name: '--color-border-strong', desc: 'neutral-200' },
  { name: '--color-bg', desc: 'white' },
  { name: '--color-bg-hover', desc: 'neutral-50' },
  { name: '--color-bg-active', desc: 'neutral-100' },
  { name: '--color-overlay', desc: 'rgba(0,0,0,0.35)' },
  { name: '--color-hover-light', desc: 'rgba(0,0,0,0.05)' },
  { name: '--color-error', desc: '#E53E3E' },
  { name: '--color-success', desc: '#38A169' },
];

const spacingTokens = [
  { name: '--space-1', value: '4px' },
  { name: '--space-2', value: '8px' },
  { name: '--space-3', value: '12px' },
  { name: '--space-4', value: '16px' },
  { name: '--space-5', value: '20px' },
  { name: '--space-6', value: '24px' },
  { name: '--space-8', value: '32px' },
  { name: '--space-10', value: '40px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-15', value: '60px' },
  { name: '--space-20', value: '80px' },
];

const radiusTokens = [
  { name: '--radius-xs', value: '4px' },
  { name: '--radius-sm', value: '8px' },
  { name: '--radius-md', value: '16px' },
  { name: '--radius-lg', value: '24px' },
  { name: '--radius-xl', value: '30px' },
  { name: '--radius-full', value: '50%' },
];

const transitionTokens = [
  { name: '--transition-fast', value: '150ms ease' },
  { name: '--transition-normal', value: '200ms ease' },
  { name: '--transition-slow', value: '300ms ease' },
];

const shadowTokens = [
  { name: '--shadow-sm', value: '0 2px 6px rgba(0,0,0,0.05)' },
  { name: '--shadow-md', value: '0 2px 6px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.06)' },
];

const typographyClasses = [
  { className: 'h1', label: '.h1', desc: 'Rubik 700 / 64px / uppercase' },
  { className: 'h1-accent', label: '.h1-accent', desc: 'Playpen Sans 800 / 64px / uppercase / brand-600' },
  { className: 'h2', label: '.h2', desc: 'Rubik 700 / 28px / brand-600' },
  { className: 'text-bold', label: '.text-bold', desc: 'Rubik 500 / 20px' },
  { className: 'text-sm-bold', label: '.text-sm-bold', desc: 'Rubik 500 / 16px' },
  { className: 'text', label: '.text', desc: 'Rubik 400 / 20px' },
  { className: 'text-sm', label: '.text-sm', desc: 'Rubik 400 / 16px' },
];

const DemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className="demo">
      <div className="demo__header">
        <h1 className="demo__title">{t('pages.demo.title')}</h1>
        <LanguageSwitcher />
      </div>

      {/* === COLORS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.colors')}</h2>
        <div className="demo__colors">
          {colors.map((color) => (
            <div key={color.name} className="demo__swatch">
              <div
                className="demo__swatch-box"
                style={{ backgroundColor: color.var }}
              />
              <span className="demo__swatch-name">{color.name}</span>
              <span className="demo__swatch-value">{color.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SEMANTIC COLORS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.semanticColors')}</h2>
        <div className="demo__token-grid">
          {semanticColors.map((item) => (
            <div key={item.name} className="demo__token-row">
              <div
                className="demo__token-preview"
                style={{ backgroundColor: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
              <span className="demo__token-value">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SPACING === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.spacing')}</h2>
        <div className="demo__spacing-list">
          {spacingTokens.map((item) => (
            <div key={item.name} className="demo__spacing-row">
              <code className="demo__token-name">{item.name}</code>
              <div className="demo__spacing-bar-wrap">
                <div
                  className="demo__spacing-bar"
                  style={{ width: `var(${item.name})` }}
                />
              </div>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === RADIUS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.radius')}</h2>
        <div className="demo__radius-list">
          {radiusTokens.map((item) => (
            <div key={item.name} className="demo__radius-item">
              <div
                className="demo__radius-box"
                style={{ borderRadius: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === TRANSITIONS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.transitions')}</h2>
        <div className="demo__token-grid">
          {transitionTokens.map((item) => (
            <div key={item.name} className="demo__transition-row">
              <code className="demo__token-name">{item.name}</code>
              <div className="demo__transition-track">
                <div
                  className="demo__transition-dot"
                  style={{ transition: `transform var(${item.name})` }}
                />
              </div>
              <span className="demo__token-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === SHADOWS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.shadows')}</h2>
        <div className="demo__shadow-list">
          {shadowTokens.map((item) => (
            <div key={item.name} className="demo__shadow-item">
              <div
                className="demo__shadow-box"
                style={{ boxShadow: `var(${item.name})` }}
              />
              <code className="demo__token-name">{item.name}</code>
            </div>
          ))}
        </div>
      </section>

      {/* === TYPOGRAPHY === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.typography')}</h2>
        {typographyClasses.map((item) => (
          <div key={item.className} className="demo__type-row">
            <div className="demo__type-label">{item.label}</div>
            <div className={item.className}>
              SweetAlchemy — Precision in every recipe
            </div>
            <div className="demo__type-meta">{item.desc}</div>
          </div>
        ))}
      </section>

      {/* === FONTS === */}
      <section className="demo__section">
        <h2 className="demo__section-title">{t('pages.demo.fonts')}</h2>
        <div className="demo__fonts">
          <div className="demo__font-card">
            <div className="demo__font-name">Rubik (--font-primary)</div>
            <div className="demo__font-sample" style={{ fontFamily: 'var(--font-primary)' }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="demo__font-weights">
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">400 Regular</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">500 Medium</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">700 Bold</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-primary)', fontWeight: 700 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
            </div>
          </div>

          <div className="demo__font-card">
            <div className="demo__font-name">Playpen Sans (--font-accent)</div>
            <div className="demo__font-sample" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="demo__font-weights">
              <div className="demo__font-weight">
                <span className="demo__font-weight-label">800 ExtraBold</span>
                <span className="demo__font-weight-text" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
                  SweetAlchemy 0123456789
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
