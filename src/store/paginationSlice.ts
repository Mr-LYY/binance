import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceNames } from '../types';
import { INITIAL_PAGE_NUMBER } from '../utils';

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: INITIAL_PAGE_NUMBER,
};

const paginationSlice = createSlice({
  name: SliceNames.PAGINATION,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
