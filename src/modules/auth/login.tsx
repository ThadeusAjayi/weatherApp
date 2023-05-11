import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import globalstyles from '../../styles/globalstyles';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {useTranslation} from 'react-i18next';
import {navigationRef} from '../../navigation/navigationHelpers';
import routes from '../../navigation/routes';
import {useLanguageContext} from '../../localization/useLanguage';
import {login} from '../../redux/auth/authSlice';
import {useAppDispatch} from '../../redux/store';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';
import {CommonActions} from '@react-navigation/native';
import colors from '../../assets/colors';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {auth, authStatus} = useSelector((state: RootState) => state.auth);
  const {setLanguage, language} = useLanguageContext();

  useEffect(() => {
    if (auth?.email) {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: routes.DASHBOARD}],
        }),
      );
    }
  }, [auth]);

  return (
    <SafeAreaView style={globalstyles.safeAreaViewStyle}>
      <View style={styles.switchWrap}>
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
      <View style={[globalstyles.backgroundStyle, styles.centerLayout]}>
        <CustomText style={[globalstyles.headerFont, styles.welcomeText]}>
          {t('login.welcome')}
        </CustomText>
        <CustomInput
          validation="email"
          hasError={setIsEmailError}
          props={{
            onChangeText: setEmail,
            value: email,
            placeholder: t('login.emailPlaceholder'),
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
        />
        <CustomInput
          validation={'password'}
          hasError={setIsPasswordError}
          props={{
            onChangeText: setPassword,
            value: password,
            placeholder: t('login.passwordPlaceholder'),
            secureTextEntry: true,
          }}
        />
        {authStatus === 'loading' ? (
          <ActivityIndicator color={colors.activeButton} />
        ) : (
          <CustomButton
            disable={isPasswordError || isEmailError}
            title={t('login.button')}
            onClick={() => dispatch(login({email}))}
          />
        )}
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
