import {useContext} from 'react';
import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import constants from '../constants';
import ModalButton from './ModalButton';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

export default function ChooseToLanguage() {
  const {
    mnemonicState: {chooseToLanguageVisible},
    onChooseToLanguage,
    closeChooseToLanguage,
    onChooseToLanguageHide,
  } = useContext(MnemonicContext);

  return (
    <ModalContainer
      isVisible={chooseToLanguageVisible}
      onModalHide={onChooseToLanguageHide}>
      <ModalTitle title={constants.toLanguageListTitle} />
      <LanguageList onPressItem={onChooseToLanguage} />
      <ModalButton title="Cancel" onPress={closeChooseToLanguage} />
    </ModalContainer>
  );
}
