import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import {screenMargin} from '../constant';

const styles = ScaledSheet.create({
  title: {
    color: palette.white,
    fontSize: '18@msr',
    fontWeight: '700',
  },
  container: {
    backgroundColor: palette.green,
    paddingVertical: '15@mvsr',
    paddingHorizontal: `${screenMargin}@msr`,
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mnemonic Translator</Text>
    </View>
  );
}

export default Header;
