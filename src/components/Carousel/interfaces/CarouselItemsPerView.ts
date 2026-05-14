export interface CarouselItemsPerView {
  /** Number of slides visible on mobile (≤767). Required. */
  base: number;
  /** Number on tablet (≥768). Defaults to base. */
  md?: number;
  /** Number on desktop (≥1200). Defaults to md ?? base. */
  lg?: number;
}
