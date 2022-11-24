import {ScaledSheet} from 'react-native-size-matters';
import palette from '../palette';
import constants from '../constants';

export default ScaledSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    backgroundColor: palette.whiteBackground,
    paddingHorizontal: `${constants.screenMargin}@msr`,
  },
  headerContainer: {
    marginTop: '45@mvsr',
  },
  header: {
    fontSize: '35@msr',
    color: palette.green,
    fontFamily: 'Inter Bold',
  },
  inputContainer: {
    marginTop: '35@mvsr',
    width: '100%',
    aspectRatio: 1.75,
    borderWidth: 2,
    borderColor: palette.green,
    borderRadius: '7.5@msr',
    padding: '13.5@msr',
  },
  inputLabel: {
    position: 'absolute',
    fontSize: '14@msr',
    left: '15@msr',
    color: palette.green,
    fontFamily: 'Inter Bold',
    backgroundColor: palette.whiteBackground,
    paddingHorizontal: '5@msr',
  },
  input: {
    color: palette.green,
    fontSize: '16.5@msr',
    fontFamily: 'Inter Bold',
    padding: 0,
  },
  button: {
    marginTop: '45@mvsr',
    width: '105@msr',
    height: '40@msr',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: palette.green,
    borderRadius: '5@msr',
  },
  buttonTitle: {
    color: palette.white,
    fontSize: '16.5@msr',
    fontFamily: 'Inter Bold',
    textAlign: 'center',
  },
  inputValidationText: {
    fontSize: '14@msr',
    fontFamily: 'Inter Bold',
    marginTop: '3.5@mvsr',
    textAlign: 'center',
  },
});
