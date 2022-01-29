import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Box, TextBox, TextButton, TextInputBox } from './';
import {
  Confirm,
  EditTodoListTitle,
  EditTodoText,
  ModalButton,
} from './modals';
import { DeleteIcon, DoneIcon, EditIcon, MoreIcon } from './icons';
import ProgressCircle from 'react-native-progress-circle';

export function TodoList({
  todoList,
  addTodoHandler,
  removeTodoHandler,
  updateTodoHandler,
  updateTodoListHandler,
}) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const counts = todoList.todos.reduce(
    (acc, item) => {
      item.isCompleted ? acc.completed++ : acc.unCompleted++;
      return acc;
    },
    { completed: 0, unCompleted: 0 },
  );

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
        <TextBox fontSize={24} color="primary">
          {todoList.title}
        </TextBox>
        <ModalButton
          modalContent={
            <EditTodoListTitle
              todoList={todoList}
              updateTodoListHandler={updateTodoListHandler}
            />
          }>
          <EditIcon marginLeft={10} fill="red" />
        </ModalButton>
      </Box>
      <Box>
        <TextBox color="primary">
          Oluşturulma tarihi: {new Date(todoList.createdAt).toLocaleString()}
        </TextBox>
        <TextBox color="primary">
          Son güncellenme tarihi:{' '}
          {new Date(todoList.updatedAt).toLocaleString()}
        </TextBox>
      </Box>
      <Box row>
        <TextBox>Todos</TextBox>
        <ProgressCircle
          percent={
            todoList.todos.length > 0
              ? counts.completed > 0
                ? (counts.completed / todoList.todos.length) * 100
                : 10
              : 10
          }
          radius={28}
          borderWidth={3}>
          {todoList.todos.length == 0 ? (
            <MoreIcon fill="red" />
          ) : counts.unCompleted == 0 ? (
            <DoneIcon fill="red" />
          ) : (
            <>
              <TextBox fontSize={20}>{counts.unCompleted}</TextBox>
              <TextBox fontSize={10}>kalan</TextBox>
            </>
          )}
        </ProgressCircle>
      </Box>
      <Box row>
        <TextBox>Yeni Todo: </TextBox>
        <TextInputBox
          value={text}
          onChangeText={setText}
          borderWidth={2}
          borderColor="primary"
          borderRadius={20}
          flex={1}
        />
        <TextButton
          variant="contained"
          borderRadius={10}
          onPress={addTodo}
          loading={loading}>
          Ekle
        </TextButton>
      </Box>
      <Box>
        {todoList.todos.length > 0 ? (
          todoList.todos.map(todo => (
            <Box key={todo._id} row>
              <TextButton
                onPress={() =>
                  updateTodoHandler({
                    _id: todoList._id,
                    todo: { ...todo, isCompleted: !todo.isCompleted },
                  })
                }
                flex={1}
                textAlign="left"
                style={{
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                  textDecorationThickness: '3px',
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
                <EditIcon fill="red" />
              </ModalButton>
              <ModalButton
                modalContent={
                  <Confirm
                    buttonText="Sil"
                    contentText="Todo'yu silmek istediğinizden emin misiniz ?"
                    onConfirm={removeTodo(todo)}
                  />
                }>
                <DeleteIcon fill="red" />
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
