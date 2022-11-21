import {useReducer, Reducer, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import constants from '../constants';
import styles from './styles';

// string literals
const INPUT_VALIDATING = 'INPUT_VALIDATING';
const INPUT_EMPTY = 'INPUT_EMPTY';
const INPUT_INVALID = 'INPUT_INVALID';
const INPUT_CHECKSUM_FAILED = 'INPUT_CHECKSUM_FAILED';
const INPUT_VALID = 'INPUT_VALID';
const UPDATE_INPUT_LABEL_HEIGHT = 'UPDATE_INPUT_LABEL_HEIGHT';
const UPDATE_FROM_MNEMONIC_PHRASE = 'UPDATE_FROM_MNEMONIC_PHRASE';

// type definitions
interface UpdateInputLabelAction {
  type: typeof UPDATE_INPUT_LABEL_HEIGHT;
  payload: number;
}
interface UpdateTextInputAction {
  type: typeof UPDATE_FROM_MNEMONIC_PHRASE;
  payload: string;
}
type Action = UpdateInputLabelAction | UpdateTextInputAction;
type InputStatus =
  | typeof INPUT_EMPTY
  | typeof INPUT_INVALID
  | typeof INPUT_CHECKSUM_FAILED
  | typeof INPUT_VALID
  | typeof INPUT_VALIDATING;
interface InitialState {
  inputLabelHeight: number;
  fromLaguage: string;
  toLanguage: string;
  fromMnemonicPhrase: string;
  toMnemonicPhrase: string;
  inputStatus: InputStatus;
}

// reducer ingredients
const initialState = {
  inputLabelHeight: 0,
  fromLaguage: '',
  toLanguage: '',
  fromMnemonicPhrase: '',
  toMnemonicPhrase: '',
  inputStatus: INPUT_EMPTY,
} as const;
const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case UPDATE_INPUT_LABEL_HEIGHT:
      return {...state, inputLabelHeight: action.payload};
    case UPDATE_FROM_MNEMONIC_PHRASE:
      return {...state, fromMnemonicPhrase: action.payload};
    default:
      throw new Error('incorrect action type used');
  }
};

// helperFunctions
const parseInputValidationText = (inputStatus: InputStatus) => {
  switch (inputStatus) {
    case INPUT_VALID:
      return 'Mnemonic phrase valid';
    case INPUT_INVALID:
      return 'Mnemonic phrase invalid';
    case INPUT_CHECKSUM_FAILED:
      return 'Mnemonic phrase failed checksum test';
    default:
      return '';
  }
};
const parseInputValidationTextColor = (inputStatus: InputStatus) => {
  switch (inputStatus) {
    case INPUT_VALID:
      return palette.green;
    case INPUT_INVALID:
      return palette.red;
    case INPUT_CHECKSUM_FAILED:
      return palette.amber;
    default:
      return palette.white;
  }
};

function Screen() {
  const [state, dispatch] = useReducer<Reducer<InitialState, Action>>(
    reducer,
    initialState,
  );
  const inputRef = useRef<TextInput | null>(null);

  // state
  const {inputLabelHeight, fromMnemonicPhrase, inputStatus} = state;
  const disableButton =
    inputStatus === INPUT_VALIDATING ||
    inputStatus === INPUT_EMPTY ||
    inputStatus === INPUT_INVALID;

  // helperFunctions
  const updateInputLabelHeight = (e: LayoutChangeEvent) => {
    dispatch({
      type: UPDATE_INPUT_LABEL_HEIGHT,
      payload: e.nativeEvent.layout.height,
    });
  };
  const focusTextInput = () => {
    inputRef.current?.focus();
  };
  const updateFromMenmonicPhrase = (text: string) => {
    dispatch({
      type: UPDATE_FROM_MNEMONIC_PHRASE,
      payload: text,
    });
  };

  // state dependent styles
  const styles2 = {
    inputLabel: {
      top: -inputLabelHeight / 2,
      opacity: inputLabelHeight === 0 ? 0 : 1,
    },
    button: {
      opacity: disableButton ? constants.buttonActiveOpacity : 1,
    },
    inputValidationText: {
      color: parseInputValidationTextColor(inputStatus),
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Enter your {'\n'}Mnemonic phrase</Text>
      </View>
      <TouchableOpacity
        onPress={focusTextInput}
        activeOpacity={constants.buttonActiveOpacity}
        style={styles.inputContainer}>
        <Text
          onLayout={updateInputLabelHeight}
          style={[styles.inputLabel, styles2.inputLabel]}>
          words separated by spaces
        </Text>
        <TextInput
          value={fromMnemonicPhrase}
          onChangeText={updateFromMenmonicPhrase}
          ref={inputRef}
          multiline
          style={styles.input}
          textAlignVertical="top"
          // onEndEditing={}
          // onSubmitEditing
        />
      </TouchableOpacity>
      <Text style={[styles.inputValidationText, styles2.inputValidationText]}>
        {parseInputValidationText(inputStatus)}
      </Text>
      <TouchableOpacity
        disabled={!disableButton}
        activeOpacity={constants.buttonActiveOpacity}
        style={[styles.button, styles2.button]}>
        {inputStatus === INPUT_VALIDATING ? (
          <ActivityIndicator color={palette.white} />
        ) : (
          <Text style={[styles.buttonTitle]}>Translate</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Screen;
