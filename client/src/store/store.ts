
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import mouseReducer from './mouseSlice';
import imagesReducer from './imageSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    mouse: mouseReducer,
    images : imagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
