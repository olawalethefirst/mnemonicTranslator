import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';

const styles = ScaledSheet.create({
  titleContainer: {
    backgroundColor: palette.whiteBackground,
    width: '100%',
    aspectRatio: 6,
    justifyContent: 'center',
    borderRadius: '7.5@mvsr',
  },
  title: {
    textAlign: 'center',
    color: palette.green,
    fontSize: '17.5@msr',
    fontFamily: 'Inter Bold',
  },
});

export default function ModalTitle({title}: {title: string}) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}