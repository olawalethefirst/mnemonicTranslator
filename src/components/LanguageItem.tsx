import {TouchableOpacity, View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import constants from '../constants';
import palette from '../palette';

const {
  languages,
  toLanguageListTitle,
  fromLanguageListTitle,
  buttonActiveOpacity,
} = constants;

const styles = ScaledSheet.create({
  buttonTitle: {
    textAlign: 'center',
    color: palette.green,
    fontSize: '17.5@msr',
  },
});

export default function LanguageItem({
  content,
  lastItem,
}: {
  content:
    | typeof languages[number]
    | typeof toLanguageListTitle
    | typeof fromLanguageListTitle;
  lastItem?: boolean;
}) {
  const styles2 = ScaledSheet.create({
    container: {
      paddingHorizontal: '13.5@msr',
    },
    buttonBorderContainer: {
      borderBottomColor: palette.green,
      borderBottomWidth: !lastItem ? 1.0 : 0,
    },
    button: {
      paddingVertical: '13.5@msr',
    },
    buttonTitle: {
      fontFamily: 'Inter Medium',
    },
  });

  return (
    <View style={[styles2.container]}>
      <View style={styles2.buttonBorderContainer}>
        <TouchableOpacity
          activeOpacity={buttonActiveOpacity}
          style={styles2.button}>
          <Text style={[styles.buttonTitle, styles2.buttonTitle]}>
            {content}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

LanguageItem.defaultProps = {
  lastItem: false,
};
