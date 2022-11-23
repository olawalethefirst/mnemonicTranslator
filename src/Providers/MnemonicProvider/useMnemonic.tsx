import {useReducer, Reducer} from 'react';
import constants, {Language} from '../../constants';
import validateMnemonic from '../../helperFunctions/validateMnemonic';

const {mnemonicStatus, wordlists} = constants;
const mnemonicStatusList = Object.values(mnemonicStatus);

// const testLanguage = constants.languages[9];
// console.log(
//   'test',
//   validateMnemonic(
//     constants.wordlists[testLanguage]
//       .slice(2000, 2009)
//       .concat(constants.wordlists[testLanguage].slice(0, 9))
//       .concat()
//       .join(`\n     \n    \n `),
//     testLanguage,
//   ),
// );
// console.log(
//   'test',
//   validateMnemonic(
//     constants.wordlists[testLanguage]
//       .slice(2000, 2009)
//       .concat(constants.wordlists[testLanguage].slice(0, 17))
//       .concat()
//       .join(`\n     \n    \n `),
//     testLanguage,
//   ),
// );
// console.log(
//   'test',
//   validateMnemonic(
//     constants.wordlists[testLanguage]
//       .slice(2000, 2009)
//       .concat(constants.wordlists[testLanguage].slice(0, 10))
//       .concat()
//       .join(`\n     \n    \n `),
//     testLanguage,
//   ),
// );

// actions
const UPDATE_FROM_MNEMONIC = 'UPDATE_FROM_MNEMONIC';
const UPDATE_FROM_LANGUAGE = 'UPDATE_FROM_LANGUAGE';
const ACTIVATE_VALIDATING_INPUT = 'ACTIVATE_VALIDATING_INPUT';
const ACTIVATE_MNEMONIC_INVALID = 'ACTIVATE_MNEMONIC_INVALID';
const ACTIVATE_CHECKSUM_FAILED = 'ACTIVATE_CHECKSUM_FAILED';
const ACTIVATE_MNEMONIC_VALID = 'ACTIVATE_MNEMONIC_VALID';
const TRANSLATE_BUTTON_PRESSED = 'TRANSLATE_BUTTON_PRESSED';
const OPEN_CHOOSE_TO_LANGUAGE = 'OPEN_CHOOSE_TO_LANGUAGE';
const CLOSE_CHOOSE_TO_LANGUAGE = 'CLOSE_CHOOSE_TO_LANGUAGE';
const CLOSE_BROADCAST_CHECKSUM_FAILED = 'CLOSE_BROADCAST_CHECKSUM_FAILED';
const TRANSLATE_MNEMONIC = 'TRANSLATE_MNEMONIC';
const OPEN_BROADCAST_MNEMONIC_PHRASE = 'OPEN_BROADCAST_MNEMONIC_PHRASE';
const CLOSE_BROADCAST_MNEMONIC_PHRASE = 'CLOSE_BROADCAST_MNEMONIC_PHRASE';

// type definitions
interface UpdateTextInput {
  type: typeof UPDATE_FROM_MNEMONIC;
  payload: string;
}
interface UpdateFromLanguage {
  type: typeof UPDATE_FROM_LANGUAGE;
  payload: Language;
}
interface ActivateValidatingInput {
  type: typeof ACTIVATE_VALIDATING_INPUT;
}
interface ActivateMnemonicInvalid {
  type: typeof ACTIVATE_MNEMONIC_INVALID;
}
interface ActivateChecksumFailed {
  type: typeof ACTIVATE_CHECKSUM_FAILED;
  payload: number[];
}
interface ActivateMnemonicValid {
  type: typeof ACTIVATE_MNEMONIC_VALID;
  payload: number[];
}
interface TranslateButtonPressed {
  type: typeof TRANSLATE_BUTTON_PRESSED;
}
interface OpenChooseToLanguage {
  type: typeof OPEN_CHOOSE_TO_LANGUAGE;
}
interface CloseChooseToLanguage {
  type: typeof CLOSE_CHOOSE_TO_LANGUAGE;
}
interface TranslateMnemonic {
  type: typeof TRANSLATE_MNEMONIC;
  payload: Language;
}
interface CloseBroadcastChecksumFailed {
  type: typeof CLOSE_BROADCAST_CHECKSUM_FAILED;
}
interface OpenBroadcastMnemonicPhrase {
  type: typeof OPEN_BROADCAST_MNEMONIC_PHRASE;
}
interface CloseBroadcastMnemonicPhrase {
  type: typeof CLOSE_BROADCAST_MNEMONIC_PHRASE;
}
type Action =
  | UpdateFromLanguage
  | UpdateTextInput
  | ActivateValidatingInput
  | ActivateMnemonicInvalid
  | ActivateChecksumFailed
  | ActivateMnemonicValid
  | TranslateMnemonic
  | TranslateButtonPressed
  | OpenChooseToLanguage
  | CloseChooseToLanguage
  | CloseBroadcastChecksumFailed
  | OpenBroadcastMnemonicPhrase
  | CloseBroadcastMnemonicPhrase;
