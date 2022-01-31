import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextBox, TextButton, TextInput } from '../';

export function EditTodoListTitle({
  openModal,
  closeModal,
  todoList,
  updateTodoListHandler,
}) {
  const [title, setTitle] = useState(todoList.title);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const editTodoList = () => {
    setErrorMessage('');
    if (title.length > 0) {
      setLoading(true);
      updateTodoListHandler({ _id: todoList._id, update: { title } }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage('Title boş olamaz!');
    }
  };

  return (
    <ModalFormLayout
      heading="TodoList başlığını düzenle"
      footer={[
        <TextButton
          key={1}
          variant="text"
          onPress={editTodoList}
          loading={loading}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      minWidth="80%">
      <Box p={10}>
        <TextInput
          label="TodoList başlığını düzenleyin:"
          value={title}
          onChangeText={setTitle}
          errorMessage={errorMessage}
          onSubmitEditing={editTodoList}
        />
      </Box>
    </ModalFormLayout>
  );
}
