import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app-slice',
  initialState: {
    userProfile: {
      accessToken: '',
      accountID: 0,
      email: '',
      refreshToken: '',
      role: '',
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
