module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-size-matters|react-native-modal|react-native-animatable)|react-native-safe-area-context/jest/mock/)',
  ],
};
