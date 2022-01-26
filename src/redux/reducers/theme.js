import { createSlice } from '@reduxjs/toolkit';
import baseTheme from '../../theme/baseTheme';
import lightTheme from '../../theme/lightTheme';
import darkTheme from '../../theme/darkTheme';

const darkThemeState = {
  theme: 'dark',
  ...baseTheme,
  ...darkTheme,
};

const lightThemeState = {
  theme: 'light',
  ...baseTheme,
  ...lightTheme,
};

const theme = createSlice({
  name: 'theme',
  initialState: lightThemeState,
  reducers: {
    switchTheme: (state, action) => {
      if (
        action.payload === 'dark' ||
        (action.payload === 'switch' && state.theme === 'light')
      ) {
        return darkThemeState;
      }
      if (
        action.payload === 'light' ||
        (action.payload === 'switch' && state.theme === 'dark')
      ) {
        return lightThemeState;
      }
    },
  },
});

export const { switchTheme } = theme.actions;

export default theme.reducer;
