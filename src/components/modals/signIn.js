import React, { useState } from 'react';
import { ModalFormLayout, SignUp } from './';
import { Box, TextButton, TextInput } from '../';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/reducers/authentication';
import { ScrollView } from 'react-native';

export function SignIn({ closeModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onSubmit = () => {
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      setError({});
      axios
        .post('/auth/signin', { email, password })
        .then(res => {
          setLoading(false);
          dispatch(signIn(res.data));
          closeModal();
        })
        .catch(err => {
          setLoading(false);
          setError(err.response.data.error);
        });
    }
  };

  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignUp closeModal={closeModal} />
  ) : (
    <ModalFormLayout
      heading="Giriş yapın"
      footer={[
        <TextButton key={1} variant="text" onPress={onSubmit} loading={loading}>
          Giriş yap
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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          errorMessage={
            error.field == 'email'
              ? error.code == 0
                ? 'Email hatalı!'
                : error.code == 2
                ? 'Email bulunamadı!'
                : 'Bir hata oluştu.'
              : null
          }
        />
        <TextInput
          mt={10}
          label="Şifrenizi giriniz"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={onSubmit}
          errorMessage={
            error.field == 'password'
              ? error.code == 3
                ? 'Şifre en az 6 haneli olmalıdır!'
                : error.code == 4
                ? 'Şifre yanlış!'
                : 'Bir hata oluştu.'
              : null
          }
        />
        <TextButton
          onPress={() => setIsSignUp(true)}
          color="primary"
          fullWidth
          fontSize={16}>
          Bir hesabınız yoksa hemen üye olun!
        </TextButton>
      </Box>
    </ModalFormLayout>
  );
}
