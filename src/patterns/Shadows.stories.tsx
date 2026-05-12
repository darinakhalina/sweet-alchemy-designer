import type { Meta, StoryObj } from '@storybook/react-vite';

const shadowTokens = [
  { name: '--shadow-sm', value: '0 2px 6px rgba(0,0,0,0.05)' },
  { name: '--shadow-md', value: '0 2px 6px rgba(0,0,0,0.05), 0 12px 24px rgba(0,0,0,0.06)' },
];

const meta: Meta = {
  title: 'Design Tokens/Shadows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shadow-токени: sm / md.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Shadows: Story = {
  render: () => (
    <div className="demo__shadow-list">
      {shadowTokens.map((item) => (
        <div key={item.name} className="demo__shadow-item">
          <div className="demo__shadow-box" style={{ boxShadow: `var(${item.name})` }} />
          <code className="demo__token-name">{item.name}</code>
        </div>
      ))}
    </div>
  ),
};
