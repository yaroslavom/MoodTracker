import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MoodPicker } from '../components/MoodPicker';
import { MoodItemRow } from '../components/MoodItemRow';
import { RootState } from '../context/store';
import { addMood } from '../context/moodOptionSlice';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

const Home: React.FC = () => {
  const moodList = useSelector((state: RootState) => state.mood.moodList);
  const dispatch = useDispatch();

  const handleSelectMood = React.useCallback(
    (mood: MoodOptionType) => {
      dispatch(addMood({ mood, timestamp: Date.now() }));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
      {moodList.map((item: MoodOptionWithTimestamp) => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
