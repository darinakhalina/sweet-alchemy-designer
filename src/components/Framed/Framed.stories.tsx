import type { Meta, StoryObj } from '@storybook/react-vite';
import Framed from './Framed';
import { FRAME_VARIANT_COUNT } from './constants/frameVariantCount';

const meta: Meta<typeof Framed> = {
  title: 'Components/Framed',
  component: Framed,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Розова декоративна рамка навколо картинки чи блоку. Один div зі ::after псевдоелементом і набором CSS-змінних. Розтягується разом із батьківським контейнером, тримає пропорції завдяки процентним зсувам.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'number', min: 0, max: FRAME_VARIANT_COUNT - 1, step: 1 },
      description: `Будь-яке невід'ємне ціле; компонент бере залишок від ділення на ${FRAME_VARIANT_COUNT}.`,
    },
    className: { control: 'text' },
  },
  args: {
    variant: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 60 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Framed>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  render: ({ variant }) => (
    <div style={{ maxWidth: 600 }}>
      <Framed variant={variant}>
        <img src="https://picsum.photos/seed/dessert-hero/800/1000" alt="" />
      </Framed>
    </div>
  ),
};

/* ────────── Кейси ────────── */

export const HeroPortrait: Story = {
  parameters: {
    docs: { description: { story: 'Велике портретне фото героя, max-width 600px. Демонструє пресет №0 (з Figma).' } },
  },
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Framed variant={0}>
        <img src="https://picsum.photos/seed/dessert-hero/800/1000" alt="" />
      </Framed>
    </div>
  ),
};

export const CardRow: Story = {
  parameters: {
    docs: { description: { story: 'Три картки однакової висоти. Контейнер max-width 900px, картинки aspect-ratio 4 / 3 з object-fit: cover.' } },
  },
  render: () => {
    const imgStyle = { aspectRatio: '4 / 3', objectFit: 'cover' as const };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 900 }}>
        <Framed variant={5}>
          <img src="https://picsum.photos/seed/cake-square/600/600" alt="" style={imgStyle} />
        </Framed>
        <Framed variant={8}>
          <img src="https://picsum.photos/seed/cake-portrait/600/800" alt="" style={imgStyle} />
        </Framed>
        <Framed variant={13}>
          <img src="https://picsum.photos/seed/cake-landscape/800/500" alt="" style={imgStyle} />
        </Framed>
      </div>
    );
  },
};

export const WideBanner: Story = {
  parameters: {
    docs: { description: { story: 'Широкий ландшафтний баннер, max-width 1000px.' } },
  },
  render: () => (
    <div style={{ maxWidth: 1000 }}>
      <Framed variant={7}>
        <img src="https://picsum.photos/seed/cake-banner/1600/400" alt="" />
      </Framed>
    </div>
  ),
};

/* ────────── Огляд всіх пресетів ────────── */

export const AllVariants: Story = {
  parameters: {
    docs: { description: { story: '20 пресетів у сітці 5×4. Кожна клітинка має aspect-ratio 1, тож рамка ідентично «обнімає» квадратний блок.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32, maxWidth: 1000 }}>
      {Array.from({ length: FRAME_VARIANT_COUNT }, (_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Framed variant={i}>
            <div style={{ width: '100%', aspectRatio: 1, background: 'var(--neutral-50)' }} />
          </Framed>
          <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{i}</span>
        </div>
      ))}
    </div>
  ),
};
