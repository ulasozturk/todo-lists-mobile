import React, { useState } from 'react';
import { ModalFormLayout } from './';
import { Box, TextButton, TextInput } from '../';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getRefreshToken } from '../../redux/reducers/authentication';

export function ChangePassword({ closeModal }) {
  const refreshToken = useSelector(getRefreshToken);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = () => {
    if (password.length > 0 && newPassword.length > 0) {
      setLoading(true);
      setError({});
      axios
        .post('/auth/changepassword', { password, newPassword, refreshToken })
        .then(res => {
          setLoading(false);
          closeModal();
        })
        .catch(err => {
          setLoading(false);
          const { errors, code } = err.response.data;
          setError(errors.find(i => i.code == code));
        });
    }
  };

  return (
    <ModalFormLayout
      heading="Şifrenizi değiştirin"
      footer={[
        <TextButton key={1} variant="text" onPress={onSubmit} loading={loading}>
          Değiştir
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      minWidth="70%"
      maxHeight="90%">
      <Box p={10}>
        <TextInput
          label="Şifrenizi giriniz"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={
            error.field == 'password'
              ? error.code == 4
                ? 'Şifre en az 6 haneli olmalıdır!'
                : error.code == 5
                ? 'Şifre yanlış!'
                : 'Bir hata oluştu!'
              : null
          }
        />
        <TextInput
          label="Yeni şifrenizi giriniz"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          errorMessage={
            error.field == 'newPassword'
              ? 'Şifre en az 6 haneli olmalıdır!'
              : null
          }
        />
      </Box>
    </ModalFormLayout>
  );
}
