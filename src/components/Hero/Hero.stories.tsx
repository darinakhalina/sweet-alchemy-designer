import type { Meta, StoryObj } from '@storybook/react-vite';
import Hero from './Hero';
import Button from '@/components/Button';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hero-секція для landing-сторінок. Підтримує два варіанти заголовка (плейн + акцент), опис, 1–2 CTA-кнопки через children та опційну фрейм-картинку справа. Адаптується через 3 breakpoints.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    accentTitle: { control: 'text' },
    description: { control: 'text' },
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
type Story = StoryObj<typeof Hero>;

/* ────────── Пісочниця ────────── */

export const Playground: Story = {
  args: {
    title: 'Вимикай калькулятор',
    accentTitle: 'Вмикай натхнення',
    description: 'Адаптуй будь-який рецепт під нову форму за 3 секунди. Більше жодних зіпсованих продуктів через помилки в пропорціях.',
  },
  render: (args) => (
    <Hero {...args}>
      <Button variant="primary" size="lg">Спробувати безкоштовно</Button>
      <Button variant="secondary" size="lg">Детальніше про продукт</Button>
    </Hero>
  ),
};

/* ────────── Кейси з Figma ────────── */

export const WithBothTitles: Story = {
  parameters: {
    docs: { description: { story: 'Figma 84:2465 — два рядки заголовка, дві CTA-кнопки, без картинки.' } },
  },
  render: () => (
    <Hero
      title="Вимикай калькулятор"
      accentTitle="Вмикай натхнення"
      description="Адаптуй будь-який рецепт під нову форму за 3 секунди. Більше жодних зіпсованих продуктів через помилки в пропорціях."
    >
      <Button variant="primary" size="lg">Спробувати безкоштовно</Button>
      <Button variant="secondary" size="lg">Детальніше про продукт</Button>
    </Hero>
  ),
};

export const WithImage: Story = {
  parameters: {
    docs: { description: { story: 'Figma 4146:1436 — лише акцентний заголовок, одна CTA, фрейм-картинка справа.' } },
  },
  render: () => (
    <Hero
      accentTitle="Твій цифровий помічник на кухні, який бере на себе найнуднішу роботу"
      description="Змінилася ціна на цукор? Один клік — і вартість десертів оновилася. Потрібен торт не на 2 кг, а на 5? Система сама перерахує кількість інгредієнтів."
      image={{ src: 'https://picsum.photos/seed/hero-cake/800/1000', alt: '', variant: 0 }}
    >
      <Button variant="primary" size="lg">Спробувати безкоштовно</Button>
    </Hero>
  ),
};

export const AccentOnly: Story = {
  parameters: {
    docs: { description: { story: 'Тільки акцентний заголовок, без плейн-h1, без картинки.' } },
  },
  render: () => (
    <Hero
      accentTitle="Заробляти, а не просто пекти"
      description="Точна собівартість, миттєвий перерахунок, розумна книга рецептів."
    >
      <Button variant="primary" size="lg">Спробувати безкоштовно</Button>
    </Hero>
  ),
};

/* ────────── Responsive ────────── */
/*
 * Hero має 3 breakpoints (--mobile, --tablet, --desktop), які залежать від ширини viewport,
 * а не контейнера. Щоб подивитися адаптив — ресайзіть вікно браузера або відкрийте DevTools
 * Responsive Mode:
 *   - ≤767px → mobile (1 колонка, картинка зверху, кнопки на всю ширину, шрифти 36px)
 *   - 768–1199px → tablet (row, шрифти 48px)
 *   - ≥1200px → desktop (row, шрифти 64px, max-width 1440px)
 *
 * Шрифти зменшуються через typography.css (.h1 / .h1-accent відповідають за розмір).
 */
