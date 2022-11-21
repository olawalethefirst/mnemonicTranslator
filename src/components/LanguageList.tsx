import {View, ScrollView, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import constants from '../constants';
import palette from '../palette';
import LanguageItem from './LanguageItem';

const {languages, toLanguageListTitle, fromLanguageListTitle} = constants;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: palette.whiteBackground,
    borderRadius: '10@mvsr',
  },
  titleContainer: {
    backgroundColor: palette.whiteBackground,
    width: '100%',
    aspectRatio: 6,
    justifyContent: 'center',
    marginBottom: '15@mvsr',
    borderRadius: '7.5@mvsr',
  },
  title: {
    textAlign: 'center',
    color: palette.green,
    fontSize: '17.5@msr',
    fontFamily: 'Inter Bold',
  },
});

export default function LanguageList({
  title,
}: {
  title: typeof toLanguageListTitle | typeof fromLanguageListTitle;
}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
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
    </View>
  );
}
