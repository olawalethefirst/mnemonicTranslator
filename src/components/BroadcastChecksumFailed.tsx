import {useContext, useState, useCallback} from 'react';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalText from './ModalText';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

export default function BroadcastChecksumFailed() {
  const {
    mnemonicState: {broadcastChecksumFailedVisible},
    closeBroadcastChecksumFailed,
    openChooseToLanguage,
  } = useContext(MnemonicContext);
  const [openNext, setOpenNext] = useState(false);

  const closeAndEnableOpenNext = useCallback(() => {
    setOpenNext(true);
    closeBroadcastChecksumFailed();
  }, [closeBroadcastChecksumFailed]);
  const onModalHide = useCallback(() => {
    if (openNext) {
      openChooseToLanguage();
    }
  }, [openNext, openChooseToLanguage]);

  return (
    <ModalContainer
      isVisible={broadcastChecksumFailedVisible}
      onModalHide={onModalHide}>
      <ModalTitle title="Checksum verification failed" />
      <ModalText text="Do you want to proceed with translation?" />
      <ModalButton onPress={closeAndEnableOpenNext} title="Yes" submitType />
      <ModalButton onPress={closeBroadcastChecksumFailed} title="No" />
    </ModalContainer>
  );
}
