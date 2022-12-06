import constants, {Language} from '../constants';
import isLatinoBased from './isLatinoBased';

const {wordlists} = constants;

const parseSuggestions = (language: Language, phrase: string) => {
  if (isLatinoBased(language)) {
    return wordlists[language].filter(word => {
      const wordLetters = word.split('');
      const phraseLetters = phrase.split('');
      let searchFailed = false;
      while (!searchFailed && phraseLetters.length > 0) {
        let i = 0;
        let found = false;
        while (i < wordLetters.length && !found) {
          if (wordLetters[i] === phraseLetters[0]) {
            phraseLetters.splice(0, 1);
            wordLetters.splice(i, 1);
            found = true;
          }
          i += 1;
        }
        if (i >= wordLetters.length && !found) {
          searchFailed = true;
        }
      }
      return !searchFailed;
    });
  }
  return [];
};

export default parseSuggestions;
