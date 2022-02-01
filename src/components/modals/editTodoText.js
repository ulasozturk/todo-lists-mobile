import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextButton, TextInput } from '../';

export function EditTodoText({
  closeModal,
  todoListID,
  todo,
  updateTodoHandler,
}) {
  const [text, setText] = useState(todo.text);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const editTodo = () => {
    setErrorMessage('');
    if (text.length > 0) {
      setLoading(true);
      updateTodoHandler({ _id: todoListID, todo: { ...todo, text } }, () => {
        setLoading(false);
        closeModal();
      });
    } else {
      setErrorMessage('Todo text boş olamaz!');
    }
  };
  return (
    <ModalFormLayout
      heading="Todo text düzenle"
      footer={[
        <TextButton key={1} variant="text" onPress={editTodo} loading={loading}>
          Kaydet
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      minWidth="80%">
      <Box p={10}>
        <TextInput
          label="Todo text'i düzenleyin"
          value={text}
          onChangeText={setText}
          errorMessage={errorMessage}
          onSubmitEditing={editTodo}
        />
      </Box>
    </ModalFormLayout>
  );
}
