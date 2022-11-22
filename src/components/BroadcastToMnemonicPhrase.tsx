import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalText from './ModalText';
import constants from '../constants';

const {languages} = constants;

export default function BroadcastToMnemonicPhrase({
  isVisible,
  toMnemonicLanguage = 'French',
  toMnemonicPhrase = 'abandon ability able about above absent absorb abstract absurd abuse access accident account',
}: {
  isVisible: boolean;
  toMnemonicPhrase: string;
  toMnemonicLanguage: typeof languages[number];
}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalTitle title={toMnemonicLanguage} />
      <ModalText text={toMnemonicPhrase} />
      <ModalButton title="close" />
    </ModalContainer>
  );
}
