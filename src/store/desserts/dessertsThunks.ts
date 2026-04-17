import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDessertsFromApi, fetchDessertsWithError } from '@/services/dessertService';
import { normalizeError } from '@/services/helpers/normalizeError';
import { ERROR_CODES } from '@/constants/errorCodes';
import type { Dessert } from './interfaces/Dessert';
import type { ApiError } from '@/services/interfaces/ApiError';

export const fetchDesserts = createAsyncThunk<Dessert[], void, { rejectValue: ApiError }>(
  'desserts/fetchDesserts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDessertsFromApi();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const fetchDessertsError = createAsyncThunk<Dessert[], void, { rejectValue: ApiError }>(
  'desserts/fetchDessertsError',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDessertsWithError();
    } catch (error) {
      const apiError = normalizeError(error);
      return rejectWithValue({
        ...apiError,
        code: ERROR_CODES.desserts.fetchFailed,
      });
    }
  },
);
