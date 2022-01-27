import React from 'react';
import { Modal } from './modal';

export function ModalButton({ children, modalContent, onPress }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const openModal = () => {
    if (onPress) {
      onPress();
    }
    setIsVisible(true);
  };
  const closeModal = () => setIsVisible(false);

  return (
    <>
      {isVisible ? (
        <Modal isVisible closeModal={closeModal}>
          {React.cloneElement(modalContent, { openModal, closeModal })}
        </Modal>
      ) : null}
      {React.cloneElement(children, { onPress: openModal })}
    </>
  );
}
