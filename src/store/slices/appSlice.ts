import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app-slice",
  initialState: {
    userProfile: {
      accountID: -1,
      email: "",
      fullName: "",
      accountPhoto: "",
      phoneNumber: "",
      roleNames: [],
      isActive: true,
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
