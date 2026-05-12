import type { Meta, StoryObj } from '@storybook/react-vite';

const transitionTokens = [
  { name: '--transition-fast', value: '150ms ease' },
  { name: '--transition-normal', value: '200ms ease' },
  { name: '--transition-slow', value: '300ms ease' },
];

const meta: Meta = {
  title: 'Design Tokens/Transitions',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Transition-токени для анімацій: fast / normal / slow.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Transitions: Story = {
  render: () => (
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
  ),
};
