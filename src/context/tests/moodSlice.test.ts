import moodSlice, { addMood, deleteMood } from '../moodSlice';

describe('moodSlice', () => {
  const initialState: any = {
    moodList: [],
    moodOption: [
      { emoji: '🧑‍💻', description: 'studious' },
      { emoji: '🤔', description: 'pensive' },
      { emoji: '😊', description: 'happy' },
      { emoji: '🥳', description: 'celebratory' },
      { emoji: '😤', description: 'frustrated' },
    ],
  };
  const payload = {
    mood: { emoji: 'string', description: 'string' },
    timestamp: 1,
  };

  it('should return default state when passed an empty action', () => {
    const result = moodSlice(undefined, { type: '' });

    expect(result).toStrictEqual(initialState);
  });

  it('should add new mood with addMood action', () => {
    const action = {
      type: addMood.type,
      payload,
    };
    const result = moodSlice(initialState, action);

    expect(result.moodList[0]).toStrictEqual(payload);
  });

  it('should remove mood item by timestamp if such exists in moodList', () => {
    const stateWithPayload = {
      moodOption: initialState.moodOption,
      moodList: [payload],
    };
    const action = { type: deleteMood.type, payload };
    const result = moodSlice(stateWithPayload, action);

    expect(result).toEqual(initialState);
  });

  it('should stay all mood items, if such timestamp is not exists in moodList', () => {
    const stateWithPayload = {
      moodOption: initialState.moodOption,
      moodList: [payload],
    };
    const stolenPayload = { ...payload, timestamp: 2 };
    const action = { type: deleteMood.type, payload: stolenPayload };
    const result = moodSlice(stateWithPayload, action);

    expect(result).toEqual(stateWithPayload);
  });
});
