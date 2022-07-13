import { configureStore } from '@reduxjs/toolkit';
import moodOptionReducer from './moodOptionSlice';

export const store = configureStore({
  reducer: {
    mood: moodOptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
