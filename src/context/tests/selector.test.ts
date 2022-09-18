import { store } from './../store';
import { moodOptionSelector, moodListSelector } from './../selector';

describe('redux selectors', () => {
  it('should select initial state', () => {
    const initialState = [
      { emoji: '🧑‍💻', description: 'studious' },
      { emoji: '🤔', description: 'pensive' },
      { emoji: '😊', description: 'happy' },
      { emoji: '🥳', description: 'celebratory' },
      { emoji: '😤', description: 'frustrated' },
    ];
    const result = moodOptionSelector(store.getState());

    expect(result).toEqual(initialState);
  });

  it('should select initial moodList state which is empty array', () => {
    const moodItem = [
      {
        mood: { emoji: 'string', description: 'string' },
        timestamp: 0,
      },
    ];
    const result = moodListSelector(store.getState());

    expect(result).not.toEqual(moodItem);
    expect(result).toEqual([]);
  });
});
