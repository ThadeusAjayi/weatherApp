import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import globalstyles from '../styles/globalstyles';

type Props = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export default ({children, style}: Props) => {
  return <Text style={[globalstyles.textStyle, style]}>{children}</Text>;
};
