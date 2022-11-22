import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';
import Header from './src/components/Header';
import Screen from './src/screen';
import palette from './src/palette';
import ChooseFromLanguage from './src/components/ChooseFromLanguage';
import ChooseToLanguage from './src/components/ChooseToLanguage';
import BroadcastToMnemonicPhrase from './src/components/BroadcastToMnemonicPhrase';
import BroadcastChecksumFailed from './src/components/BroadcastChecksumFailed';

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
        <StatusBar barStyle="light-content" backgroundColor={palette.green} />
        <Header />
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={styles.container}>
          <Screen />
          {/* <ChooseToLanguage isVisible /> */}
          <BroadcastToMnemonicPhrase isVisible />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
