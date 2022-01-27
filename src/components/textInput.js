import React from 'react';
import { TextInputBox } from './styled-components';

export function TextInput({ value, onChangeText, placeholder, ...rest }) {
  return (
    <TextInputBox
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      color="hsl(32,70%,50%)"
      placeholderTextColor="hsl(32,80%,50%)"
      bg="hsl(32,100%,80%)"
      fontSize={18}
      p={20}
      borderRadius={20}
      width="100%"
      {...rest}
    />
  );
}
