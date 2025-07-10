import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeConfig } from '../../types';

interface ThemeState extends ThemeConfig {
  isLoaded: boolean;
}

const initialState: ThemeState = {
  colorMode: 'light',
  primaryColor: '#f08855',
  fontSize: 'md',
  reducedMotion: false,
  isLoaded: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.colorMode = action.payload;
      localStorage.setItem('colorMode', action.payload);
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
      localStorage.setItem('primaryColor', action.payload);
    },
    setFontSize: (state, action: PayloadAction<'sm' | 'md' | 'lg'>) => {
      state.fontSize = action.payload;
      localStorage.setItem('fontSize', action.payload);
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
      localStorage.setItem('reducedMotion', action.payload.toString());
    },
    loadThemeFromStorage: (state) => {
      const colorMode = localStorage.getItem('colorMode') as 'light' | 'dark' | 'auto' || 'light';
      const primaryColor = localStorage.getItem('primaryColor') || '#f08855';
      const fontSize = localStorage.getItem('fontSize') as 'sm' | 'md' | 'lg' || 'md';
      const reducedMotion = localStorage.getItem('reducedMotion') === 'true';

      state.colorMode = colorMode;
      state.primaryColor = primaryColor;
      state.fontSize = fontSize;
      state.reducedMotion = reducedMotion;
      state.isLoaded = true;
    },
    resetTheme: (state) => {
      state.colorMode = 'light';
      state.primaryColor = '#f08855';
      state.fontSize = 'md';
      state.reducedMotion = false;
      
      localStorage.removeItem('colorMode');
      localStorage.removeItem('primaryColor');
      localStorage.removeItem('fontSize');
      localStorage.removeItem('reducedMotion');
    },
  },
});

export const {
  setColorMode,
  setPrimaryColor,
  setFontSize,
  setReducedMotion,
  loadThemeFromStorage,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
