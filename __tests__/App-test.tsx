/**
 * @format
 */

// import {TouchableOpacityProps} from 'react-native';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react-native';
// eslint-disable-next-line import/extensions
import App from '../App';
import constants from '../src/constants';

const {
  languages,
  accessibilityLabel,
  validationReport,
  wordlists,
  testIDs,
  modalTitles,
} = constants;

afterEach(cleanup);

const fromLanguage = languages.english;
const toLanguage = languages.spanish;
function selectFromLanguage() {
  const toButton = screen.getByText(fromLanguage);
  fireEvent.press(toButton);
}
async function assertFromModalDismissed() {
  await waitForElementToBeRemoved(() =>
    screen.getByText(modalTitles.fromLanguageListTitle),
  );
}
function inputMnemonic(mnemonic: string) {
  const mnemonicInput = screen.getByLabelText(accessibilityLabel.screen.input);
  fireEvent.changeText(mnemonicInput, mnemonic);
  fireEvent(mnemonicInput, 'blur');
}
function assertValidationReport(value: string) {
  expect(() => () => screen.getByText(value)).toBeDefined();
}
function selectToLanguage() {
  const toButton = screen.getByText(toLanguage);
  fireEvent.press(toButton);
}
async function assertBroadcastMnemonicOpened() {
  await waitFor(() => screen.getByText(toLanguage));
}
async function closeBroacastToMnemonic() {
  const closeButton = await waitFor(() => screen.getByText('Close'));
  fireEvent.press(closeButton);
}
async function assertBroadcastMnemonicClosed() {
  await waitForElementToBeRemoved(() => screen.getByText(toLanguage));
}

// tests
it('translate button disabled when mnemonic invalid', async () => {
  render(<App />);

  selectFromLanguage();

  await assertFromModalDismissed();

  // input invalid mnemonic
  inputMnemonic('an invalid mnemonic phrase');

  // check validation text output
  assertValidationReport(validationReport.invalid);

  // check if translate button disabled
  const translateButton = screen.getByLabelText(
    accessibilityLabel.screen.button,
  );
  expect(translateButton).toBeDisabled();
});

it("mnemonic is converted with warning when mnemonic's checksum is incorrect", async () => {
  render(<App />);

  selectFromLanguage();

  await assertFromModalDismissed();

  // input checksum incorrect mnemonic
  inputMnemonic(wordlists.English.slice(0, 13).join(' '));

  // check validation text output
  assertValidationReport(validationReport.checksumIncorrect);

  // trigger translate button
  const translateButton = screen.getByLabelText(
    accessibilityLabel.screen.button,
  );
  fireEvent.press(translateButton);

  // check warning modal displayed
  expect(screen.getByText(modalTitles.checksumFailed)).toBeDefined();

  // dismiss warning to proceed
  const overrideWarningButton = screen.getAllByTestId(testIDs.modalButton);
  fireEvent.press(overrideWarningButton[0]);

  // check warning modal dismissed
  await waitForElementToBeRemoved(() =>
    screen.getByText(modalTitles.checksumFailed),
  );

  // check language selection modal displayed
  await waitFor(() => screen.getByText(modalTitles.toLanguageListTitle));

  selectToLanguage();

  // check toMnemonic broadcasted
  await assertBroadcastMnemonicOpened();

  // close toMnemonic modal
  await closeBroacastToMnemonic();

  // check if modal closed
  await assertBroadcastMnemonicClosed();
});

it('mnemonic is converted when valid', async () => {
  render(<App />);

  selectFromLanguage();

  await assertFromModalDismissed();

  // input checksum incorrect mnemonic
  inputMnemonic(wordlists.English.slice(0, 12).join(' '));

  // check validation text output
  assertValidationReport(validationReport.checksumIncorrect);

  // trigger translate button
  const translateButton = screen.getByLabelText(
    accessibilityLabel.screen.button,
  );
  fireEvent.press(translateButton);

  // check language selection modal displayed
  await waitFor(() => screen.getByText(modalTitles.toLanguageListTitle));

  selectToLanguage();

  // check toMnemonic broadcasted
  await assertBroadcastMnemonicOpened();

  // close toMnemonic modal
  await closeBroacastToMnemonic();

  // check if modal closed
  await assertBroadcastMnemonicClosed();
});
