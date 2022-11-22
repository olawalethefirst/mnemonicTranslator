import {TouchableOpacity, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import constants from '../constants';

const styles = ScaledSheet.create({
  button: {
    marginTop: '15@mvsr',
    width: '100%',
    aspectRatio: 6,
    justifyContent: 'center',
    backgroundColor: palette.whiteBackground,
    borderRadius: '7.5@mvsr',
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: '17.5@msr',
    fontFamily: 'Inter Medium',
  },
});

export default function ModalButton({
  title,
  submitType,
}: {
  title: string;
  submitType?: boolean;
}) {
  const styles2 = {
    buttonTitle: {color: submitType ? palette.green : palette.red},
  };

  return (
    <TouchableOpacity
      activeOpacity={constants.buttonActiveOpacity}
      style={styles.button}>
      <Text style={[styles.buttonTitle, styles2.buttonTitle]}>{title}</Text>
    </TouchableOpacity>
  );
}

ModalButton.defaultProps = {
  submitType: false,
};
