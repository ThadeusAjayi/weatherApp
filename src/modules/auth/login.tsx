import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import routes from '../../navigation/routes';
import {navigationRef} from '../../navigation/navigationHelpers';

export default () => {
  return (
    <SafeAreaView>
      <Text>Login Screen</Text>
      <Button
        title="Login"
        onPress={() => navigationRef.current?.navigate(routes.DASHBOARD)}
      />
    </SafeAreaView>
  );
};
