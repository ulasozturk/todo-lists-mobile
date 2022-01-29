import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { hslaAdjust } from '../utils/hslaAdjust';
import { AddIcon, DeleteIcon, DoneIcon, MoreIcon } from './icons';
import { Box, ButtonBox, ProgressCircle, TextBox } from './';
import { Confirm, ModalButton, NewTodoList } from './modals';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

export function TodoLists({
  todoLists,
  loading,
  addTodoListHandler,
  removeTodoListHandler,
}) {
  const navigation = useNavigation();
  const goToDetail = _id => () => navigation.navigate('TodoList', { _id });
  const theme = useTheme();

  return (
    <>
      <FlatList
        data={todoLists}
        keyExtractor={i => i._id}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            removeTodoListHandler={removeTodoListHandler}
            goToDetail={goToDetail}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 75 }}
      />
      <ModalButton
        modalContent={<NewTodoList addTodoListHandler={addTodoListHandler} />}>
        <ButtonBox
          as={TouchableHighlight}
          bg={theme.colors.primary}
          underlayColor={hslaAdjust({ color: theme.colors.primary, l: 40 })}
          position="absolute"
          bottom={10}
          right={10}
          borderRadius={40}
          p={15}>
          <AddIcon fill="white" width={32} height={32} />
        </ButtonBox>
      </ModalButton>
    </>
  );
}

function RenderItem({
  item: todoList,
  index,
  removeTodoListHandler,
  goToDetail,
}) {
  const theme = useTheme();
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
        color={theme.colors.primary}
        shadowColor="#c6c6c6"
        bgColor="#e9e9e9"
        radius={28}
        borderWidth={4}>
        {todoList.todos.length == 0 ? (
          <MoreIcon fill={theme.colors.primary} />
        ) : counts.unCompleted == 0 ? (
          <DoneIcon fill={theme.colors.primary} />
        ) : (
          <>
            <TextBox fontSize={20} color="black">
              {counts.unCompleted}
            </TextBox>
            <TextBox mt={-3} fontSize={10} color="black">
              kalan
            </TextBox>
          </>
        )}
      </ProgressCircle>
      <ButtonBox
        onPress={goToDetail(todoList._id)}
        flex={1}
        p={20}
        bg={hslaAdjust({ color: theme.colors.primary, l: 60, s: -40 })}
        borderRadius={10}
        mx={5}
        justifyContent="center">
        <TextBox
          color="primary"
          fontSize={16}
          numberOfLines={1}
          ellipsizeMode="tail">
          {todoList.title}
        </TextBox>
      </ButtonBox>
      <ModalButton
        modalContent={
          <Confirm
            buttonText="Sil"
            contentText="Todo list'i silmek istediğinizden emin misiniz ?"
            onConfirm={removeTodoList}
          />
        }>
        <ButtonBox
          p={10}
          bg={hslaAdjust({ color: theme.colors.primary, l: 60, s: -40 })}
          borderRadius={10}
          alignSelf="stretch"
          justifyContent="center">
          <DeleteIcon fill={theme.colors.primary} />
        </ButtonBox>
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
