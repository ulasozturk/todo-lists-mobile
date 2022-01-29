import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextBox, TextButton, TextInputBox } from '../';

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
      minWidth="80%">
      <Box p={10}>
        <TextBox fontSize={18} color={errorMessage ? 'red' : 'primary'}>
          Todo List için başlık girin:
        </TextBox>
        <TextInputBox
          mt={10}
          // autoFocus
          color="primary"
          fontSize={16}
          p={10}
          value={title}
          onChangeText={setTitle}
          borderWidth={2}
          borderRadius={10}
          borderColor={errorMessage ? 'red' : 'primary'}
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
