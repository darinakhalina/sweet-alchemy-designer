export const ROUTES = {
  HOME: '/',
  CONSTRUCTOR: '/constructor',
  SEARCH: '/search',
  MY_RECIPES: '/my-recipes',
  RECIPE_DETAIL: '/recipe/:id',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  ABOUT: '/about',
  DEMO: '/demo',
  DEMO_PATTERNS: '/demo/patterns',
  LOGIN: '/login',
} as const;

export const buildRecipeDetailPath = (id: string | number): string =>
  `/recipe/${id}`;
