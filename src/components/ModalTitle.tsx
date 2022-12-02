import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import constants from '../constants';

const styles = ScaledSheet.create({
  titleContainer: {
    backgroundColor: palette.whiteBackground,
    padding: '13.5@msr',
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
      <Text testID={constants.testIDs.modalTitle.text} style={styles.title}>
        {title}
      </Text>
    </View>
  );
}
