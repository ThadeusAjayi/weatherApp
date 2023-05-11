import React, {useEffect} from 'react';
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
import {useLanguageContext} from '../localization/useLanguage';

type Props = {
  style?: StyleProp<TextStyle>;
  props?: TextInputProps;
  validation?: Validation;
  hasError?: (err: boolean) => any;
};

export default ({style, props, validation, hasError}: Props) => {
  const {errorMessage} = useValidation(props?.value!, validation);
  const {ltrRlt} = useLanguageContext();

  useEffect(() => {
    hasError?.(errorMessage.length > 0);
  }, [errorMessage, hasError]);

  const dirStyle = StyleSheet.create({
    ltrRlt: {
      textAlign: ltrRlt === 'ltr' ? 'left' : 'right',
    },
  });

  return (
    <View style={{direction: ltrRlt}}>
      <TextInput
        style={[globalstyles.inputStyle, dirStyle.ltrRlt, style]}
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
