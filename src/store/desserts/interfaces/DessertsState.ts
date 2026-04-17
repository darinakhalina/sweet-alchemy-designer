import type { Dessert } from './Dessert';
import type { ApiError } from '@/services/interfaces/ApiError';

export interface DessertsState {
  items: Dessert[];
  isLoading: boolean;
  error: ApiError | null;
}
