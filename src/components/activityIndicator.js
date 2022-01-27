import React from 'react';
import { ActivityIndicator as ActivityIndicatorNative } from 'react-native';
import { useTheme } from 'styled-components';

export function ActivityIndicator({ color, ...rest }) {
  const theme = useTheme();
  return (
    <ActivityIndicatorNative
      color={
        color
          ? typeof color == 'function'
            ? color(theme)
            : color
          : theme.colors.activityIndicator
      }
      {...rest}
    />
  );
}
