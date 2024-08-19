import { ThemeType } from "@app/interfaces/interfaces";
import { createAction, createSlice, PrepareAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: ThemeType;
}

export const defaultTheme =
  (localStorage.getItem("theme") as ThemeType) || "light";

localStorage.setItem("theme", defaultTheme);

const initialState: ThemeState = {
  theme: "light",
};

export const setTheme = createAction<PrepareAction<ThemeType>>(
  "theme/setTheme",
  (theme: ThemeType) => {
    localStorage.setItem("theme", theme);
    return {
      payload: theme,
    };
  }
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTheme, (state, action) => {
      state.theme = action.payload;
    });
  },
});

export default themeSlice.reducer;
