import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import Hero from '../Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero/Tests',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Структурні тести для Hero: рендер тайтлів, опис, CTA, картинка, мердж className.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const RendersDescription: Story = {
  name: 'Рендерить description',
  render: () => <Hero description="Hello hero" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Hello hero')).toBeInTheDocument();
  },
};

export const HidesTitleBlockWhenEmpty: Story = {
  name: 'Без title і accentTitle — title-block відсутній',
  render: () => <Hero description="No titles" />,
  play: async ({ canvasElement }) => {
    const titleBlock = canvasElement.querySelector('.hero__title-block');
    await expect(titleBlock).toBeNull();
  },
};

export const RendersBothTitles: Story = {
  name: 'Рендерить обидва заголовки з відповідними класами',
  render: () => <Hero title="Plain" accentTitle="Accent" description="d" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const plain = canvas.getByText('Plain');
    const accent = canvas.getByText('Accent');
    await expect(plain).toHaveClass('h1');
    await expect(accent).toHaveClass('h1-accent');
    await expect(accent).toHaveClass('hero__title--accent');
  },
};

export const RendersImageWhenProvided: Story = {
  name: 'Картинка рендериться у Framed коли image задано',
  render: () => (
    <Hero
      description="d"
      image={{ src: 'https://picsum.photos/seed/hero-test/400/500', alt: '' }}
    />
  ),
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('.hero__image img');
    await expect(img).toBeInTheDocument();
    const framed = canvasElement.querySelector('.hero__image .framed');
    await expect(framed).toBeInTheDocument();
  },
};

export const NoImageWithoutProp: Story = {
  name: 'Без image prop картинка не рендериться',
  render: () => <Hero description="d" />,
  play: async ({ canvasElement }) => {
    const imageBox = canvasElement.querySelector('.hero__image');
    await expect(imageBox).toBeNull();
  },
};

export const ChildrenRenderInCta: Story = {
  name: 'children рендеряться у .hero__cta',
  render: () => (
    <Hero description="d">
      <button data-testid="cta-btn">Click</button>
    </Hero>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByTestId('cta-btn');
    await expect(btn).toBeInTheDocument();
    await expect(btn.parentElement).toHaveClass('hero__cta');
  },
};

export const CustomClassName: Story = {
  name: 'className мерджиться у root',
  render: () => <Hero description="d" className="custom-hero" />,
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('.hero');
    await expect(root).toHaveClass('hero', 'custom-hero');
  },
};

export const ImageVariantOnFramed: Story = {
  name: 'image.variant передається у Framed',
  render: () => (
    <Hero
      description="d"
      image={{ src: 'https://picsum.photos/seed/hero-variant/400/500', alt: '', variant: 5 }}
    />
  ),
  play: async ({ canvasElement }) => {
    const framed = canvasElement.querySelector('.hero__image .framed');
    await expect(framed).toHaveClass('framed--5');
  },
};
