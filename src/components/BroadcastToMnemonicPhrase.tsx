import {useContext} from 'react';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalText from './ModalText';
import {Language} from '../constants';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

export default function BroadcastToMnemonicPhrase() {
  const {
    mnemonicState: {broadcastToMnemonicVisible, toLanguage, toMnemonicPhrase},
    closeBroadcastMnemonicPhrase,
  } = useContext(MnemonicContext);

  return (
    <ModalContainer isVisible={broadcastToMnemonicVisible}>
      <ModalTitle title={toLanguage as Language} />
      <ModalText text={toMnemonicPhrase} />
      <ModalButton onPress={closeBroadcastMnemonicPhrase} title="close" />
    </ModalContainer>
  );
}
