import constants, {Language} from '../constants';

const {languages} = constants;

const isLatinoBased = (language: Language) => {
  return (
    language === languages.czech ||
    language === languages.english ||
    language === languages.french ||
    language === languages.italian ||
    language === languages.portuguese ||
    language === languages.spanish ||
    language === languages.swahili
  );
};

export default isLatinoBased;
