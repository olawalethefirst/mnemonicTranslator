import chinese_simplified from './wordlists/chinese_simplified.json';
import chinese_traditional from './wordlists/chinese_traditional.json';
import czech from './wordlists/czech.json';
import english from './wordlists/english.json';
import french from './wordlists/french.json';
import italian from './wordlists/italian.json';
import japanese from './wordlists/japanese.json';
import korean from './wordlists/korean.json';
import portuguese from './wordlists/portuguese.json';
import spanish from './wordlists/spanish.json';
import swahili from './wordlists/swahili.json';

const constants = {
  screenMargin: 25,
  buttonActiveOpacity: 0.65,
  headerHeight: 55,
  languages: {
    chineseSimplified: 'Chinese (Simplified)',
    chineseTraditional: 'Chinese (Traditional)',
    czech: 'Czech',
    english: 'English',
    french: 'French',
    italian: 'Italian',
    japanese: 'Japanese',
    korean: 'Korean',
    portuguese: 'Portuguese',
    spanish: 'Spanish',
    swahili: 'Swahili',
  },
  wordlists: {
    'Chinese (Simplified)': chinese_simplified,
    'Chinese (Traditional)': chinese_traditional,
    Czech: czech,
    English: english,
    French: french,
    Italian: italian,
    Japanese: japanese,
    Korean: korean,
    Portuguese: portuguese,
    Spanish: spanish,
    Swahili: swahili,
  },
  modalTitles: {
    fromLanguageListTitle: 'Choose your language',
    toLanguageListTitle: 'Choose new language',
    checksumFailed: 'Checksum verification failed',
  },
  mnemonicStatus: {
    EMPTY: 'EMPTY',
    VALIDATING: 'VALIDATING',
    INVALID: 'INVALID',
    CHECKSUM_FAILED: 'CHECKSUM_FAILED',
    VALID: 'VALID',
  },
  validationReport: {
    invalid: 'Mnemonic phrase invalid',
    checksumIncorrect: 'Mnemonic phrase failed checksum test',
    valid: 'Mnemonic phrase valid',
    empty: ' ',
  },
  testIDs: {
    screen: {
      input: 'screenInput',
      validationText: 'screenValidationText',
      button: 'screenButton',
    },
    languageItem: {
      language: 'language',
      button: 'languageButton',
      text: 'languageText',
    },

    modal: 'modal',
    modalButton: 'modalButton',
    modalText: 'modalText',
    modalTitle: {
      text: 'modalTitleText',
    },
  },
  accessibilityLabel: {
    screen: {
      input: 'Input mnemonic phrase',
      button: 'translate mnemonic',
    },
  },
} as const;

export default constants;

const languagesList = Object.values(constants.languages);
export type Language = typeof languagesList[number];
