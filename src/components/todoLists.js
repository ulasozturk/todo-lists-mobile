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
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 75,
          paddingTop: 10,
          flex: 1,
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
          zIndex={2}
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

function ListEmptyComponent({ loading }) {
  return loading ? (
    <>
      <Box pt={10} pb={75}>
        {[1, 2, 3, 4, 5, 6].map((i, index) => (
          <Box key={index} p={10} row alignCenter>
            <Box borderRadius={100} bg="#ccc" width={60} height={60} />
            <Box flex={1} height={56} bg="#ccc" borderRadius={10} mx={5} />
            <Box p={10} bg="#ccc" borderRadius={10} alignSelf="stretch">
              <Box width={24} height={24} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        bg="#ccc"
        position="absolute"
        bottom={10}
        right={10}
        borderRadius={40}
        p={15}>
        <Box width={32} height={32} />
      </Box>
    </>
  ) : (
    <Box flex={1} center>
      <TextBox color="primary" fontSize={32} textAlign="center">
        Henüz bir Todo List oluşturmadınız
      </TextBox>
    </Box>
  );
}
