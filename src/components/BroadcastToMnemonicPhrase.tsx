import ModalContainer from './ModalContainer';
import ModalButton from './ModalButton';

export default function BroadcastToMnemonicPhrase({
  isVisible,
}: {
  isVisible: boolean;
}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalButton title="close" submitType={false} />
    </ModalContainer>
  );
}
