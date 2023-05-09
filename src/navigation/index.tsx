import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WeatherDashboardNavigator from './weatherDashboardNavigator';
import WeatherSearchNavigator from './weatherSearchNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from './routes';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationHelpers';
import Screens from '../modules';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name={ROUTES.WEATHERDASHBOARDNAVIGATOR}
        component={WeatherDashboardNavigator}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={ROUTES.WEATHERSEARCHNAVIGATOR}
        component={WeatherSearchNavigator}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name={ROUTES.LOGIN} component={Screens.login} />
        <RootStack.Screen name={ROUTES.DASHBOARD} component={BottomTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
