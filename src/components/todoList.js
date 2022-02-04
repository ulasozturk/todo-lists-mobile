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
  loading,
  errorMessage,
  addTodoHandler,
  removeTodoHandler,
  updateTodoHandler,
  updateTodoListHandler,
}) {
  return todoList ? (
    <Box
      as={ScrollView}
      contentContainerStyle={{ padding: 10, flex: 1 }}
      keyboardShouldPersistTaps="handled">
      <Box row alignCenter>
        <TextBox
          flexShrink={1}
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
      <Box row alignItems="center">
        <TextBox color="primary" fontSize={30} mr={10}>
          Todos
        </TextBox>
        <ProgressCircle todos={todoList.todos} />
      </Box>
      <Box my={10}>
        <AddTodo addTodoHandler={addTodoHandler} todoListID={todoList._id} />
      </Box>
      {todoList.todos.length > 0 ? (
        todoList.todos.map(todo => (
          <Box key={todo._id}>
            <TodoItem
              todo={todo}
              todoListID={todoList._id}
              updateTodoHandler={updateTodoHandler}
              removeTodoHandler={removeTodoHandler}
            />
          </Box>
        ))
      ) : (
        <ErrorMessage errorMessage="Hiç bir todo bulunamadı" fontSize={24} />
      )}
    </Box>
  ) : loading ? (
    <TodoListPlaceholder />
  ) : errorMessage ? (
    <ErrorMessage errorMessage={errorMessage} />
  ) : null;
}

function TodoListPlaceholder() {
  return (
    <Box p={10}>
      <Box row alignCenter>
        <Box flexShrink={1} width={250} height={30} bg="#ccc" />
        <Box bg="#ccc" ml={10} p={15} borderRadius={10}>
          <Box bg="#ccc" width={20} height={20} />
        </Box>
      </Box>
      <Box my={10}>
        <Box bg="#ccc" width={280} height={16} mt={10} />
        <Box bg="#ccc" width={280} height={16} mt={10} />
      </Box>
      <Box row alignItems="center">
        <Box bg="#ccc" width={100} height={30} mr={10} />
        <Box bg="#ccc" width={64} height={64} borderRadius={100} />
      </Box>
      <Box my={10}>
        <Box row>
          <Box flex={1}>
            <Box bg="#ccc" width={80} height={25} />
            <Box bg="#ccc" width="100%" height={50} mt={5} />
          </Box>
          <Box
            bg="#ccc"
            ml={10}
            mt={30}
            width={60}
            height={50}
            borderRadius={10}
          />
        </Box>
      </Box>
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => (
          <Box key={index} row my={5}>
            <Box bg="#ccc" flex={1} height={40} borderRadius={10} />
            <Box bg="#ccc" p={5} ml={5} borderRadius={10}>
              <Box bg="#ccc" width={32} height={32} />
            </Box>
            <Box bg="#ccc" p={5} ml={5} borderRadius={10}>
              <Box bg="#ccc" width={32} height={32} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ErrorMessage({
  errorMessage = 'Böyle bir kayıt bulunamadı!',
  fontSize = 32,
}) {
  return (
    <Box flex={1} center>
      <TextBox color="primary" fontSize={fontSize} textAlign="center">
        {errorMessage}
      </TextBox>
    </Box>
  );
}

function AddTodo({ addTodoHandler, todoListID }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = () => {
    setErrorMessage('');
    if (text.length > 0) {
      setLoading(true);
      addTodoHandler({ _id: todoListID, text }, () => {
        setText('');
        setLoading(false);
      });
    } else {
      setErrorMessage('Text boş olamaz');
    }
  };

  return (
    <Box row>
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
  );
}

function TodoItem({ todo, todoListID, updateTodoHandler, removeTodoHandler }) {
  const theme = useTheme();
  const updateTodo = () =>
    updateTodoHandler({
      _id: todoListID,
      todo: { ...todo, isCompleted: !todo.isCompleted },
    });
  const removeTodo = () => removeTodoHandler({ _id: todoListID, todo });

  return (
    <Box row my={5}>
      <TextButton
        onPress={updateTodo}
        flex={1}
        fontSize={16}
        textAlign="left"
        textProps={{
          style: {
            textDecorationLine: todo.isCompleted ? 'line-through' : undefined,
          },
        }}
        variant={todo.isCompleted ? 'contained' : 'outlined'}
        borderRadius={10}>
        {todo.text}
      </TextButton>
      <ModalButton
        modalContent={
          <EditTodoText
            todoListID={todoListID}
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
          <EditIcon fill={theme.colors.primary} width={32} height={32} />
        </ButtonBox>
      </ModalButton>
      <ModalButton
        modalContent={
          <Confirm
            buttonText="Sil"
            contentText="Todo'yu silmek istediğinizden emin misiniz ?"
            onConfirm={removeTodo}
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
          <DeleteIcon fill={theme.colors.primary} width={32} height={32} />
        </ButtonBox>
      </ModalButton>
    </Box>
  );
}
