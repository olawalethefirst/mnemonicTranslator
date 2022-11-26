import {useContext} from 'react';
import {ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import constants, {Language} from '../constants';
import palette from '../palette';
import LanguageItem from './LanguageItem';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

const {languages} = constants;

const styles = ScaledSheet.create({
  container: {
    marginTop: '15@mvsr',
    backgroundColor: palette.whiteBackground,
    borderRadius: '10@mvsr',
    flexGrow: 0,
  },
});

export default function LanguageList({
  onPressItem,
  toLanguages,
}: {
  onPressItem: (language: Language) => void;
  toLanguages?: boolean;
}) {
  const {
    mnemonicState: {fromLanguage},
  } = useContext(MnemonicContext);
  const languagesExcludingFromLanguage = languages.filter(
    val => val !== fromLanguage,
  );

  return (
    <ScrollView style={styles.container}>
      {(toLanguages ? languagesExcludingFromLanguage : languages).map(
        (language, index) => (
          <LanguageItem
            content={language}
            onPressItem={onPressItem}
            lastItem={index === languages.length - 1}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ),
      )}
    </ScrollView>
  );
}

LanguageList.defaultProps = {
  toLanguages: false,
};
