import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';

const styles = ScaledSheet.create({
  titleContainer: {
    marginTop: '15@mvsr',
    backgroundColor: palette.whiteBackground,
    padding: '13.5@msr',
    borderRadius: '7.5@mvsr',
    minHeight: '120@mvsr',
  },
  title: {
    textAlign: 'center',
    color: palette.green,
    fontSize: '17.5@msr',
    fontFamily: 'Inter Medium',
  },
});

export default function ModalText({text}: {text: string}) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}
