/* eslint-disable no-undef, import/no-extraneous-dependencies */

// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
