import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceNames } from '../types';

interface IFilterState {
  filter: string;
}

const initialState: IFilterState = {
  filter: '',
};

const filterSlice = createSlice({
  name: SliceNames.FILTER,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
