import {createContext, PropsWithChildren} from 'react';
import useMnemonic, {useMnemonicInitialReturn} from './useMnemonic';

export const MnemonicContext = createContext(useMnemonicInitialReturn);

function MnemonicProvider({children}: PropsWithChildren) {
  const value = useMnemonic();
  return (
    <MnemonicContext.Provider value={value}>
      {children}
    </MnemonicContext.Provider>
  );
}

export default MnemonicProvider;
