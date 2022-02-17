import React from 'react';
import { ButtonBox, TextBox } from './styled-components';
import { shadow } from '../utils/shadowGenerator';
import { useTheme } from 'styled-components';
import Loading from 'react-native-spinkit';

export function TextButton({
  children,
  onPress,
  text,
  subText,
  textAlign = 'center',
  variant = 'text',
  fullWidth = false,
  elevation = 0,
  fontSize = 18,
  subFontSize = 16,
  color = 'primary',
  outlinedBG = 'white',
  radius = 40,
  p = 12,
  loading,
  loadingSize = 24,
  textProps,
  ...rest
}) {
  const theme = useTheme();

  return (
    <ButtonBox
      onPress={loading ? undefined : onPress}
      style={shadow(variant == 'text' ? 0 : elevation)}
      borderRadius={radius}
      py={variant == 'outlined' ? p - 2 : p}
      px={variant == 'outlined' ? p * 2 - 2 : p * 2}
      bg={
        variant == 'contained'
          ? color
          : variant == 'outlined' && elevation
          ? outlinedBG
          : null
      }
      borderColor={color}
      borderWidth={variant == 'outlined' ? 2 : 0}
      alignSelf={fullWidth ? 'stretch' : 'flex-start'}
      {...rest}>
      {loading ? (
        <Loading
          isVisible
          type="Wave"
          size={loadingSize}
          color={variant == 'contained' ? 'white' : theme.colors.primary}
        />
      ) : (
        <>
          <TextBox
            textAlign={textAlign}
            color={variant == 'contained' ? 'white' : color}
            fontSize={fontSize}
            {...textProps}>
            {children}
          </TextBox>
          {subText ? (
            <TextBox
              textAlign={textAlign}
              color={variant == 'contained' ? 'white' : color}
              fontSize={subFontSize}>
              {subText}
            </TextBox>
          ) : null}
        </>
      )}
    </ButtonBox>
  );
}
