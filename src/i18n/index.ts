import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Deep merge utility
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]) &&
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// Collect all i18n files from components, pages, and shared
const ukModules = import.meta.glob<Record<string, unknown>>(
  ['../components/**/i18n/uk.json', '../pages/**/i18n/uk.json', './shared/uk.json'],
  { eager: true, import: 'default' },
);

const enModules = import.meta.glob<Record<string, unknown>>(
  ['../components/**/i18n/en.json', '../pages/**/i18n/en.json', './shared/en.json'],
  { eager: true, import: 'default' },
);

// Merge all modules into one translation object per language
function mergeModules(modules: Record<string, Record<string, unknown>>): Record<string, unknown> {
  let merged: Record<string, unknown> = {};
  for (const mod of Object.values(modules)) {
    merged = deepMerge(merged, mod);
  }
  return merged;
}

const resources = {
  uk: { translation: mergeModules(ukModules) },
  en: { translation: mergeModules(enModules) },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    supportedLngs: ['uk', 'en'],
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
