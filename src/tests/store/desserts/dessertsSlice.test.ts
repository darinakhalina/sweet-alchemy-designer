import { dessertsReducer } from '@/store/desserts/dessertsSlice';
import { fetchDesserts, fetchDessertsError } from '@/store/desserts/dessertsThunks';
import type { DessertsState } from '@/store/desserts/interfaces/DessertsState';
import type { ApiError } from '@/services/interfaces/ApiError';
import { mockDesserts } from '@/store/desserts/constants/mockDesserts';

const initialState: DessertsState = {
  items: [],
  isLoading: false,
  error: null,
};

const mockApiError: ApiError = {
  code: 'dessertsFetchFailed',
  message: 'Server error',
  status: 500,
};

describe('dessertsSlice', () => {
  it('returns initial state', () => {
    const state = dessertsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('fetchDesserts', () => {
    it('sets isLoading on pending', () => {
      const state = dessertsReducer(initialState, fetchDesserts.pending(''));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('sets items on fulfilled', () => {
      const state = dessertsReducer(
        { ...initialState, isLoading: true },
        fetchDesserts.fulfilled(mockDesserts, ''),
      );
      expect(state.isLoading).toBe(false);
      expect(state.items).toEqual(mockDesserts);
    });

    it('clears items and sets error on rejected', () => {
      const stateWithItems: DessertsState = {
        items: mockDesserts,
        isLoading: true,
        error: null,
      };
      const state = dessertsReducer(
        stateWithItems,
        fetchDesserts.rejected(null, '', undefined, mockApiError),
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockApiError);
      expect(state.items).toEqual([]);
    });
  });

  describe('fetchDessertsError', () => {
    it('sets isLoading on pending', () => {
      const state = dessertsReducer(initialState, fetchDessertsError.pending(''));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('clears items and sets error on rejected', () => {
      const state = dessertsReducer(
        { ...initialState, isLoading: true },
        fetchDessertsError.rejected(null, '', undefined, mockApiError),
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockApiError);
      expect(state.items).toEqual([]);
    });
  });
});
