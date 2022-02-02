import React from 'react';
import { Box, TextBox, TextInputBox } from './';

export function TextInput({
  value,
  onChangeText,
  label,
  placeholder,
  errorMessage,
  autoFocus,
  onSubmitEditing,
  keyboardType,
  secureTextEntry,
  containerProps,
  ...rest
}) {
  return (
    <Box {...containerProps} {...rest}>
      <TextBox fontSize={18} color={errorMessage ? 'red' : 'primary'}>
        {label}
      </TextBox>
      <TextInputBox
        mt={10}
        p={10}
        fontSize={16}
        color="primary"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        borderWidth={2}
        borderRadius={10}
        borderColor={errorMessage ? 'red' : 'primary'}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage ? (
        <TextBox fontSize={12} color="red" mt={5}>
          {errorMessage}
        </TextBox>
      ) : null}
    </Box>
  );
}
