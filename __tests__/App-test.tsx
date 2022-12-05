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
import App from '../App.tsx';
// import {cleanup, render, screen, fireEvent} from './utils';
// import Screen from '../src/screen';
import constants from '../src/constants';

const {testIDs} = constants;

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

function call2(fn) {
  this.a = 'call1';
  console.log(this, 'in call');
  const unNamed = () => {
    this.b = 'unNamed';
    fn(this);
    console.log(this, 'in unNamed');
  };
  unNamed();
}

call2(console.log);

afterEach(cleanup);

it("Application's workflow operates correctly", () => {
  render(<App />);

  const {getByTestId} = screen;
  // const screenInput = getByTestId(testIDs.modalTitle.text);
  const validationText = getByTestId(testIDs.screen.validationText);
  // const screenButton = getByTestId(testIDs.screen.button);
  expect(validationText.children).toEqual([constants.validationReport.empty]);
  // fireEvent(screenInput, 'press');
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
