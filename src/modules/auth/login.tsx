import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import CustomInput from '../../components/CustomInput';
import globalstyles from '../../styles/globalstyles';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {useTranslation} from 'react-i18next';
import {navigationRef} from '../../navigation/navigationHelpers';
import routes from '../../navigation/routes';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');

  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={globalstyles.safeAreaViewStyle}>
      <View style={styles.switchWrap}>
        <CustomText style={styles.language}>En</CustomText>
        <Switch
          value={language !== 'en'}
          onValueChange={() => {
            i18n.changeLanguage(language === 'en' ? 'ar' : 'en');
            setLanguage(language === 'en' ? 'ar' : 'en');
          }}
          style={styles.switch}
        />
        <CustomText style={styles.language}>Ar</CustomText>
      </View>
      <View style={[globalstyles.backgroundStyle, styles.centerLayout]}>
        <CustomText style={[globalstyles.headerFont, styles.welcomeText]}>
          {t('login.welcome')}
        </CustomText>
        <CustomInput
          validation="email"
          props={{
            onChangeText: setEmail,
            value: email,
            placeholder: t('login.emailPlaceholder'),
          }}
        />
        <CustomInput
          validation={'password'}
          props={{
            onChangeText: setPassword,
            value: password,
            placeholder: t('login.passwordPlaceholder'),
          }}
        />
        <CustomButton
          title={t('login.button')}
          onClick={() => navigationRef.current?.navigate(routes.DASHBOARD)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchWrap: {
    alignSelf: 'flex-end',
    top: 40,
    right: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  language: {marginBottom: 0},
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    marginHorizontal: 10,
    zIndex: 1,
  },
  centerLayout: {
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
  },
});
