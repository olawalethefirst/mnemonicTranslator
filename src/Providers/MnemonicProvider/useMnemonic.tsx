import {useReducer, Reducer} from 'react';

// string literals
export const INPUT_VALIDATING = 'INPUT_VALIDATING';
export const INPUT_EMPTY = 'INPUT_EMPTY';
export const INPUT_INVALID = 'INPUT_INVALID';
export const INPUT_CHECKSUM_FAILED = 'INPUT_CHECKSUM_FAILED';
export const INPUT_VALID = 'INPUT_VALID';
export const UPDATE_INPUT_LABEL_HEIGHT = 'UPDATE_INPUT_LABEL_HEIGHT';
export const UPDATE_FROM_MNEMONIC_PHRASE = 'UPDATE_FROM_MNEMONIC_PHRASE';

// type definitions
export interface UpdateInputLabelAction {
  type: typeof UPDATE_INPUT_LABEL_HEIGHT;
  payload: number;
}
export interface UpdateTextInputAction {
  type: typeof UPDATE_FROM_MNEMONIC_PHRASE;
  payload: string;
}
export type Action = UpdateInputLabelAction | UpdateTextInputAction;
export type InputStatus =
  | typeof INPUT_EMPTY
  | typeof INPUT_INVALID
  | typeof INPUT_CHECKSUM_FAILED
  | typeof INPUT_VALID
  | typeof INPUT_VALIDATING;
export interface InitialMnemonicState {
  inputLabelHeight: number;
  fromLaguage: string;
  toLanguage: string;
  fromMnemonicPhrase: string;
  toMnemonicPhrase: string;
  inputStatus: InputStatus;
}

// useReducer ingredients
export const initialMnemonicState = {
  fromLaguage: '',
  toLanguage: '',
  fromMnemonicPhrase: '',
  toMnemonicPhrase: '',
  inputStatus: INPUT_EMPTY,
} as InitialMnemonicState;
export const useMnemonicInitialValue = {
  mnemonicState: initialMnemonicState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateFromMenmonicPhrase: (text: string) => {},
};
const reducer = (state: InitialMnemonicState, action: Action) => {
  switch (action.type) {
    case UPDATE_INPUT_LABEL_HEIGHT:
      return {...state, inputLabelHeight: action.payload};
    case UPDATE_FROM_MNEMONIC_PHRASE:
      return {...state, fromMnemonicPhrase: action.payload};
    default:
      throw new Error('incorrect action type used');
  }
};

export default function useMnemonic() {
  const [mnemonicState, dispatch] = useReducer<
    Reducer<InitialMnemonicState, Action>
  >(reducer, initialMnemonicState);

  const updateFromMenmonicPhrase = (text: string) => {
    dispatch({
      type: UPDATE_FROM_MNEMONIC_PHRASE,
      payload: text,
    });
  };

  return {mnemonicState, updateFromMenmonicPhrase};
}
