import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import constants from '../constants';
import ModalButton from './ModalButton';

const styles = ScaledSheet.create({
  container: {flex: 1},
});

export default function ChooseToLanguage({isVisible}: {isVisible: boolean}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <View style={styles.container}>
        <LanguageList title={constants.toLanguageListTitle} />
        <ModalButton title="Cancel" submitType={false} />
      </View>
    </ModalContainer>
  );
}
