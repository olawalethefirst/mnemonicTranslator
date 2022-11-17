import {ScrollView, StyleSheet} from 'react-native';
import palette from '../palette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.whiteBackground,
  },
});

function Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Header /> */}
    </ScrollView>
  );
}

export default Screen;
