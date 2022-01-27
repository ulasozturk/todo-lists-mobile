import styled from 'styled-components';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system';

export const Box = styled(View)(
  props => ({
    flexDirection: props.row ? 'row' : 'column',
    justifyContent: props.center || props.justifyCenter ? 'center' : undefined,
    alignItems: props.center || props.alignCenter ? 'center' : undefined,
  }),
  compose(border, color, flexbox, layout, position, space),
);

export const TextBox = styled(Text)(
  compose(border, color, flexbox, layout, position, shadow, space, typography),
);

export const ButtonBox = styled(TouchableOpacity)(
  compose(layout, color, space, flexbox, position, border),
);

export const TextInputBox = styled(TextInput)(
  compose(layout, color, space, typography, border),
);