export type InputStatus = typeof mnemonicStatusList[number];
export interface InitialMnemonicState {
  fromLanguage: Language | undefined;
  toLanguage: Language | undefined;
  fromMnemonicPhrase: string;
  toMnemonicPhrase: string;
  mnemonicWordlistIndexes: number[];
  inputStatus: InputStatus;
  overrideChecksumWarning: boolean;
  chooseToLanguageVisible: boolean;
  chooseFromLanguageVisibile: boolean;
  broadcastMnemonicVisible: boolean;
  broadcastChecksumFailedVisible: boolean;
}

// useReducer ingredients
export const initialMnemonicState = {
  fromLanguage: undefined as Language | undefined,
  toLanguage: undefined as Language | undefined,
  fromMnemonicPhrase: '',
  toMnemonicPhrase: '',
  mnemonicWordlistIndexes: [] as number[],
  inputStatus: mnemonicStatus.EMPTY as InputStatus,
  overrideChecksumWarning: false,
  chooseToLanguageVisible: false,
  chooseFromLanguageVisibile: true,
  broadcastMnemonicVisible: false,
  broadcastChecksumFailedVisible: false,
};
export const useMnemonicInitialReturn = {
  mnemonicState: initialMnemonicState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFromMenmonicPhrase: (text: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFromMnemonicLanguage: (language: Language) => {},
  validateFromMnemonice: () => {},
  onTranslatePress: () => {},
  closeBroadcastChecksumFailed: () => {},
  openChooseToLanguage: () => {},
  closeChooseToLanguage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectToLanguage: (language: Language) => {},
  openBroadcastMnemonicPhrase: () => {},
  closeBroadcastMnemonicPhrase: () => {},
};
const reducer = (
  state: InitialMnemonicState,
  action: Action,
): InitialMnemonicState => {
  switch (action.type) {
    case UPDATE_FROM_LANGUAGE:
      return {
        ...state,
        chooseFromLanguageVisibile: false,
        fromLanguage: action.payload,
      };
    case UPDATE_FROM_MNEMONIC:
      return {
        ...state,
        fromMnemonicPhrase: action.payload,
        inputStatus: mnemonicStatus.EMPTY,
        mnemonicWordlistIndexes: [],
        overrideChecksumWarning: false,
      };
    case ACTIVATE_VALIDATING_INPUT:
      return {...state, inputStatus: mnemonicStatus.VALIDATING};
    case ACTIVATE_MNEMONIC_INVALID:
      return {...state, inputStatus: mnemonicStatus.INVALID};
    case ACTIVATE_CHECKSUM_FAILED:
      return {
        ...state,
        inputStatus: mnemonicStatus.CHECKSUM_FAILED,
        mnemonicWordlistIndexes: action.payload,
      };
    case ACTIVATE_MNEMONIC_VALID:
      return {
        ...state,
        inputStatus: mnemonicStatus.VALID,
        mnemonicWordlistIndexes: action.payload,
      };
    case TRANSLATE_BUTTON_PRESSED: {
      let changedState;
      if (
        state.inputStatus === mnemonicStatus.CHECKSUM_FAILED &&
        !state.overrideChecksumWarning
      ) {
        changedState = {broadcastChecksumFailedVisible: true};
      } else {
        changedState = {chooseToLanguageVisible: true};
      }

      return {...state, ...changedState};
    }
    case CLOSE_BROADCAST_CHECKSUM_FAILED:
      return {...state, broadcastChecksumFailedVisible: false};
    case OPEN_CHOOSE_TO_LANGUAGE:
      return {
        ...state,
        chooseToLanguageVisible: true,
        overrideChecksumWarning: true,
      };
    case CLOSE_CHOOSE_TO_LANGUAGE:
      return {...state, chooseToLanguageVisible: false};
    case TRANSLATE_MNEMONIC:
      return {
        ...state,
        toLanguage: action.payload,
        toMnemonicPhrase: state.mnemonicWordlistIndexes
          .map(index => wordlists[action.payload][index])
          .join(' '),
        chooseToLanguageVisible: false,
      };
    case OPEN_BROADCAST_MNEMONIC_PHRASE:
      return {
        ...state,
        broadcastMnemonicVisible: true,
      };
    case CLOSE_BROADCAST_MNEMONIC_PHRASE:
      return {
        ...state,
        broadcastMnemonicVisible: false,
      };
    default:
      throw new Error('incorrect action type used');
  }
};

export default function useMnemonic() {
  const [mnemonicState, dispatch] = useReducer<
    Reducer<InitialMnemonicState, Action>
  >(reducer, initialMnemonicState);

  // console.log(mnemonicState);
  const {fromLanguage, fromMnemonicPhrase} = mnemonicState;

  const updateFromMnemonicLanguage = (language: Language) => {
    dispatch({
      type: UPDATE_FROM_LANGUAGE,
      payload: language,
    });
  };
  const updateFromMenmonicPhrase = (text: string) => {
    dispatch({
      type: UPDATE_FROM_MNEMONIC,
      payload: text,
    });
  };
  const validateFromMnemonice = () => {
    if (fromLanguage) {
      dispatch({
        type: ACTIVATE_VALIDATING_INPUT,
      });
      const result = validateMnemonic(
        fromMnemonicPhrase.trim().toLowerCase(),
        fromLanguage,
      );
      if (result === mnemonicStatus.INVALID) {
        dispatch({
          type: ACTIVATE_MNEMONIC_INVALID,
        });
      } else if (result[0] === mnemonicStatus.CHECKSUM_FAILED) {
        dispatch({
          type: ACTIVATE_CHECKSUM_FAILED,
          payload: result[1],
        });
      } else {
        dispatch({
          type: ACTIVATE_MNEMONIC_VALID,
          payload: result[1],
        });
      }
    }
  };
  const onTranslatePress = () => {
    dispatch({
      type: TRANSLATE_BUTTON_PRESSED,
    });
  };
  const closeBroadcastChecksumFailed = () => {
    dispatch({
      type: 'CLOSE_BROADCAST_CHECKSUM_FAILED',
    });
  };
  const openChooseToLanguage = () => {
    dispatch({
      type: OPEN_CHOOSE_TO_LANGUAGE,
    });
  };
  const closeChooseToLanguage = () => {
    dispatch({
      type: CLOSE_CHOOSE_TO_LANGUAGE,
    });
  };
  const onSelectToLanguage = (language: Language) => {
    dispatch({
      type: TRANSLATE_MNEMONIC,
      payload: language,
    });
  };
  const openBroadcastMnemonicPhrase = () => {
    dispatch({
      type: OPEN_BROADCAST_MNEMONIC_PHRASE,
    });
  };
  const closeBroadcastMnemonicPhrase = () => {
    dispatch({
      type: CLOSE_BROADCAST_MNEMONIC_PHRASE,
    });
  };

  return {
    mnemonicState,
    updateFromMenmonicPhrase,
    updateFromMnemonicLanguage,
    validateFromMnemonice,
    onTranslatePress,
    closeBroadcastChecksumFailed,
    openChooseToLanguage,
    closeChooseToLanguage,
    onSelectToLanguage,
    openBroadcastMnemonicPhrase,
    closeBroadcastMnemonicPhrase,
  };
}
