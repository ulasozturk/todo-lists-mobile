import { createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const signOutThunk = callback => (dispatch, getState) => {
  const { refreshToken } = getState().authentication;
  axios
    .delete(`/auth/refreshtokens/${refreshToken}`)
    .then(res => {
      dispatch(signOut());
      if (typeof callback == 'function') callback();
    })
    .catch(() => {
      dispatch(signOut());
      if (typeof callback == 'function') callback();
    });
};

const initialState = {
  accessToken: '',
  refreshToken: '',
  expiresInSeconds: '',
  expireDate: '',
  _id: '',
  email: '',
};

const authentication = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      const expireDate = new Date();
      expireDate.setSeconds(
        expireDate.getSeconds() + action.payload.expiresInSeconds,
      );
      return { ...action.payload, expireDate: expireDate.toJSON() };
    },
    signOut: state => {
      return initialState;
    },
    refresh: (state, action) => {
      const expireDate = new Date();
      expireDate.setSeconds(
        expireDate.getSeconds() + action.payload.expiresInSeconds,
      );
      state.expireDate = expireDate.toJSON();
      state.expiresInSeconds = action.payload.expiresInSeconds;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const getAuth = createSelector(
  state => state.authentication,
  state => state,
);

export const getRefreshToken = createSelector(
  state => state.authentication.refreshToken,
  state => state,
);

export const { signIn, signOut, refresh } = authentication.actions;

export default authentication.reducer;
