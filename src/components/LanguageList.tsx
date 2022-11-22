import {ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import constants from '../constants';
import palette from '../palette';
import LanguageItem from './LanguageItem';

const {languages} = constants;

const styles = ScaledSheet.create({
  container: {
    marginTop: '15@mvsr',
    backgroundColor: palette.whiteBackground,
    borderRadius: '10@mvsr',
    flexGrow: 0,
  },
});

export default function LanguageList() {
  return (
    <ScrollView style={styles.container}>
      {languages.map((language, index) => (
        <LanguageItem
          content={language}
          lastItem={index === languages.length - 1}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </ScrollView>
  );
}
