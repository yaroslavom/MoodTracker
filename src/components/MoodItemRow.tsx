import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import format from 'date-fns/format';
import { theme } from '../context/theme';
import { MoodOptionWithTimestamp } from '../types';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
  deleteItem: (item: MoodOptionWithTimestamp) => void;
};

const maxSwipe = 80;

const MoodItemRow: React.FC<MoodItemRowProps> = ({ item, deleteItem }) => {
  const translateX = useSharedValue(0);

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      deleteItem(item);
    }, 250);
  }, [deleteItem, item]);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > maxSwipe) {
        translateX.value = withTiming(1000 * Math.sign(event.translationX));
        runOnJS(removeWithDelay)();
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.moodItem, animatedStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <Pressable hitSlop={16} onPress={() => deleteItem(item)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default MoodItemRow;

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 20,
    lineHeight: 30,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    lineHeight: 28,
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyRegular,
  },
});
