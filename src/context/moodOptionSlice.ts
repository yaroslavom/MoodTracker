import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

export interface moodState {
  moodOption: MoodOptionType[];
  moodList: MoodOptionWithTimestamp[];
}

const initialState: moodState = {
  moodOption: [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
  ],
  moodList: [],
};

export const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    addMood: (state, action: PayloadAction<MoodOptionWithTimestamp>) => {
      const mood = action.payload;
      state.moodList.push(mood);
    },
  },
});

export const { addMood } = moodSlice.actions;

export default moodSlice.reducer;
