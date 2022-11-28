/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
import {
  cleanup,
  render,
  screen,
  fireEvent,
} from '@testing-library/react-native';
// eslint-disable-next-line import/extensions
import App from '../App';
// import {cleanup, render, screen, fireEvent} from './utils';
import Screen from '../src/screen';
import constants from '../src/constants';

const {testIDs} = constants;

it('renders correctly', () => {
  renderer.create(<App />);
});

const inputTestID = 'screenInput';
const buttonTestID = 'screenButton';
const validationTextTestID = 'screenValidationText';
afterEach(cleanup);

describe("Application's workflow operates correctly", () => {
  render(<App />);

  const {getAllByText} = screen;
  const screenInput = getByTestId(testIDs.screen.input);
  const validationText = getByTestId(testIDs.screen.validationText);
  const screenButton = getByTestId(testIDs.screen.button);

  fireEvent(screenInput, 'press');
  // test that input value change reflects,

  // input INVALID mnemonic -
  //  fire blur event
  //  test validationText content
  //  test if screenButton disabled
  // input CHECKSUM INCORRECT mnemonic
  //  fire blur event
  //  test validationText content
  //  test if screenButton enabled
  //  test if screenButton onPress opens BroadcastChecksumFailed modal
  // input VALID mnemonic
  //  fire blur event
  //  test validationText content
  //  test if screenButton enabled
  //  test if screenButton onPress opens ChooseToLanguage modal
});
