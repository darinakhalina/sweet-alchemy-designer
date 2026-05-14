import type { Meta, StoryObj } from '@storybook/react-vite';
import Carousel from './Carousel';
import './Carousel.stories.css';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Лайт-карусель на embla-carousel-react. Headless, без autoplay. Items-per-view конфігурується per breakpoint (`base` / `md` / `lg`). Стрілки і точки опціональні.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 40 }}>
        <div className="f-container">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <Carousel.Slide><div className="carousel-demo-slide">1</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">2</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">3</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">4</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">5</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">6</div></Carousel.Slide>
    </Carousel>
  ),
};

export const OnePerView: Story = {
  parameters: {
    docs: { description: { story: 'Одна картка на всі viewports — повна ширина.' } },
  },
  render: () => (
    <Carousel itemsPerView={{ base: 1, md: 1, lg: 1 }}>
      <Carousel.Slide><div className="carousel-demo-slide">1</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">2</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">3</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">4</div></Carousel.Slide>
    </Carousel>
  ),
};

export const FourPerDesktop: Story = {
  parameters: {
    docs: { description: { story: 'Більше карток на desktop: 1 / 2 / 4.' } },
  },
  render: () => (
    <Carousel itemsPerView={{ base: 1, md: 2, lg: 4 }}>
      <Carousel.Slide><div className="carousel-demo-slide">1</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">2</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">3</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">4</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">5</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">6</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">7</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">8</div></Carousel.Slide>
    </Carousel>
  ),
};

export const DotsOnly: Story = {
  parameters: {
    docs: { description: { story: 'Стрілки приховані, навігація лише через точки.' } },
  },
  render: () => (
    <Carousel showArrows={false}>
      <Carousel.Slide><div className="carousel-demo-slide">1</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">2</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">3</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">4</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">5</div></Carousel.Slide>
    </Carousel>
  ),
};

export const ArrowsOnly: Story = {
  parameters: {
    docs: { description: { story: 'Точки приховані, навігація лише через стрілки.' } },
  },
  render: () => (
    <Carousel showDots={false}>
      <Carousel.Slide><div className="carousel-demo-slide">1</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">2</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">3</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">4</div></Carousel.Slide>
      <Carousel.Slide><div className="carousel-demo-slide">5</div></Carousel.Slide>
    </Carousel>
  ),
};
