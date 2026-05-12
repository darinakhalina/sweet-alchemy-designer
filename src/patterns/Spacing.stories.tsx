import type { Meta, StoryObj } from '@storybook/react-vite';

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

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing-токени: шкала з кроком 4px, від `--space-1` до `--space-20`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  name: 'Spacing-токени',
  render: () => (
    <div className="demo__spacing-list">
      {spacingTokens.map((item) => (
        <div key={item.name} className="demo__spacing-row">
          <code className="demo__token-name">{item.name}</code>
          <div className="demo__spacing-bar-wrap">
            <div className="demo__spacing-bar" style={{ width: `var(${item.name})` }} />
          </div>
          <span className="demo__token-value">{item.value}</span>
        </div>
      ))}
    </div>
  ),
};
