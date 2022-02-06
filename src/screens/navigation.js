import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TodoLists from './todoLists';
import TodoList from './todoList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  refresh,
  signOutThunk,
} from '../redux/reducers/authentication';
import { useTheme } from 'styled-components';
import axios from 'axios';
import { Loading } from './loading';

const Stack = createNativeStackNavigator();

export function Navigation() {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(!!auth.refreshToken);

  useEffect(() => {
    let timeoutID = null;
    if (!!auth.refreshToken) {
      timeoutID = setTimeout(() => {
        axios
          .get(`/auth/accesstoken/${auth.refreshToken}`)
          .then(res => {
            dispatch(refresh(res.data));
          })
          .catch(() => dispatch(signOutThunk()));
      }, 1000 * auth.expiresInSeconds - 10000);
      if (new Date() > new Date(auth.expireDate)) {
        axios
          .get(`/auth/accesstoken/${auth.refreshToken}`)
          .then(res => {
            dispatch(refresh(res.data));
            setLoading(false);
          })
          .catch(() => dispatch(signOutThunk()));
      } else {
        setLoading(false);
      }
    } else {
      if (timeoutID) {
        clearInterval(timeoutID);
      }
    }
    return () => {
      clearInterval(timeoutID);
    };
  }, [auth.refreshToken, auth.expireDate]);

  return loading ? (
    <Loading theme={theme} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TodoLists"
          component={TodoLists}
          options={{
            title: 'Todo Lists',
            headerTintColor: theme.colors.primary,
          }}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{
            title: 'Todo List',
            headerTintColor: theme.colors.primary,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
