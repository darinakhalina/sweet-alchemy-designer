import type { Meta, StoryObj } from '@storybook/react-vite';

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

const meta: Meta = {
  title: 'Design Tokens/Semantic Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Семантичні кольори — алiаси з конкретним призначенням (текст, фон, рамка, статуси).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SemanticTokens: Story = {
  name: 'Семантичні кольори',
  render: () => (
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
  ),
};
