import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: true,
  Menu: false,
  showLogin: false,
  showSignup: false,
};

const conditionSlice = createSlice({
  name: "conditions",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    displayMenu: (state) => {
      state.Menu = true;
    },
    hideMenu: (state) => {
      state.Menu = false;
    },
    showLogin: (state) => {
      state.showLogin = true;
    },
    hideLogin: (state) => {
      state.showLogin = false;
    },
    showSignup: (state) => {
      state.showSignup = true;
    },
    hideSignup: (state) => {
      state.showSignup = false;
    },
  },
});

export const {
  toggleTheme,
  displayMenu,
  hideMenu,
  showLogin,
  hideLogin,
  showSignup,
  hideSignup,
} = conditionSlice.actions;

export const conditionReducer = conditionSlice.reducer;
