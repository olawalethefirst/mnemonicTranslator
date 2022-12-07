import {useContext} from 'react';
import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import constants from '../constants';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

export default function ChooseFromLanguage() {
  const {
    mnemonicState: {chooseFromLanguageVisibile},
    updateFromMnemonicLanguage,
  } = useContext(MnemonicContext);

  return (
    <ModalContainer isVisible={chooseFromLanguageVisibile}>
      <ModalTitle title={constants.modalTitles.fromLanguageListTitle} />
      <LanguageList onPressItem={updateFromMnemonicLanguage} />
    </ModalContainer>
  );
}
