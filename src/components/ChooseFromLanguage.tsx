import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import constants from '../constants';

export default function ChooseFromLanguage({isVisible}: {isVisible: boolean}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <LanguageList title={constants.fromLanguageListTitle} />
    </ModalContainer>
  );
}
