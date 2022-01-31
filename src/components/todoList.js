import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  ButtonBox,
  ProgressCircle,
  TextBox,
  TextButton,
  TextInput,
} from './';
import {
  Confirm,
  EditTodoListTitle,
  EditTodoText,
  ModalButton,
} from './modals';
import { DeleteIcon, EditIcon } from './icons';
import { useTheme } from 'styled-components';
import { hslaAdjust } from '../utils/hslaAdjust';

export function TodoList({
  todoList,
  addTodoHandler,
  removeTodoHandler,
  updateTodoHandler,
  updateTodoListHandler,
}) {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = () => {
    setErrorMessage('');
    if (text.length > 0) {
      setLoading(true);
      addTodoHandler({ _id: todoList._id, text }, () => {
        setText('');
        setLoading(false);
      });
    } else {
      setErrorMessage('Text boş olamaz');
    }
  };

  const removeTodo = todo => cb =>
    removeTodoHandler({ _id: todoList._id, todo }, cb);

  return (
    <Box as={ScrollView} p={10} keyboardShouldPersistTaps="handled">
      <Box row alignCenter>
        <TextBox
          fontSize={24}
          color="primary"
          numberOfLines={3}
          ellipsizeMode="tail">
          {todoList.title}
        </TextBox>
        <ModalButton
          modalContent={
            <EditTodoListTitle
              todoList={todoList}
              updateTodoListHandler={updateTodoListHandler}
            />
          }>
          <ButtonBox bg="primary" ml={10} p={5} borderRadius={10}>
            <EditIcon fill="white" width={32} height={32} />
          </ButtonBox>
        </ModalButton>
      </Box>
      <Box my={10}>
        <TextBox color="primary" fontSize={16}>
          Oluşturulma tarihi:{' '}
          {new Date(todoList.createdAt).toLocaleDateString()} -{' '}
          {new Date(todoList.createdAt).toLocaleTimeString()}
        </TextBox>
        <TextBox color="primary" fontSize={16}>
          Son güncellenme tarihi:{' '}
          {new Date(todoList.updatedAt).toLocaleDateString()} -{' '}
          {new Date(todoList.updatedAt).toLocaleTimeString()}
        </TextBox>
      </Box>
      <Box row my={10} alignItems="center">
        <TextBox color="primary" fontSize={30} mr={10}>
          Todos
        </TextBox>
        <ProgressCircle todos={todoList.todos} />
      </Box>
      <Box row my={10}>
        <TextInput
          label="Yeni Todo"
          value={text}
          onChangeText={setText}
          errorMessage={
            errorMessage && text.length == 0 ? errorMessage : undefined
          }
          containerProps={{ flex: 1 }}
        />
        <TextButton
          ml={10}
          mt={35}
          fontSize={20}
          variant="contained"
          borderRadius={10}
          onPress={addTodo}
          loading={loading}>
          Ekle
        </TextButton>
      </Box>
      <Box my={10}>
        {todoList.todos.length > 0 ? (
          todoList.todos.map(todo => (
            <Box key={todo._id} row my={5}>
              <TextButton
                onPress={() =>
                  updateTodoHandler({
                    _id: todoList._id,
                    todo: { ...todo, isCompleted: !todo.isCompleted },
                  })
                }
                flex={1}
                fontSize={16}
                textAlign="left"
                textProps={{
                  style: {
                    textDecorationLine: todo.isCompleted
                      ? 'line-through'
                      : undefined,
                  },
                }}
                variant={todo.isCompleted ? 'contained' : 'outlined'}
                borderRadius={10}>
                {todo.text}
              </TextButton>
              <ModalButton
                modalContent={
                  <EditTodoText
                    todoListID={todoList._id}
                    todo={todo}
                    updateTodoHandler={updateTodoHandler}
                  />
                }>
                <ButtonBox
                  justifyContent="center"
                  p={5}
                  ml={5}
                  bg={hslaAdjust({
                    color: theme.colors.primary,
                    l: 60,
                    s: -40,
                  })}
                  borderRadius={10}>
                  <EditIcon
                    fill={theme.colors.primary}
                    width={32}
                    height={32}
                  />
                </ButtonBox>
              </ModalButton>
              <ModalButton
                modalContent={
                  <Confirm
                    buttonText="Sil"
                    contentText="Todo'yu silmek istediğinizden emin misiniz ?"
                    onConfirm={removeTodo(todo)}
                  />
                }>
                <ButtonBox
                  justifyContent="center"
                  p={5}
                  ml={5}
                  bg={hslaAdjust({
                    color: theme.colors.primary,
                    l: 60,
                    s: -40,
                  })}
                  borderRadius={10}>
                  <DeleteIcon
                    fill={theme.colors.primary}
                    width={32}
                    height={32}
                  />
                </ButtonBox>
              </ModalButton>
            </Box>
          ))
        ) : (
          <TextBox>Hiç todo bulunamadı</TextBox>
        )}
      </Box>
    </Box>
  );
}

export function TodoListPlaceholder() {
  return (
    <Box>
      <TextBox>hello from todo list placeholder</TextBox>
    </Box>
  );
}
