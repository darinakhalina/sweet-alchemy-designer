import type { Meta, StoryObj } from '@storybook/react-vite';

const typographyClasses = [
  { className: 'h1', label: '.h1', desc: 'Rubik 700 / 64px / uppercase' },
  { className: 'h1-accent', label: '.h1-accent', desc: 'Playpen Sans 800 / 64px / uppercase / brand-600' },
  { className: 'h2', label: '.h2', desc: 'Rubik 700 / 28px / brand-600' },
  { className: 'text-bold', label: '.text-bold', desc: 'Rubik 500 / 20px' },
  { className: 'text-sm-bold', label: '.text-sm-bold', desc: 'Rubik 500 / 16px' },
  { className: 'text', label: '.text', desc: 'Rubik 400 / 20px' },
  { className: 'text-sm', label: '.text-sm', desc: 'Rubik 400 / 16px' },
];

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Готові CSS-класи для типографіки: заголовки, акценти, основний текст.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => (
    <>
      {typographyClasses.map((item) => (
        <div key={item.className} className="demo__type-row">
          <div className="demo__type-label">{item.label}</div>
          <div className={item.className}>
            SweetAlchemy — Precision in every recipe
          </div>
          <div className="demo__type-meta">{item.desc}</div>
        </div>
      ))}
    </>
  ),
};
