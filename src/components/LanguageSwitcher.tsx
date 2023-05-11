import React from 'react';
import {StyleProp, StyleSheet, Switch, View, ViewStyle} from 'react-native';
import {useLanguageContext} from '../localization/useLanguage';
import CustomText from './CustomText';

export default ({switchWrap}: {switchWrap?: StyleProp<ViewStyle>}) => {
  const {ltrRlt, setLanguage, language} = useLanguageContext();
  const alignText = StyleSheet.create({
    ltr: {alignSelf: ltrRlt === 'ltr' ? 'flex-start' : 'flex-end'},
  });
  return (
    <View style={[styles.switchWrap, alignText.ltr, switchWrap]}>
      <CustomText style={styles.language}>EN</CustomText>
      <Switch
        value={language !== 'en'}
        onValueChange={() => {
          setLanguage(language === 'en' ? 'ar' : 'en');
        }}
        style={styles.switch}
      />
      <CustomText style={styles.language}>في</CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  switchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    alignSelf: 'flex-end',
  },
  language: {marginBottom: 0},
  switch: {
    transform: [{scaleX: 0.5}, {scaleY: 0.5}],
    marginHorizontal: 10,
    zIndex: 1,
  },
});
