import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  getAllLocalTodoLists,
  removeTodo,
  updateTodo,
  updateTodoList,
} from '../redux/reducers/localTodoLists';
import axios from 'axios';
import { TodoList } from '../components';
import { useIsAuthenticated } from '../utils/hooks/useIsAuthenticated';
import { useRoute } from '@react-navigation/native';

export default function TodoListPage() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <RemoteTodoList />;
  } else {
    return <LocalTodoList />;
  }
}

function RemoteTodoList() {
  const route = useRoute();
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (route.params.todoList) {
      setTodoList(route.params.todoList);
      setLoading(false);
    } else {
      axios
        .get('/todolists/' + route.params._id)
        .then(res => {
          setTodoList(res.data);
          setLoading(false);
        })
        .catch(err => {
          if (err.response.status == 403) {
            setErrorMessage('Bu kaydı görüntülemek için yetkiniz yok!');
          } else if (err.response.status == 404) {
            setErrorMessage('Böyle bir kayıt bulunamadı!');
          } else if (err.response.status == 400) {
            setErrorMessage(
              "Böyle bir kayıt bulunamadı! Lütfen kayıt id'sini kontrol edin.",
            );
          }
          setLoading(false);
        });
    }
  }, []);

  const addTodoHandler = ({ _id, text }, callback) => {
    axios
      .post(`/todolists/${_id}/todo`, { text })
      .then(res => {
        setTodoList(res.data);
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  const updateTodoListHandler = ({ _id, update }, callback) => {
    axios
      .patch(`/todolists/${_id}`, update)
      .then(res => {
        setTodoList(res.data);
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  const updateTodoHandler = ({ _id, todo }, callback) => {
    axios
      .patch(`/todolists/${_id}/todo`, { todo })
      .then(res => {
        setTodoList(res.data);
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  const removeTodoHandler = ({ _id, todo }, callback) => {
    axios
      .delete(`/todolists/${_id}/todo`, { data: { todo } })
      .then(res => {
        setTodoList(res.data);
        if (typeof callback == 'function') callback();
      })
      .catch(err => {
        if (typeof callback == 'function') callback(err.response);
      });
  };

  return (
    <TodoList
      todoList={todoList}
      loading={loading}
      errorMessage={errorMessage}
      addTodoHandler={addTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
      updateTodoHandler={updateTodoHandler}
      removeTodoHandler={removeTodoHandler}
    />
  );
}

function LocalTodoList() {
  const dispatch = useDispatch();
  const route = useRoute();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const todoList = localTodoLists.find(i => i._id == route.params._id);

  const addTodoHandler = ({ _id, text }, callback) => {
    dispatch(addTodo({ _id, text }));
    if (typeof callback == 'function') callback();
  };

  const removeTodoHandler = ({ _id, todo }, callback) => {
    dispatch(removeTodo({ _id, todo }));
    if (typeof callback == 'function') callback();
  };

  const updateTodoHandler = ({ _id, todo }, callback) => {
    dispatch(updateTodo({ _id, todo }));
    if (typeof callback == 'function') callback();
  };

  const updateTodoListHandler = ({ _id, update }, callback) => {
    dispatch(updateTodoList({ _id, update }));
    if (typeof callback == 'function') callback();
  };

  return (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      removeTodoHandler={removeTodoHandler}
      updateTodoHandler={updateTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
    />
  );
}
