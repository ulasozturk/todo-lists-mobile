import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} {...props}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </Svg>
);

export default SvgComponent;
