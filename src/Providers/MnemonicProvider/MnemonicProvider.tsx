import {createContext, PropsWithChildren} from 'react';
import useMnemonic, {useMnemonicInitialValue} from './useMnemonic';

export const MnemonicContext = createContext(useMnemonicInitialValue);

function MnemonicProvider({children}: PropsWithChildren) {
  const value = useMnemonic();
  return (
    <MnemonicContext.Provider value={value}>
      {children}
    </MnemonicContext.Provider>
  );
}

export default MnemonicProvider;
