import { combineReducers } from 'redux';
import authentication from './authentication';
import theme from './theme';
import localTodoLists from './localTodoLists';

export default combineReducers({ authentication, theme, localTodoLists });
