import constants from '../constants';

const {mnemonicStatus} = constants;

export default function parseMnemonicChecksum(
  mnemonicLength: number,
  indexes: number[],
):
  | [typeof mnemonicStatus.VALID, number[]]
  | [typeof mnemonicStatus.CHECKSUM_FAILED, number[]] {
  if (mnemonicLength % 3 === 0) {
    return [mnemonicStatus.VALID, indexes];
  }
  return [mnemonicStatus.CHECKSUM_FAILED, indexes];
}
