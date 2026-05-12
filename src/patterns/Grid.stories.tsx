import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design Tokens/Grid',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '12-колонкова grid-система через класи `row` + `col-N` (N від 1 до 12).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="demo__grid-cell">{children}</div>
);

export const Grid: Story = {
  name: 'Grid (12 columns)',
  render: () => (
    <>
      <h3 className="demo__subsection-title">12 × col-1</h3>
      <div className="row row--gap-sm mb-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="col-1"><Cell>1</Cell></div>
        ))}
      </div>

      <h3 className="demo__subsection-title">6 + 6</h3>
      <div className="row row--gap-sm mb-6">
        <div className="col-6"><Cell>col-6</Cell></div>
        <div className="col-6"><Cell>col-6</Cell></div>
      </div>

      <h3 className="demo__subsection-title">4 + 4 + 4</h3>
      <div className="row row--gap-sm mb-6">
        <div className="col-4"><Cell>col-4</Cell></div>
        <div className="col-4"><Cell>col-4</Cell></div>
        <div className="col-4"><Cell>col-4</Cell></div>
      </div>

      <h3 className="demo__subsection-title">3 + 3 + 3 + 3</h3>
      <div className="row row--gap-sm mb-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="col-3"><Cell>col-3</Cell></div>
        ))}
      </div>

      <h3 className="demo__subsection-title">8 + 4 (mixed)</h3>
      <div className="row row--gap-sm mb-6">
        <div className="col-8"><Cell>col-8</Cell></div>
        <div className="col-4"><Cell>col-4</Cell></div>
      </div>
    </>
  ),
};
