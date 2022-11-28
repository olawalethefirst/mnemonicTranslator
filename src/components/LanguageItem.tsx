import {TouchableOpacity, View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import constants, {Language} from '../constants';
import palette from '../palette';

const {
  buttonActiveOpacity,
  testIDs: {languageItem},
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
  onPressItem,
  lastItem,
}: {
  content: Language;
  onPressItem: (language: Language) => void;
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
    <View style={[styles2.container]} testID={languageItem.language}>
      <View style={styles2.buttonBorderContainer}>
        <TouchableOpacity
          testID={languageItem.button}
          onPress={() => onPressItem(content)}
          activeOpacity={buttonActiveOpacity}
          style={styles2.button}>
          <Text
            testID={languageItem.text}
            style={[styles.buttonTitle, styles2.buttonTitle]}>
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
