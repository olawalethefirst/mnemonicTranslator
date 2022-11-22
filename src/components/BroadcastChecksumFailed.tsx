import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalText from './ModalText';

export default function BroadcastChecksumFailed({
  isVisible,
}: {
  isVisible: boolean;
}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalTitle title="Checksum verification failed" />
      <ModalText text="Do you want to proceed with translation?" />
      <ModalButton title="Yes" submitType />
      <ModalButton title="No" />
    </ModalContainer>
  );
}
