import React from 'react';
import { Box, TextBox } from '../components';
import Spinner from 'react-native-spinkit';
import { hslaAdjust } from '../utils/hslaAdjust';

export function Loading({ theme }) {
  return (
    <Box
      flex={1}
      center
      bg={hslaAdjust({ color: theme.colors.primary, lAbs: 90, sAbs: 20 })}>
      <TextBox color={theme.colors.primary} fontSize={40} fontWeight="bold">
        Todo Lists App
      </TextBox>
      <Spinner
        type="Wave"
        color={theme.colors.primary}
        isVisible
        style={{ marginTop: 10 }}
      />
    </Box>
  );
}
