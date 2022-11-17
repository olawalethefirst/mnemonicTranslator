import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import Header from './src/components/Header';
import Screen from './src/screens';
import palette from './src/palette';

const styles = StyleSheet.create({
  containerWithHeader: {
    backgroundColor: palette.green,
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.containerWithHeader}>
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={palette.green} />
          <Header />
          <Screen />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
