import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextButton, TextInput } from '../';

export function NewTodoList({ openModal, closeModal, addTodoListHandler }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addTodoList = () => {
    setErrorMessage('');
    if (title.length > 0) {
      setLoading(true);
      addTodoListHandler({ title }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage('Title boş olamaz!');
    }
  };

  return (
    <ModalFormLayout
      heading="Yeni bir todo list oluşturun"
      footer={[
        <TextButton
          key={1}
          variant="text"
          onPress={addTodoList}
          loading={loading}>
          Oluştur
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      minWidth="80%"
      maxWidth="100%">
      <Box p={10}>
        <TextInput
          label="Todo List için başlık girin:"
          value={title}
          onChangeText={setTitle}
          errorMessage={errorMessage}
          onSubmitEditing={addTodoList}
        />
      </Box>
    </ModalFormLayout>
  );
}
