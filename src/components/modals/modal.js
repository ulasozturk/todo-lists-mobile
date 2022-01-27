import React from 'react';
import ModalModule from 'react-native-modal';

export function Modal({ isVisible, closeModal, children }) {
  return (
    <ModalModule
      isVisible={isVisible}
      hideModalContentWhileAnimating
      useNativeDriver
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      supportedOrientations={['portrait', 'landscape']}
      style={{ margin: 0, alignItems: 'center' }}>
      {children}
    </ModalModule>
  );
}
