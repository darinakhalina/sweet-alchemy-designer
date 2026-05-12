import type { Meta, StoryObj } from '@storybook/react-vite';

const colors = [
  { name: '--brand-600', value: '#FE7BCF', var: 'var(--brand-600)' },
  { name: '--brand-800', value: '#F42EAD', var: 'var(--brand-800)' },
  { name: '--neutral-400', value: '#2B2117', var: 'var(--neutral-400)' },
  { name: '--neutral-200', value: '#626049', var: 'var(--neutral-200)' },
  { name: '--neutral-100', value: '#C3C2AD', var: 'var(--neutral-100)' },
  { name: '--neutral-50', value: '#E9E8E3', var: 'var(--neutral-50)' },
  { name: '--white', value: '#FFFFFF', var: 'var(--white)' },
];

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Палітра кольорів дизайн-системи: brand, neutral, white.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  name: 'Палітра кольорів',
  render: () => (
    <div className="demo__colors">
      {colors.map((color) => (
        <div key={color.name} className="demo__swatch">
          <div className="demo__swatch-box" style={{ backgroundColor: color.var }} />
          <span className="demo__swatch-name">{color.name}</span>
          <span className="demo__swatch-value">{color.value}</span>
        </div>
      ))}
    </div>
  ),
};
