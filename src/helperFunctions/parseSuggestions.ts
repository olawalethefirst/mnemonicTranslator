import constants, {Language} from '../constants';
import isLatinoBased from './isLatinoBased';
import sortWithSubstring from './sortWithSubstring';
import sortWithPhraseOrdering from './sortWithPhraseOrdering';

const {wordlists} = constants;

const parseSuggestions = (language: Language, phrase: string) => {
  const returnArray: string[] = [];
  if (isLatinoBased(language)) {
    const suggestions = wordlists[language].filter(word => {
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
    const filteredWithSubstring = sortWithSubstring(suggestions, phrase);
    const orderedMatchesWithSubstring = sortWithPhraseOrdering(
      filteredWithSubstring[0],
      phrase,
    );
    const orderedUnMatchedWithSubstring = sortWithPhraseOrdering(
      filteredWithSubstring[1],
      phrase,
    );

    return returnArray.concat(
      ...orderedMatchesWithSubstring,
      ...orderedUnMatchedWithSubstring,
    );
  }
  return returnArray;
};

export default parseSuggestions;
