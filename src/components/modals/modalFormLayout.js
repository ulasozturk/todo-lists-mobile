import React from 'react';
import { Box, TextBox } from '../';

export function ModalFormLayout({
  containerProps,
  heading,
  children,
  footer,
  ...rest
}) {
  return (
    <Box
      bg="white"
      borderRadius={10}
      minWidth="50%"
      maxWidth="80%"
      minHeigth="50%"
      maxHeight="80%"
      {...containerProps}>
      <Box p={10}>
        <TextBox fontSize={24} fontWeight="bold">
          {heading}
        </TextBox>
      </Box>
      {children}
      <Box flexDirection="row-reverse" borderTopWidth={1} p={5}>
        {footer}
      </Box>
    </Box>
  );
}
