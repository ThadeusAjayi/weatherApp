import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WeatherDetails from '../modules/weatherDetails';
import ROUTES from './routes';
import Screens from '../modules';

const Stack = createStackNavigator();

export default function WeatherDashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerLeft: () => null}}>
      <Stack.Screen
        name={ROUTES.WEATHERDASHBOARD}
        options={{headerTitle: 'Weather Dashboard'}}
        component={Screens.weatherDashboard}
      />
      <Stack.Screen name={ROUTES.WEATHERDETAILS} component={WeatherDetails} />
    </Stack.Navigator>
  );
}
