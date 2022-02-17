import React from 'react';
import ProgressCircleModule from 'react-native-progress-circle';
import { useTheme } from 'styled-components';
import { DoneIcon, MoreIcon } from './icons';
import { TextBox } from './';
import { shadow } from '../utils/shadowGenerator';

export function ProgressCircle({ todos }) {
  const theme = useTheme();
  const counts = todos.reduce(
    (acc, item) => {
      item.isCompleted ? acc.completed++ : acc.unCompleted++;
      return acc;
    },
    { completed: 0, unCompleted: 0 },
  );

  return (
    <ProgressCircleModule
      percent={
        todos.length > 0
          ? counts.completed > 0
            ? (counts.completed / todos.length) * 100
            : 10
          : 10
      }
      color={theme.colors.primary}
      shadowColor="#c6c6c6"
      bgColor="#e9e9e9"
      radius={28}
      outerCircleStyle={shadow(3)}
      borderWidth={4}>
      {todos.length == 0 ? (
        <MoreIcon fill={theme.colors.primary} />
      ) : counts.unCompleted == 0 ? (
        <DoneIcon fill={theme.colors.primary} />
      ) : (
        <>
          <TextBox fontSize={20} color="black">
            {counts.unCompleted}
          </TextBox>
          <TextBox mt={-3} fontSize={10} color="black">
            kalan
          </TextBox>
        </>
      )}
    </ProgressCircleModule>
  );
}
