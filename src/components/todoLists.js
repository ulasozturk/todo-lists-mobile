import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { hslaAdjust } from '../utils/hslaAdjust';
import { AddIcon, DeleteIcon } from './icons';
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
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 75,
          paddingTop: 10,
        }}
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

function RenderItem({ item: todoList, index, removeTodoListHandler }) {
  const theme = useTheme();
  const removeTodoList = cb => removeTodoListHandler({ _id: todoList._id }, cb);
  const navigation = useNavigation();
  const goToDetail = () =>
    navigation.navigate('TodoList', { _id: todoList._id });

  return (
    <Box p={10} row alignCenter>
      <ProgressCircle todos={todoList.todos} />
      <ButtonBox
        onPress={goToDetail}
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
