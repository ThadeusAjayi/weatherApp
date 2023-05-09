import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import globalstyles from '../styles/globalstyles';
import colors from '../assets/colors';
import useValidation, {Validation} from '../hooks/useValidation';
import CustomText from './CustomText';

type Props = {
  style?: StyleProp<TextStyle>;
  props?: TextInputProps;
  validation?: Validation;
};

export default ({style, props, validation}: Props) => {
  const {errorMessage} = useValidation(props?.value!, validation);
  return (
    <View>
      <TextInput
        style={[globalstyles.inputStyle, style]}
        placeholderTextColor={colors.placeHolderTextColor}
        {...props}
      />
      <CustomText
        style={[
          globalstyles.errorTextStyle,
          errorMessage ? styles.error : styles.noError,
        ]}>
        {errorMessage}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {top: -18},
  noError: {},
});
