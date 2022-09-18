import type { RootState } from './store';

export const moodOptionSelector = (state: RootState) => state.moodOption;

export const moodListSelector = (state: RootState) => state.moodList;
