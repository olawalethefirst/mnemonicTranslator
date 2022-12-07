import {useReducer, Reducer} from 'react';
import constants, {Language} from '../../constants';
import validateMnemonic from '../../helperFunctions/validateMnemonic';
import parseSuggestions from '../../helperFunctions/parseSuggestions';

const {mnemonicStatus, wordlists} = constants;
const mnemonicStatusList = Object.values(mnemonicStatus);

// modal names
const CHOOSE_TO_LANGUAGE = 'CHOOSE_TO_LANGUAGE';
const CHOOSE_FROM_LANGUAGE = 'CHOOSE_FROM_LANGUAGE';
const BROADCAST_CHECKSUM_FAILED = 'BROADCAST_CHECKSUM_FAILED';
const BROADCAST_TO_MNEMONIC = 'BROADCAST_TO_MNEMONIC';

// actions
const UPDATE_FROM_LANGUAGE = 'UPDATE_FROM_LANGUAGE';
const UPDATE_FROM_MNEMONIC = 'UPDATE_FROM_MNEMONIC';
const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const CHOOSE_SUGGESTION = 'CHOOSE_SUGGESTION';
const ACTIVATE_VALIDATING_INPUT = 'ACTIVATE_VALIDATING_INPUT';
const ACTIVATE_MNEMONIC_EMPTY = 'ACTIVATE_MNEMONIC_EMPTY';
const ACTIVATE_MNEMONIC_INVALID = 'ACTIVATE_MNEMONIC_INVALID';
const ACTIVATE_CHECKSUM_FAILED = 'ACTIVATE_CHECKSUM_FAILED';
const ACTIVATE_MNEMONIC_VALID = 'ACTIVATE_MNEMONIC_VALID';
const TRANSLATE_BUTTON_PRESSED = 'TRANSLATE_BUTTON_PRESSED';
const OVERRIDE_CHECKSUM_FAILED = 'OVERRIDE_CHECKSUM_FAILED';
const CLOSE_BROADCAST_CHECKSUM_FAILED = 'CLOSE_BROADCAST_CHECKSUM_FAILED';
const BROADCAST_CHECKSUM_FAILED_CLOSED = 'BROADCAST_CHECKSUM_FAILED_CLOSED';
const CLOSE_CHOOSE_TO_LANGUAGE = 'CLOSE_CHOOSE_TO_LANGUAGE';
const CHOOSE_TO_LANGUAGE_CLOSED = 'CHOOSE_TO_LANGUAGE_CLOSED';
const UPDATE_TO_LANGUAGE = 'UPDATE_TO_LANGUAGE';
const CLOSE_BROADCAST_MNEMONIC_PHRASE = 'CLOSE_BROADCAST_MNEMONIC_PHRASE';

// type definitions
type ModalType =
  | typeof CHOOSE_TO_LANGUAGE
  | typeof CHOOSE_FROM_LANGUAGE
  | typeof BROADCAST_CHECKSUM_FAILED
  | typeof BROADCAST_TO_MNEMONIC;
