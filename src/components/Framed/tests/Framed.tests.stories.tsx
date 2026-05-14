import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Framed from '../Framed';

const swatchStyle = {
  width: 200,
  height: 200,
  background: 'var(--neutral-50)',
};

const meta: Meta<typeof Framed> = {
  title: 'Components/Framed/Tests',
  component: Framed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Структурні тести для Framed: класи, модульна циклічність variant, мердж className. Кожен тест рендерить квадрат 200×200, щоб рамку було видно.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Framed>;

export const RendersChildren: Story = {
  name: 'Рендерить children у корінь',
  render: () => (
    <div style={{ width: 200 }}>
      <Framed>
        <div data-testid="framed-child" style={swatchStyle} />
      </Framed>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const child = canvas.getByTestId('framed-child');
    await expect(child).toBeInTheDocument();
    await expect(child.parentElement).toHaveClass('framed');
  },
};

export const DefaultVariant: Story = {
  name: 'Без variant prop → клас framed--0',
  render: () => (
    <div style={{ width: 200 }}>
      <Framed>
        <div style={swatchStyle} />
      </Framed>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.framed');
    await expect(root).toHaveClass('framed', 'framed--0');
  },
};

export const SpecificVariant: Story = {
  name: 'variant={3} → клас framed--3',
  render: () => (
    <div style={{ width: 200 }}>
      <Framed variant={3}>
        <div style={swatchStyle} />
      </Framed>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.framed');
    await expect(root).toHaveClass('framed--3');
  },
};

export const ModuloCycling: Story = {
  name: 'variant={23} → framed--3 (modulo 20)',
  render: () => (
    <div style={{ width: 200 }}>
      <Framed variant={23}>
        <div style={swatchStyle} />
      </Framed>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.framed');
    await expect(root).toHaveClass('framed--3');
  },
};

export const CustomClassName: Story = {
  name: 'className мерджиться у root',
  render: () => (
    <div style={{ width: 200 }}>
      <Framed className="custom-class">
        <div style={swatchStyle} />
      </Framed>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.framed');
    await expect(root).toHaveClass('framed', 'framed--0', 'custom-class');
  },
};
