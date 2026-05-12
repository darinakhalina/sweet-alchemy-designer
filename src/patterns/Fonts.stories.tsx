import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design Tokens/Fonts',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Шрифти дизайн-системи: Rubik (основний) і Playpen Sans (акцент).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Fonts: Story = {
  render: () => (
    <div className="demo__fonts">
      <div className="demo__font-card">
        <div className="demo__font-name">Rubik (--font-primary)</div>
        <div className="demo__font-sample" style={{ fontFamily: 'var(--font-primary)' }}>
          The quick brown fox jumps over the lazy dog
        </div>
        <div className="demo__font-weights">
          {[400, 500, 700].map((w) => (
            <div key={w} className="demo__font-weight">
              <span className="demo__font-weight-label">{w} {w === 400 ? 'Regular' : w === 500 ? 'Medium' : 'Bold'}</span>
              <span
                className="demo__font-weight-text"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: w }}
              >
                SweetAlchemy 0123456789
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="demo__font-card">
        <div className="demo__font-name">Playpen Sans (--font-accent)</div>
        <div className="demo__font-sample" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
          The quick brown fox jumps over the lazy dog
        </div>
        <div className="demo__font-weights">
          <div className="demo__font-weight">
            <span className="demo__font-weight-label">800 ExtraBold</span>
            <span
              className="demo__font-weight-text"
              style={{ fontFamily: 'var(--font-accent)', fontWeight: 800 }}
            >
              SweetAlchemy 0123456789
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};
