import constants, {Language} from '../constants';
import parseMnemonicChecksum from './parseMnemonicChecksum';

const {wordlists, mnemonicStatus} = constants;

export default function validateMnemonic(
  mnemonic: string,
  language: Language,
):
  | typeof mnemonicStatus.EMPTY
  | typeof mnemonicStatus.INVALID
  | [typeof mnemonicStatus.VALID, number[]]
  | [typeof mnemonicStatus.CHECKSUM_FAILED, number[]] {
  if (mnemonic.length === 0) return mnemonicStatus.EMPTY;

  const mnemonicWords = mnemonic.split(/\s+/);
  const mnemonicWordsLength = mnemonicWords.length;

  if (!(mnemonicWordsLength >= 12 && mnemonicWordsLength <= 24))
    return mnemonicStatus.INVALID;

  let i = 0;
  const indexes = new Array<number>(mnemonicWords.length).fill(-1);
  let unfoundMnemonicWordsIndexes = mnemonicWords.map((_, index) => index);
  function searchForUnfoundIndexes(unfoundIndex: number) {
    const foundWordlistIndex =
      mnemonicWords[unfoundIndex] === wordlists[language][i];
    if (foundWordlistIndex) {
      indexes[unfoundIndex] = i;
    }
    return !foundWordlistIndex;
  }

  while (i < wordlists[language].length - 1) {
    if (unfoundMnemonicWordsIndexes.length > 0) {
      unfoundMnemonicWordsIndexes = unfoundMnemonicWordsIndexes.filter(
        searchForUnfoundIndexes,
      );
    } else return parseMnemonicChecksum(mnemonicWordsLength, indexes);
    i += 1;
  }
  if (indexes.filter(index => index === -1).length > 0) {
    return mnemonicStatus.INVALID;
  }
  return parseMnemonicChecksum(mnemonicWordsLength, indexes);
}
