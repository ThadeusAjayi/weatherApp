import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../modules';
import ROUTES from './routes';

const Stack = createStackNavigator();

export default function WeatherSearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.WEATHERSEARCH}
        options={{title: 'Weather Search'}}
        component={Screens.weatherSearch}
      />
    </Stack.Navigator>
  );
}
