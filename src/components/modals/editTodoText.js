import React, { useState } from 'react';
import { ModalFormLayout } from './modalFormLayout';
import { Box, TextBox, TextButton, TextInput } from '../';

export function EditTodoText({
  openModal,
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
      ]}>
      <Box flexDirection="column" p={10}>
        <TextBox fontSize={16} color={errorMessage ? 'red' : undefined}>
          Todo text'ini düzenleyin:
        </TextBox>
        <TextInput
          autoFocus
          color="black"
          fontSize={16}
          value={text}
          onChangeText={setText}
          borderColor={errorMessage ? 'red' : undefined}
        />
        {errorMessage ? (
          <TextBox fontSize={12} color="red" mt={-5}>
            {errorMessage}
          </TextBox>
        ) : null}
      </Box>
    </ModalFormLayout>
  );
}
