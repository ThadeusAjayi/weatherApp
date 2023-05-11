import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import globalstyles from '../styles/globalstyles';

type Props = {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  numberOfLines?: number;
};

export default ({children, style, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={true}
      style={[globalstyles.textStyle, style]}>
      {children}
    </Text>
  );
};
