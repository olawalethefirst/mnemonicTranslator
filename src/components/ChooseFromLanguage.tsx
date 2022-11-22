import LanguageList from './LanguageList';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import constants from '../constants';

export default function ChooseFromLanguage({isVisible}: {isVisible: boolean}) {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalTitle title={constants.fromLanguageListTitle} />
      <LanguageList />
    </ModalContainer>
  );
}
