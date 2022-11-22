import Modal from 'react-native-modal';
import {View} from 'react-native';
import {PropsWithChildren} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = ScaledSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    width: '75%',
    height: '85%',
    justifyContent: 'center',
  },
});

function ModalContainer({
  isVisible,
  children,
}: PropsWithChildren<{isVisible: boolean}>) {
  return (
    <Modal
      coverScreen={false}
      isVisible={isVisible}
      // onBackButtonPress
      // onBackdropPress
      // onModalHide
      useNativeDriver
      hideModalContentWhileAnimating
      style={styles.modal}
      propagateSwipe
      backdropOpacity={0.8}>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        edges={['left', 'right', 'bottom']}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
}

export default ModalContainer;
