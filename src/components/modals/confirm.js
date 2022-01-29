import React from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextBox, TextButton } from '../';

export function Confirm({
  openModal,
  closeModal,
  onConfirm,
  contentText,
  buttonText,
}) {
  const [loading, setLoading] = React.useState(false);
  const onClick = () => {
    setLoading(true);
    onConfirm(err => {
      setLoading(false);
      closeModal();
    });
  };
  return (
    <ModalFormLayout
      heading="Dikkat!"
      footer={[
        <TextButton key={1} variant="text" onPress={onClick} loading={loading}>
          {buttonText ? buttonText : 'Tamam'}
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      maxWidth="90%">
      <Box p={20}>
        <TextBox fontSize={20} color="primary">
          {contentText}
        </TextBox>
      </Box>
    </ModalFormLayout>
  );
}
