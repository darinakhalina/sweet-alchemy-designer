import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { languages } from './constants/languages';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language;

  return (
    <div className="lang-switcher">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={clsx('lang-switcher__btn', currentLang === code && 'lang-switcher__btn--active')}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={currentLang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
