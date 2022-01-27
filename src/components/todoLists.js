import React from 'react';
import { FlatList } from 'react-native';
import { hslaAdjust } from '../utils/hslaAdjust';
import { DeleteIcon, DoneIcon, MoreIcon } from './icons';
import { Box, ButtonBox, TextBox, TextButton } from './';
import ProgressCircle from 'react-native-progress-circle';
import { Confirm, ModalButton, NewTodoList } from './modals';

export function TodoLists({
  todoLists,
  loading,
  addTodoListHandler,
  removeTodoListHandler,
}) {
  return (
    <Box>
      <FlatList
        data={todoLists}
        keyExtractor={i => i._id}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            removeTodoListHandler={removeTodoListHandler}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps="handled"
      />
      <ListFooterComponent addTodoListHandler={addTodoListHandler} />
    </Box>
  );
}

function RenderItem({ item: todoList, index, removeTodoListHandler }) {
  const counts = todoList.todos.reduce(
    (acc, item) => {
      item.isCompleted ? acc.completed++ : acc.unCompleted++;
      return acc;
    },
    { completed: 0, unCompleted: 0 },
  );
  const removeTodoList = cb => removeTodoListHandler({ _id: todoList._id }, cb);

  return (
    <Box p={10} row alignCenter>
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
      <TextBox
        ml={10}
        flex={1}
        fontSize={16}
        numberOfLines={1}
        ellipsizeMode="tail">
        {todoList.title}
      </TextBox>
      <ModalButton
        modalContent={
          <Confirm
            buttonText="Sil"
            contentText="Todo list'i silmek istediğinizden emin misiniz ?"
            onConfirm={removeTodoList}
          />
        }>
        <ButtonBox p={10} bg="#ddd">
          <DeleteIcon fill="red" />
        </ButtonBox>
      </ModalButton>
    </Box>
  );
}

function ListFooterComponent({ addTodoListHandler }) {
  return (
    <Box p={10}>
      <ModalButton
        modalContent={<NewTodoList addTodoListHandler={addTodoListHandler} />}>
        <TextButton fullWidth variant="outlined" p={20}>
          Yeni bir Todo List oluştur
        </TextButton>
      </ModalButton>
    </Box>
  );
}

function ListEmptyComponent() {
  return (
    <Box p={20} bg="blue.3">
      <TextBox>Hiç todo yok</TextBox>
    </Box>
  );
}

const data = [
  {
    _id: '61d6c49e6c46e726d82883ba',
    user: '61d42b21de6ebb22a8fff786',
    title: 'selam 1 fasdfasdfhfhjasd fasdf fasdf asdasd fasd ',
    todos: [
      {
        isCompleted: true,
        _id: '61da0644ab05521970873feb',
        text: 'slemadmgfbasdfasdf',
      },
      {
        isCompleted: true,
        _id: '61db4d26c740a822f87434a3',
        text: 'asdgadsfg jhvhjv ',
      },
      {
        isCompleted: true,
        _id: '61dfe37b0172251964347f79',
        text: 'asdfasdfgdfg dfgasdf asdf',
      },
      {
        isCompleted: true,
        _id: '61dfe4800172251964347f7f',
        text: 'sadfsa sdfsadas dfasdf asdf',
      },
      {
        isCompleted: false,
        _id: '61dfe4820172251964347f80',
        text: 'adsfasdf asdf as asdfsdsdafsadf',
      },
      {
        isCompleted: true,
        _id: '61dfeab50172251964347f98',
        text: 'asdfasdf',
      },
    ],
    createdAt: '2022-01-06T10:29:50.878Z',
    updatedAt: '2022-01-22T13:28:32.192Z',
    __v: 73,
  },
  {
    _id: '61da0cd736121526148a5b0c',
    user: '61d42b21de6ebb22a8fff786',
    title: 'sdfsdf',
    todos: [
      {
        isCompleted: false,
        _id: '61da0ce536121526148a5b10',
        text: 'f sadf sad',
      },
      {
        isCompleted: true,
        _id: '61da0ce836121526148a5b11',
        text: 's dfsd fsd',
      },
    ],
    createdAt: '2022-01-08T22:14:47.258Z',
    updatedAt: '2022-01-08T22:15:05.438Z',
    __v: 7,
  },
  {
    _id: '61e325dbd52cbd322c6659aa',
    user: '61d42b21de6ebb22a8fff786',
    title: 'asdfasdasdf',
    todos: [
      {
        isCompleted: false,
        _id: '61e5ce35c696dc00042ebaea',
        text: 'Kmnhb',
      },
    ],
    createdAt: '2022-01-15T19:51:55.353Z',
    updatedAt: '2022-01-17T20:14:45.929Z',
    __v: 1,
  },
  {
    _id: '61e5905f540149000f567e2',
    user: '61d42b21de6ebb22a8fff786',
    title: 'fdgdfsg g sdg dsf g',
    todos: [
      {
        isCompleted: true,
        _id: '61e590635401490004f567e6',
        text: 'sdfsd',
      },
    ],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e5905f54490004f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e5905f540104f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e5905f54014f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e59051490004f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e5990004f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61ef5401490004f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '6905f5401490004f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e59f54014900f567e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
  {
    _id: '61e590f5401490067e',
    user: '61d42b21de6ebb22a8fff86',
    title: 'fdgdfsg g sdg dsf g fasd f',
    todos: [],
    createdAt: '2022-01-17T15:50:55.140Z',
    updatedAt: '2022-01-17T15:51:40.580Z',
    __v: 8,
  },
];
