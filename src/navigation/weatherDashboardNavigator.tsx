import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../modules';
import {RootStackParamList} from './navigationHelpers';

const Stack = createStackNavigator<RootStackParamList>();

export default function WeatherDashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'WEATHERDASHBOARD'}
        options={{headerTitle: 'Weather Dashboard'}}
        component={Screens.weatherDashboard}
      />
    </Stack.Navigator>
  );
}
