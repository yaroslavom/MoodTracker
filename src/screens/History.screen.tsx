import { ScrollView, LayoutAnimation } from 'react-native';
import React from 'react';
import { deleteMood } from '../context/moodSlice';
import MoodItemRow from '../components/MoodItemRow';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MoodOptionWithTimestamp } from '../types';
import { moodListSelector } from '../context/selector';

const History: React.FC = () => {
  const moodList = useAppSelector(moodListSelector).slice().reverse();

  const dispatch = useAppDispatch();

  const handleDeleteMood = React.useCallback(
    (selectedItem: MoodOptionWithTimestamp) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(deleteMood(selectedItem));
    },
    [dispatch],
  );

  return (
    <ScrollView>
      {moodList.map((item: MoodOptionWithTimestamp) => (
        <MoodItemRow
          item={item}
          key={item.timestamp}
          deleteItem={handleDeleteMood}
        />
      ))}
    </ScrollView>
  );
};

export default History;
