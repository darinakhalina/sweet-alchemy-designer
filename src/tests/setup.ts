import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'uk',
      resolvedLanguage: 'uk',
      changeLanguage: vi.fn(),
    },
  }),
}));
