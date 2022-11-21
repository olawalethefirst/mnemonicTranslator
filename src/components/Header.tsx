import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import constants from '../constants';

const styles = ScaledSheet.create({
  title: {
    color: palette.white,
    fontSize: '18.5@msr',
    fontFamily: 'Inter Bold',
  },
  container: {
    backgroundColor: palette.green,
    paddingVertical: '15@mvsr',
    paddingHorizontal: `${constants.screenMargin}@msr`,
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {fontFamily: 'Inter ExtraBold'}]}>
        Mnemonic Translator
      </Text>
    </View>
  );
}

export default Header;
