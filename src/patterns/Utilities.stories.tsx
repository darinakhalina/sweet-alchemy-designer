import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design Tokens/Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Утилітарні CSS-класи: spacing (.m/.p), display, flex, text-alignment, responsive-варіанти.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Utilities: Story = {
  render: () => (
    <>
      <h3 className="demo__subsection-title">Spacing (margin / padding)</h3>
      <div className="demo__utilities-table">
        <div className="demo__utilities-row">
          <code className="demo__token-name">.mt-4, .mb-4, .ml-4, .mr-4</code>
          <span className="demo__token-value">margin-top/bottom/left/right: var(--space-4)</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.mx-auto</code>
          <span className="demo__token-value">margin-left: auto; margin-right: auto</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.p-4, .px-4, .py-4</code>
          <span className="demo__token-value">padding / padding-x / padding-y: var(--space-4)</span>
        </div>
      </div>
      <div className="demo__utilities-demo mt-4">
        <div className="demo__utilities-box p-2"><code>.p-2</code></div>
        <div className="demo__utilities-box p-4"><code>.p-4</code></div>
        <div className="demo__utilities-box p-6"><code>.p-6</code></div>
        <div className="demo__utilities-box p-8"><code>.p-8</code></div>
      </div>

      <h3 className="demo__subsection-title mt-8">Display</h3>
      <div className="demo__utilities-table">
        <div className="demo__utilities-row">
          <code className="demo__token-name">.d-none, .d-block, .d-flex, .d-inline-block</code>
          <span className="demo__token-value">display values</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.d-md-none, .d-md-flex, .d-lg-block</code>
          <span className="demo__token-value">responsive (mobile-first)</span>
        </div>
      </div>

      <h3 className="demo__subsection-title mt-8">Flex</h3>
      <div className="demo__utilities-table">
        <div className="demo__utilities-row">
          <code className="demo__token-name">.flex-row, .flex-column, .flex-wrap</code>
          <span className="demo__token-value">flex-direction / wrap</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.justify-center, .justify-between, .align-center</code>
          <span className="demo__token-value">justify / align</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.gap-1 ... .gap-8</code>
          <span className="demo__token-value">gap через spacing-токени</span>
        </div>
      </div>
      <div className="d-flex gap-4 flex-wrap mt-4">
        <div className="demo__grid-cell px-4 py-2">flex item 1</div>
        <div className="demo__grid-cell px-4 py-2">flex item 2</div>
        <div className="demo__grid-cell px-4 py-2">flex item 3</div>
      </div>

      <h3 className="demo__subsection-title mt-8">Text</h3>
      <div className="demo__utilities-table">
        <div className="demo__utilities-row">
          <code className="demo__token-name">.text-left, .text-center, .text-right</code>
          <span className="demo__token-value">text-align</span>
        </div>
        <div className="demo__utilities-row">
          <code className="demo__token-name">.text-uppercase, .text-truncate</code>
          <span className="demo__token-value">transform / overflow</span>
        </div>
      </div>
      <div className="row row--gap-sm mt-4">
        <div className="col-4"><div className="demo__text-align-cell text-left">.text-left</div></div>
        <div className="col-4"><div className="demo__text-align-cell text-center">.text-center</div></div>
        <div className="col-4"><div className="demo__text-align-cell text-right">.text-right</div></div>
      </div>
    </>
  ),
};
