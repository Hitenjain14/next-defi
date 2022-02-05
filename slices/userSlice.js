import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info = [...state.info, action.payload];
    },
    deleteInfo: (state) => {
      state.info = [];
    },
  },
});

export const { addInfo, deleteInfo } = userSlice.actions;
export const selectUser = (state) => state.user.info;
export const selectTotal = (state) =>
  state.user.info.reduce((total, inf) => total + inf.balance, 0);
export default userSlice.reducer;
