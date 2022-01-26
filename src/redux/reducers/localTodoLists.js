import { createSelector, createSlice } from '@reduxjs/toolkit';

export const generateID = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

const todoList = payload => ({
  _id: payload._id ? payload._id : generateID(),
  title: payload.title,
  todos: payload.todos
    ? payload.todos.map(todo => ({
        _id: generateID(),
        text: todo.text,
        isCompleted: false,
      }))
    : [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const slice = createSlice({
  name: 'localTodoLists',
  initialState: [],
  reducers: {
    addTodoList: (state, action) => {
      state.push(todoList(action.payload));
    },
    addTodo: (state, action) => {
      const index = state.findIndex(i => i._id == action.payload._id);
      if (index + 1) {
        state[index].todos.push({
          _id: generateID(),
          text: action.payload.text,
          isCompleted: false,
        });
        state[index].updatedAt = new Date().toISOString();
      }
    },
    updateTodoList: (state, action) => {
      const index = state.findIndex(i => i._id == action.payload._id);
      if (index + 1) {
        state[index] = { ...state[index], ...action.payload.update };
        state[index].updatedAt = new Date().toISOString();
      }
    },
    updateTodo: (state, action) => {
      const index = state.findIndex(i => i._id == action.payload._id);
      if (index + 1) {
        const todoIndex = state[index].todos.findIndex(
          i => i._id == action.payload.todo._id,
        );
        if (todoIndex + 1) {
          state[index].todos[todoIndex] = action.payload.todo;
          state[index].updatedAt = new Date().toISOString();
        }
      }
    },
    removeTodo: (state, action) => {
      const index = state.findIndex(i => i._id == action.payload._id);
      if (index + 1) {
        state[index].todos = state[index].todos.filter(
          i => i._id != action.payload.todo._id,
        );
        state[index].updatedAt = new Date().toISOString();
      }
    },
    removeTodoList: (state, action) => {
      const index = state.findIndex(i => i._id == action.payload._id);
      if (index + 1) {
        return state.filter(i => i._id != action.payload._id);
      }
    },
  },
});

export const getAllLocalTodoLists = createSelector(
  state => state.localTodoLists,
  localTodoLists => localTodoLists,
);

export const getLocalTodoList = _id =>
  createSelector(
    state => state.localTodoLists,
    localTodoLists => localTodoLists.find(i => i._id == _id),
  );

export const {
  addTodoList,
  addTodo,
  removeTodoList,
  removeTodo,
  updateTodoList,
  updateTodo,
} = slice.actions;

export default slice.reducer;
