import type { Meta, StoryObj } from '@storybook/react-vite';

const breakpoints = [
  { name: '--mobile', value: 'max-width: 767px' },
  { name: '--tablet', value: '768px — 1199px' },
  { name: '--desktop', value: 'min-width: 1200px' },
  { name: '--not-mobile', value: 'min-width: 768px (tablet + desktop)' },
  { name: '--not-desktop', value: 'max-width: 1199px (mobile + tablet)' },
];

const meta: Meta = {
  title: 'Design Tokens/Breakpoints',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Custom-media токени для responsive-стилів (mobile, tablet, desktop).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Breakpoints: Story = {
  render: () => (
    <>
      <h3 className="demo__subsection-title">Токени</h3>
      <div className="demo__utilities-table mb-6">
        {breakpoints.map((bp) => (
          <div key={bp.name} className="demo__utilities-row">
            <code className="demo__token-name">{bp.name}</code>
            <span className="demo__token-value">{bp.value}</span>
          </div>
        ))}
      </div>

      <h3 className="demo__subsection-title">Використання</h3>
      <div className="demo__code-block mb-6">
        <pre className="demo__code">
          {`/* breakpoints.css */
@custom-media --mobile (max-width: 767px);
@custom-media --tablet (min-width: 768px) and (max-width: 1199px);
@custom-media --desktop (min-width: 1200px);

/* component.css */
.card {
  padding: var(--space-6);
}

@media (--mobile) {
  .card { padding: var(--space-3); }
}

@media (--not-mobile) {
  .card { display: flex; gap: var(--space-6); }
}`}
        </pre>
      </div>

      <h3 className="demo__subsection-title">Live (зміни розмір вікна)</h3>
      <div className="demo__breakpoint-live">
        <div className="demo__breakpoint-indicator demo__breakpoint-indicator--mobile visible-mobile">
          MOBILE (&lt; 768px)
        </div>
        <div className="demo__breakpoint-indicator demo__breakpoint-indicator--tablet visible-tablet">
          TABLET (768px — 1199px)
        </div>
        <div className="demo__breakpoint-indicator demo__breakpoint-indicator--desktop visible-desktop">
          DESKTOP (1200px+)
        </div>
      </div>
    </>
  ),
};
