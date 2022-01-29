import React from 'react';
import ProgressCircleModule from 'react-native-progress-circle';
import { useTheme } from 'styled-components';

export function ProgressCircle({ children, percent }) {
  const theme = useTheme();
  return (
    <ProgressCircleModule
      percent={percent}
      color={theme.colors.primary}
      shadowColor="#c6c6c6"
      bgColor="#e9e9e9"
      radius={28}
      borderWidth={4}>
      {children}
    </ProgressCircleModule>
  );
}
