import React, { useState } from 'react';
import { ChangePassword, Confirm, ModalFormLayout } from './';
import { Box, TextBox, TextButton } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from '../../redux/reducers/authentication';
import axios from 'axios';

export function Account({ closeModal }) {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const signOutHandler = callback => {
    axios
      .delete(`/auth/refreshtokens/${auth.refreshToken}`)
      .then(() => {
        callback();
        closeModal();
        dispatch(signOut());
      })
      .catch(() => dispatch(signOut()));
  };

  const [isSignOut, setIsSignOut] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  return isSignOut ? (
    <Confirm
      closeModal={() => setIsSignOut(false)}
      contentText="Çıkış yapmak istediğinizden emin misiniz ?"
      buttonText="Çıkış yap"
      onConfirm={signOutHandler}
    />
  ) : isChangePassword ? (
    <ChangePassword closeModal={() => setIsChangePassword(false)} />
  ) : (
    <ModalFormLayout
      heading="Hesap İşlemleri"
      footer={[
        <TextButton key={1} variant="text" onPress={closeModal}>
          Tamam
        </TextButton>,
      ]}>
      <Box p={10}>
        <TextBox fontSize={18} my={10} textAlign="center" color="primary">
          {auth.email}
        </TextBox>
        <Box height={1} bg="primary" />
        <TextButton
          onPress={() => setIsChangePassword(true)}
          fullWidth
          color="primary">
          Şifre değiştir
        </TextButton>
        <Box height={1} bg="primary" />
        <TextButton
          onPress={() => setIsSignOut(true)}
          fullWidth
          color="primary">
          Çıkış yap
        </TextButton>
      </Box>
    </ModalFormLayout>
  );
}