interface UpdateFromLanguage {
  type: typeof UPDATE_FROM_LANGUAGE;
  payload: Language;
}
interface UpdateFromMnemonic {
  type: typeof UPDATE_FROM_MNEMONIC;
  payload: string;
}
interface UpdateSuggestions {
  type: typeof UPDATE_SUGGESTIONS;
  payload: string[];
}
interface ClearSuggestions {
  type: typeof CLEAR_SUGGESTIONS;
}
interface ChooseSuggestion {
  type: typeof CHOOSE_SUGGESTION;
  payload: string;
}
interface ActivateValidatingInput {
  type: typeof ACTIVATE_VALIDATING_INPUT;
}
interface ActivateMnemonicEmpty {
  type: typeof ACTIVATE_MNEMONIC_EMPTY;
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
interface OverrideChecksumFailed {
  type: typeof OVERRIDE_CHECKSUM_FAILED;
}
interface CloseBroadcastChecksumFailed {
  type: typeof CLOSE_BROADCAST_CHECKSUM_FAILED;
}
interface BroadcastCheckumFailedClosed {
  type: typeof BROADCAST_CHECKSUM_FAILED_CLOSED;
}
interface UpdateToLanguage {
  type: typeof UPDATE_TO_LANGUAGE;
  payload: Language;
}
interface CloseChooseToLanguage {
  type: typeof CLOSE_CHOOSE_TO_LANGUAGE;
}
interface ChooseToLanguageClosed {
  type: typeof CHOOSE_TO_LANGUAGE_CLOSED;
}
interface CloseBroadcastMnemonicPhrase {
  type: typeof CLOSE_BROADCAST_MNEMONIC_PHRASE;
}
type Action =
  | UpdateFromLanguage
  | UpdateFromMnemonic
  | UpdateSuggestions
  | ClearSuggestions
  | ChooseSuggestion
  | ActivateValidatingInput
  | ActivateMnemonicEmpty
  | ActivateMnemonicInvalid
  | ActivateChecksumFailed
  | ActivateMnemonicValid
  | TranslateButtonPressed
  | OverrideChecksumFailed
  | CloseBroadcastChecksumFailed
  | BroadcastCheckumFailedClosed
  | UpdateToLanguage
  | CloseChooseToLanguage
  | ChooseToLanguageClosed
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
  broadcastToMnemonicVisible: boolean;
  broadcastChecksumFailedVisible: boolean;
  modalOpenPending: ModalType[];
  inputSuggestions: string[];
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
  broadcastToMnemonicVisible: false,
  broadcastChecksumFailedVisible: false,
  modalOpenPending: [] as ModalType[],
  inputSuggestions: [] as string[],
};
export const useMnemonicInitialReturn = {
  mnemonicState: initialMnemonicState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFromMenmonicPhrase: (text: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFromMnemonicLanguage: (language: Language) => {},
  clearSuggestions: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chooseSuggestion: (text: string) => {},
  validateFromMnemonice: () => {},
  onTranslatePress: () => {},
  overrideChecksumFailed: () => {},
  closeBroadcastChecksumFailed: () => {},
  onBroadcastChecksumFailedHide: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChooseToLanguage: (language: Language) => {},
  closeChooseToLanguage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChooseToLanguageHide: () => {},
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
        inputSuggestions: [],
      };
    case UPDATE_SUGGESTIONS:
      return {...state, inputSuggestions: action.payload};
    case CLEAR_SUGGESTIONS:
      return {...state, inputSuggestions: []};
    case CHOOSE_SUGGESTION: {
      const mnemonicWord = state.fromMnemonicPhrase.split(/\s+/);
      const lastWordLength = mnemonicWord[mnemonicWord.length - 1].length;

      return {
        ...state,
        fromMnemonicPhrase: state.fromMnemonicPhrase
          .slice(0, -lastWordLength)
          .concat(`${action.payload} `),
        inputSuggestions: [],
      };
    }
    case ACTIVATE_VALIDATING_INPUT:
      return {
        ...state,
        inputStatus: mnemonicStatus.VALIDATING,
        inputSuggestions: [],
      };
    case ACTIVATE_MNEMONIC_INVALID:
      return {
        ...state,
        inputStatus: mnemonicStatus.INVALID,
      };
    case ACTIVATE_MNEMONIC_EMPTY:
      return {
        ...state,
        inputStatus: mnemonicStatus.EMPTY,
      };
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
    case OVERRIDE_CHECKSUM_FAILED:
      return {
        ...state,
        broadcastChecksumFailedVisible: false,
        overrideChecksumWarning: true,
        modalOpenPending: [...state.modalOpenPending, CHOOSE_TO_LANGUAGE],
      };
    case CLOSE_BROADCAST_CHECKSUM_FAILED:
      return {...state, broadcastChecksumFailedVisible: false};
    case BROADCAST_CHECKSUM_FAILED_CLOSED: {
      let changedState = {};
      if (state.modalOpenPending[0] === CHOOSE_TO_LANGUAGE) {
        changedState = {
          chooseToLanguageVisible: true,
          modalOpenPending: state.modalOpenPending.slice(1),
        };
      }
      return {...state, ...changedState};
    }
    case UPDATE_TO_LANGUAGE:
      return {
        ...state,
        toLanguage: action.payload,
        toMnemonicPhrase: state.mnemonicWordlistIndexes
          .map(index => wordlists[action.payload][index])
          .join(' '),
        chooseToLanguageVisible: false,
        modalOpenPending: [...state.modalOpenPending, BROADCAST_TO_MNEMONIC],
      };
    case CLOSE_CHOOSE_TO_LANGUAGE:
      return {...state, chooseToLanguageVisible: false};
    case CHOOSE_TO_LANGUAGE_CLOSED: {
      let changedState = {};
      if (state.modalOpenPending[0] === BROADCAST_TO_MNEMONIC) {
        changedState = {
          broadcastToMnemonicVisible: true,
          modalOpenPending: state.modalOpenPending.slice(1),
        };
      }
      return {...state, ...changedState};
    }
    case CLOSE_BROADCAST_MNEMONIC_PHRASE:
      return {
        ...state,
        broadcastToMnemonicVisible: false,
      };
    default:
      throw new Error('incorrect action type used');
  }
};

