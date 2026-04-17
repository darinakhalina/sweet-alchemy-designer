import type { Dessert } from '@/store/desserts/interfaces/Dessert';
import { mockDesserts } from '@/store/desserts/constants/mockDesserts';

const STUB_DELAY = 1000;

// TODO: replace with api.get<Dessert[]>('/desserts')
export const fetchDessertsFromApi = (): Promise<Dessert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDesserts), STUB_DELAY);
  });
};

// TODO: replace with real API call
export const fetchDessertsWithError = (): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Server error')), STUB_DELAY);
  });
};
