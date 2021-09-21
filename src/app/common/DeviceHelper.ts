import {Dimensions, Platform} from 'react-native';
import {hasNotch as diHasNotch} from 'react-native-device-info';

export function screenWidth(): number {
  return Dimensions.get('window').width;
}

export function screenHeight(): number {
  return Dimensions.get('window').height;
}

export function hasNotch(): boolean {
  if (Platform.OS === 'ios') {
    return diHasNotch();
  }
  return false;
}
