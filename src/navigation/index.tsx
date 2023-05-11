import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WeatherDashboardNavigator from './weatherDashboardNavigator';
import WeatherSearchNavigator from './weatherSearchNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from './routes';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationHelpers';
import Screens from '../modules';
import colors from '../assets/colors';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarActiveTintColor: colors.activeButton,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          alignSelf: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
        },
      }}>
      <Tab.Screen
        options={{
          headerTitle: 'Weather Dashboard',
          title: 'Dasboard',
        }}
        name={ROUTES.WEATHERDASHBOARDNAVIGATOR}
        component={WeatherDashboardNavigator}
      />
      <Tab.Screen
        options={{
          title: 'City Weather',
          headerTitle: 'Search City Weather',
        }}
        name={ROUTES.WEATHERSEARCHNAVIGATOR}
        component={WeatherSearchNavigator}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{headerShown: false}}
          name={ROUTES.LOGIN}
          component={Screens.login}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name={ROUTES.DASHBOARD}
          component={BottomTabs}
        />
        <RootStack.Screen
          name={ROUTES.WEATHERDETAILS}
          component={Screens.weatherDetails}
          options={{
            headerLeftLabelVisible: false,
            title: 'Weather Detail',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
