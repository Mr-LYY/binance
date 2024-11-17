import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceNames } from '../types';

interface INotificationState {
  message: string;
}

const initialState: INotificationState = {
  message: '',
};

const notificationSlice = createSlice({
  name: SliceNames.FILTER,
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearNotification: (state) => {
      state.message = '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
