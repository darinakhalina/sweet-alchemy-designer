import type { Meta, StoryObj } from '@storybook/react-vite';

const fontSizeTokens = [
  { name: '--font-size-xs', value: '12px' },
  { name: '--font-size-sm', value: '14px' },
  { name: '--font-size-base', value: '16px' },
  { name: '--font-size-md', value: '18px' },
  { name: '--font-size-lg', value: '20px' },
  { name: '--font-size-xl', value: '24px' },
  { name: '--font-size-2xl', value: '28px' },
  { name: '--font-size-3xl', value: '36px' },
  { name: '--font-size-4xl', value: '48px' },
  { name: '--font-size-5xl', value: '64px' },
];

const meta: Meta = {
  title: 'Design Tokens/Font Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Font-size токени: від xs (12px) до 5xl (64px).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FontSizes: Story = {
  name: 'Font sizes',
  render: () => (
    <div className="demo__token-grid">
      {fontSizeTokens.map((item) => (
        <div key={item.name} className="demo__token-row">
          <code className="demo__token-name">{item.name}</code>
          <span style={{ fontSize: `var(${item.name})` }}>SweetAlchemy</span>
          <span className="demo__token-value">{item.value}</span>
        </div>
      ))}
    </div>
  ),
};
