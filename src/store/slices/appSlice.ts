import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app-slice',
  initialState: {
    userProfile: {
      roles: {
        roleName: 'user',
      },
    },
  },
  reducers: {
    setUserProfile: (state, payload: any) => {
      state.userProfile = payload;
    },
  },
});

export default appSlice.reducer;
export const { setUserProfile } = appSlice.actions;
