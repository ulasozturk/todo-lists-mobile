import React, { useState } from 'react';
import { ModalFormLayout } from './';
import { Box, TextButton, TextInput } from '../';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/reducers/authentication';
import { ScrollView } from 'react-native';

export function SignUp({ closeModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = () => {
    if (email.length > 0 && password.length > 0 && passwordAgain.length > 0) {
      if (password == passwordAgain) {
        setLoading(true);
        setError({});
        axios
          .post('/auth/signup', { email, password })
          .then(res => {
            setLoading(false);
            closeModal();
            dispatch(signIn(res.data));
          })
          .catch(err => {
            setLoading(false);
            const { errors, code } = err.response.data;
            setError(errors.find(i => i.code == code));
          });
      } else {
        setError({ field: 'passwordRepeat' });
      }
    }
  };

  return (
    <ModalFormLayout
      heading="Üye olun"
      footer={[
        <TextButton key={1} variant="text" onPress={onSubmit} loading={loading}>
          Üye ol
        </TextButton>,
        <TextButton key={2} variant="text" onPress={closeModal}>
          İptal
        </TextButton>,
      ]}
      minWidth="80%"
      maxHeight="100%">
      <Box as={ScrollView} contentContainerStyle={{ padding: 10 }}>
        <TextInput
          label="Email'inizi giriniz"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          errorMessage={
            error.field == 'email'
              ? error.code == 1
                ? 'Email hatalı!'
                : error.code == 2
                ? 'Email zaten kullanımda!'
                : 'Bir hata oluştu!'
              : null
          }
        />
        <TextInput
          mt={10}
          label="Şifrenizi giriniz"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={
            error.field == 'password' ? 'Şifre en az 6 haneli olmalıdır!' : null
          }
        />
        <TextInput
          mt={10}
          label="Şifrenizi tekrar giriniz"
          secureTextEntry
          value={passwordAgain}
          onChangeText={setPasswordAgain}
          errorMessage={
            error.field == 'passwordRepeat' ? 'Şifre aynı değil!' : null
          }
        />
      </Box>
    </ModalFormLayout>
  );
}
