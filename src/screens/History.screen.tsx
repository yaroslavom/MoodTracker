import { ScrollView } from 'react-native';
import React from 'react';
import { MoodItemRow } from '../components/MoodItemRow';
import { RootState } from '../context/store';
import { useAppSelector } from '../hooks';
import { MoodOptionWithTimestamp } from '../types';

const History: React.FC = () => {
  const moodList = useAppSelector((state: RootState) => state.moodList);
  return (
    <ScrollView>
      {moodList.map((item: MoodOptionWithTimestamp) => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </ScrollView>
  );
};

export default History;
