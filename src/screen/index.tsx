import {useState, useRef, useContext} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  ActivityIndicator,
} from 'react-native';
import palette from '../palette';
import constants from '../constants';
import styles from './styles';
import {
  INPUT_VALID,
  INPUT_INVALID,
  INPUT_CHECKSUM_FAILED,
  INPUT_VALIDATING,
  INPUT_EMPTY,
  InputStatus,
} from '../Providers/MnemonicProvider/useMnemonic';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

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
  const [inputLabelHeight, setInputLabelHeight] = useState(0);
  const {mnemonicState, updateFromMenmonicPhrase} = useContext(MnemonicContext);
  const inputRef = useRef<TextInput | null>(null);

  // state
  const {fromMnemonicPhrase, inputStatus} = mnemonicState;
  const disableButton =
    inputStatus === INPUT_VALIDATING ||
    inputStatus === INPUT_EMPTY ||
    inputStatus === INPUT_INVALID;

  // helperFunctions
  const updateInputLabelHeight = (e: LayoutChangeEvent) => {
    setInputLabelHeight(e.nativeEvent.layout.height);
  };
  const focusTextInput = () => {
    inputRef.current?.focus();
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
