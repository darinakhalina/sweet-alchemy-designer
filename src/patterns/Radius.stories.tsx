import type { Meta, StoryObj } from '@storybook/react-vite';

const radiusTokens = [
  { name: '--radius-xs', value: '4px' },
  { name: '--radius-sm', value: '8px' },
  { name: '--radius-md', value: '16px' },
  { name: '--radius-lg', value: '24px' },
  { name: '--radius-xl', value: '30px' },
  { name: '--radius-full', value: '50%' },
  { name: '--radius-pill', value: '50px' },
];

const meta: Meta = {
  title: 'Design Tokens/Radius',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Border-radius токени: від `--radius-xs` (4px) до `--radius-full` (50%) і `--radius-pill` (50px).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Radius: Story = {
  name: 'Radius-токени',
  render: () => (
    <div className="demo__radius-list">
      {radiusTokens.map((item) => (
        <div key={item.name} className="demo__radius-item">
          <div className="demo__radius-box" style={{ borderRadius: `var(${item.name})` }} />
          <code className="demo__token-name">{item.name}</code>
          <span className="demo__token-value">{item.value}</span>
        </div>
      ))}
    </div>
  ),
};
