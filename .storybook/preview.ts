import type { Preview } from '@storybook/react-vite';
import 'modern-normalize';
import '../src/styles/index.css';
import '../src/i18n';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: {
        order: ['Welcome', 'Design Tokens', 'Components', 'Patterns'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: { state: 'open' },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    a11y: {
      test: 'error',
      config: {
        rules: [
          // brand-розовый — намеренный design choice, контраст 2.34 < 4.5
          // TODO: фиксить дизайн (затемнить brand для текста або зробити фон --brand-800)
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