export default function useMnemonic() {
  const [mnemonicState, dispatch] = useReducer<
    Reducer<InitialMnemonicState, Action>
  >(reducer, initialMnemonicState);

  const {fromLanguage, fromMnemonicPhrase} = mnemonicState;

  const updateFromMnemonicLanguage = (language: Language) => {
    dispatch({
      type: UPDATE_FROM_LANGUAGE,
      payload: language,
    });
  };
  const generateUpdateSuggestion = () => {
    let suggestionTimer: number;

    return (text: string) => {
      if (fromLanguage) {
        clearTimeout(suggestionTimer);

        if (!/\s+/.exec(text[text.length - 1])) {
          const words = text.split(/\s+/);
          const lastWord = words[words.length - 1];
          if (lastWord.length >= 3) {
            suggestionTimer = setTimeout(() => {
              dispatch({
                type: UPDATE_SUGGESTIONS,
                payload: parseSuggestions(fromLanguage, lastWord),
              });
            }, 300);
          }
        }
      }
    };
  };
  const updateSuggestions = generateUpdateSuggestion();

  const clearSuggestions = () => {
    dispatch({type: CLEAR_SUGGESTIONS});
  };
  const chooseSuggestion = (suggestion: string) => {
    dispatch({
      type: CHOOSE_SUGGESTION,
      payload: suggestion,
    });
  };
  const updateFromMenmonicPhrase = (text: string) => {
    updateSuggestions(text);
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
      } else if (result === mnemonicStatus.EMPTY) {
        dispatch({
          type: ACTIVATE_MNEMONIC_EMPTY,
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
  const overrideChecksumFailed = () => {
    dispatch({
      type: OVERRIDE_CHECKSUM_FAILED,
    });
  };
  const closeBroadcastChecksumFailed = () => {
    dispatch({
      type: 'CLOSE_BROADCAST_CHECKSUM_FAILED',
    });
  };
  const onBroadcastChecksumFailedHide = () => {
    dispatch({
      type: BROADCAST_CHECKSUM_FAILED_CLOSED,
    });
  };
  const onChooseToLanguage = (language: Language) => {
    dispatch({
      type: UPDATE_TO_LANGUAGE,
      payload: language,
    });
  };
  const closeChooseToLanguage = () => {
    dispatch({
      type: CLOSE_CHOOSE_TO_LANGUAGE,
    });
  };
  const onChooseToLanguageHide = () => {
    dispatch({
      type: CHOOSE_TO_LANGUAGE_CLOSED,
    });
  };
  const closeBroadcastMnemonicPhrase = () => {
    dispatch({
      type: CLOSE_BROADCAST_MNEMONIC_PHRASE,
    });
  };

  return {
    mnemonicState,
    updateFromMnemonicLanguage,
    updateFromMenmonicPhrase,
    clearSuggestions,
    chooseSuggestion,
    validateFromMnemonice,
    onTranslatePress,
    overrideChecksumFailed,
    closeBroadcastChecksumFailed,
    onBroadcastChecksumFailedHide,
    onChooseToLanguage,
    closeChooseToLanguage,
    onChooseToLanguageHide,
    closeBroadcastMnemonicPhrase,
  };
}
