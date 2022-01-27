import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextBox, TextButton, TextInput, TextInputBox } from '../';

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
      ]}>
      <Box p={10}>
        <TextBox fontSize={16} color={errorMessage ? 'red' : undefined}>
          Todo List için başlık girin:
        </TextBox>
        <TextInput
          mt={10}
          // autoFocus
          color="black"
          fontSize={16}
          value={title}
          onChangeText={setTitle}
          borderColor={errorMessage ? 'red' : undefined}
        />
        {errorMessage ? (
          <TextBox fontSize={12} color="red" mt={5}>
            {errorMessage}
          </TextBox>
        ) : null}
      </Box>
    </ModalFormLayout>
  );
}
