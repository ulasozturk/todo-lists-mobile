import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoList,
  generateID,
  getAllLocalTodoLists,
  removeTodoList,
} from '../redux/reducers/localTodoLists';
import axios from 'axios';
import { TodoLists } from '../components';
import { useIsAuthenticated } from '../utils/hooks/useIsAuthenticated';

export default function TodoListsScreen() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <RemoteTodoLists />;
  } else {
    return <LocalTodoLists />;
  }
}

function RemoteTodoLists() {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/todolists').then(res => {
      setTodoLists(res.data);
      setLoading(false);
    });
  }, []);

  const addTodoListHandler = ({ title }, callback) => {
    axios
      .post('/todolists', { title })
      .then(res => {
        setTodoLists(todoLists => [...todoLists, res.data]);
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  const removeTodoListHandler = ({ _id }, callback) => {
    axios
      .delete(`/todolists/${_id}`)
      .then(() => {
        setTodoLists(todoLists => todoLists.filter(i => i._id != _id));
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  return (
    <TodoLists
      todoLists={todoLists}
      loading={loading}
      addTodoListHandler={addTodoListHandler}
      removeTodoListHandler={removeTodoListHandler}
    />
  );
}

function LocalTodoLists() {
  const dispatch = useDispatch();
  const todoLists = useSelector(getAllLocalTodoLists);

  const addTodoListHandler = ({ title }, callback) => {
    const _id = generateID();
    dispatch(addTodoList({ title, _id }));
    if (typeof callback == 'function') callback();
  };

  const removeTodoListHandler = ({ _id }, callback) => {
    dispatch(removeTodoList({ _id }));
    if (typeof callback == 'function') callback();
  };

  return (
    <TodoLists
      todoLists={todoLists}
      addTodoListHandler={addTodoListHandler}
      removeTodoListHandler={removeTodoListHandler}
    />
  );
}
