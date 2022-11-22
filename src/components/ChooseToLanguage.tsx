import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import constants from '../constants';
import ModalButton from './ModalButton';

export default function ChooseToLanguage({isVisible}: {isVisible: boolean}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalTitle title={constants.toLanguageListTitle} />
      <LanguageList />
      <ModalButton title="Cancel" />
    </ModalContainer>
  );
}
