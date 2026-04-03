import { Audio } from 'expo-av';
import { useCallback } from 'react';

const CORRECT_ASSET = require('../assets/sounds/correct.wav');
const WRONG_ASSET = require('../assets/sounds/wrong.wav');

async function playOnce(asset: ReturnType<typeof require>) {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: true });
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch {
    // Silently ignore — audio is non-critical
  }
}

export function useSound() {
  const playCorrect = useCallback(() => playOnce(CORRECT_ASSET), []);
  const playWrong = useCallback(() => playOnce(WRONG_ASSET), []);
  return { playCorrect, playWrong };
}
