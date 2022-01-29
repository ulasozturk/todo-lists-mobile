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
      {...containerProps}
      {...rest}>
      <Box p={10} borderBottomWidth={2} borderColor="primary">
        <TextBox fontSize={24} fontWeight="bold" color="primary">
          {heading}
        </TextBox>
      </Box>
      {children}
      <Box
        flexDirection="row-reverse"
        p={5}
        borderTopWidth={2}
        borderColor="primary">
        {footer}
      </Box>
    </Box>
  );
}
