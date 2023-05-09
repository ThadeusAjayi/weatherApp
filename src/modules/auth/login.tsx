import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomInput from '../../components/CustomInput';
import globalstyles from '../../styles/globalstyles';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={globalstyles.safeAreaViewStyle}>
      <View style={[globalstyles.backgroundStyle, styles.centerLayout]}>
        <CustomText style={[globalstyles.headerFont, styles.welcomeText]}>
          Welcome to the Weather App
        </CustomText>
        <CustomInput
          validation="email"
          props={{onChangeText: setEmail, value: email, placeholder: 'Email'}}
        />
        <CustomInput
          validation={'password'}
          props={{
            onChangeText: setPassword,
            value: password,
            placeholder: 'Password',
          }}
        />
        <CustomButton title="Login" onClick={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerLayout: {
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
  },
});
