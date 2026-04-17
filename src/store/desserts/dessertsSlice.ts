import { createSlice } from '@reduxjs/toolkit';
import type { DessertsState } from './interfaces/DessertsState';
import { fetchDesserts, fetchDessertsError } from './dessertsThunks';

const initialState: DessertsState = {
  items: [],
  isLoading: false,
  error: null,
};

const dessertsSlice = createSlice({
  name: 'desserts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesserts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDesserts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDesserts.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.error = action.payload ?? null;
      })
      .addCase(fetchDessertsError.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDessertsError.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDessertsError.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.error = action.payload ?? null;
      });
  },
});

export const dessertsReducer = dessertsSlice.reducer;
