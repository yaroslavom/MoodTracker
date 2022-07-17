import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import type { RootState } from '../context/store';
import { addMood } from '../context/moodOptionSlice';
import { theme } from '../context/theme';
import { useAppSelector, useAppDispatch } from '../hooks';
import { MoodOptionType } from '../types';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const imageSrc = require('../../assets/cloudy-cloud.png');

const MoodPicker: React.FC = () => {
  const moodOptions = useAppSelector((state: RootState) => state.moodOption);
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  const { width } = useWindowDimensions();

  let imageSize = 200;

  if (width < 380) {
    imageSize = 150;
  }

  const dispatch = useAppDispatch();

  const handleSelectMood = React.useCallback(
    (mood: MoodOptionType) => {
      dispatch(addMood({ mood, timestamp: Date.now() }));
    },
    [dispatch],
  );

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <View style={[styles.imageWrapper, imageStyle]}>
          <Image style={styles.image} source={imageSrc} />
        </View>
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

export default MoodPicker;

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: 22,
    lineHeight: 34,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 14,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  imageWrapper: {
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
