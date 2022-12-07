import {useState, useRef, useContext, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  ActivityIndicator,
  Platform,
  FlatList,
} from 'react-native';
import palette from '../palette';
import constants from '../constants';
import styles from './styles';
import {InputStatus} from '../Providers/MnemonicProvider/useMnemonic';
import {MnemonicContext} from '../Providers/MnemonicProvider/MnemonicProvider';

const {
  mnemonicStatus,
  testIDs: {screen},
  validationReport,
  accessibilityLabel,
} = constants;

// helperFunctions
const parseInputValidationText = (inputStatus: InputStatus) => {
  switch (inputStatus) {
    case mnemonicStatus.VALID:
      return validationReport.valid;
    case mnemonicStatus.INVALID:
      return validationReport.invalid;
    case mnemonicStatus.CHECKSUM_FAILED:
      return validationReport.checksumIncorrect;
    default:
      return validationReport.empty;
  }
};
const parseInputValidationTextColor = (inputStatus: InputStatus) => {
  switch (inputStatus) {
    case mnemonicStatus.VALID:
      return palette.green;
    case mnemonicStatus.INVALID:
      return palette.red;
    case mnemonicStatus.CHECKSUM_FAILED:
      return palette.amber;
    default:
      return palette.white;
  }
};

function Screen() {
  // state
  const [inputLabelHeight, setInputLabelHeight] = useState(0);
  const [inputTop, setInputTop] = useState(0);
  const [inputContainerHeight, setInputContainerHeight] = useState(0);
  const [inputContentHeight, setInputContentHeight] = useState(0);

  const {
    mnemonicState,
    updateFromMenmonicPhrase,
    clearSuggestions,
    chooseSuggestion,
    validateFromMnemonice,
    onTranslatePress,
  } = useContext(MnemonicContext);
  const {fromMnemonicPhrase, inputStatus, inputSuggestions} = mnemonicState;
  const disableButton =
    inputStatus === mnemonicStatus.VALIDATING ||
    inputStatus === mnemonicStatus.EMPTY ||
    inputStatus === mnemonicStatus.INVALID;

  const inputRef = useRef<TextInput | null>(null);

  // helperFunctions
  const updateInputLabelHeight = useCallback((e: LayoutChangeEvent) => {
    setInputLabelHeight(e.nativeEvent.layout.height);
  }, []);
  const updateInputTop = useCallback((e: LayoutChangeEvent) => {
    setInputTop(e.nativeEvent.layout.y);
  }, []);
  const focusTextInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // state dependent styles
  const styles2 = {
    inputLabel: {
      top:
        inputTop !== 0 && inputLabelHeight !== 0
          ? inputTop - inputLabelHeight / 2
          : 0,
      opacity: inputTop !== 0 && inputLabelHeight !== 0 ? 1 : 0,
    },
    button: {
      opacity: disableButton ? constants.buttonActiveOpacity : 1,
    },
    inputValidationText: {
      color: parseInputValidationTextColor(inputStatus),
    },
    suggestionsContainer: {
      top: Math.min(
        inputContentHeight + (Platform.OS === 'ios' ? 5 : 0),
        inputContainerHeight,
      ),
    },
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Enter your {'\n'}Mnemonic phrase</Text>
        </View>
        <Text
          onLayout={updateInputLabelHeight}
          style={[styles.inputLabel, styles2.inputLabel]}>
          words separated by spaces
        </Text>
        <TouchableOpacity
          onLayout={updateInputTop}
          onPress={focusTextInput}
          activeOpacity={constants.buttonActiveOpacity}
          style={styles.inputContainer}>
          <View
            style={{flex: 1}}
            onLayout={e =>
              setInputContainerHeight(e.nativeEvent.layout.height)
            }>
            <TextInput
              onPressIn={clearSuggestions}
              value={fromMnemonicPhrase}
              onChangeText={updateFromMenmonicPhrase}
              onContentSizeChange={e => {
                setInputContentHeight(e.nativeEvent.contentSize.height);
              }}
              ref={inputRef}
              multiline
              style={styles.input}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={validateFromMnemonice}
              testID={screen.input}
              accessibilityLabel={accessibilityLabel.screen.input}
            />
            {inputSuggestions.length > 0 ? (
              <View
                style={[
                  styles.suggestionsContainer,
                  styles2.suggestionsContainer,
                ]}>
                <FlatList
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{justifyContent: 'center'}}
                  horizontal
                  data={inputSuggestions}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => chooseSuggestion(item)}
                      style={styles.suggestionButton}>
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
        <Text
          testID={screen.validationText}
          style={[styles.inputValidationText, styles2.inputValidationText]}>
          {parseInputValidationText(inputStatus)}
        </Text>
        <TouchableOpacity
          accessibilityLabel={accessibilityLabel.screen.button}
          onPress={onTranslatePress}
          disabled={disableButton}
          activeOpacity={constants.buttonActiveOpacity}
          style={[styles.button, styles2.button]}
          testID={screen.button}>
          {inputStatus === mnemonicStatus.VALIDATING ? (
            <ActivityIndicator color={palette.white} />
          ) : (
            <Text style={[styles.buttonTitle]}>Translate</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Screen;
