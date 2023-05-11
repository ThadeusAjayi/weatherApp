import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../modules';
import {RootStackParamList} from './navigationHelpers';

const Stack = createStackNavigator<RootStackParamList>();

export default function WeatherSearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'WEATHERSEARCH'}
        options={{title: 'Weather Search'}}
        component={Screens.weatherSearch}
      />
    </Stack.Navigator>
  );
}
