import {useContext, useState, useCallback} from 'react';
import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import constants, {Language} from '../constants';
import ModalButton from './ModalButton';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

export default function ChooseToLanguage() {
  const {
    mnemonicState: {chooseToLanguageVisible},
    onSelectToLanguage,
    openBroadcastMnemonicPhrase,
    closeChooseToLanguage,
  } = useContext(MnemonicContext);
  const [openNext, setOpenNext] = useState(false);

  const onPressItem = useCallback(
    (language: Language) => {
      setOpenNext(true);
      onSelectToLanguage(language);
    },
    [onSelectToLanguage],
  );
  const onModalHide = useCallback(() => {
    if (openNext) {
      openBroadcastMnemonicPhrase();
      setOpenNext(false);
    }
  }, [openNext, openBroadcastMnemonicPhrase]);

  return (
    <ModalContainer
      isVisible={chooseToLanguageVisible}
      onModalHide={onModalHide}>
      <ModalTitle title={constants.toLanguageListTitle} />
      <LanguageList onPressItem={onPressItem} />
      <ModalButton title="Cancel" onPress={closeChooseToLanguage} />
    </ModalContainer>
  );
}
