import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WeatherDashboardNavigator from './weatherDashboardNavigator';
import WeatherSearchNavigator from './weatherSearchNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList, navigationRef} from './navigationHelpers';
import Screens from '../modules';
import colors from '../assets/colors';
import {useTranslation} from 'react-i18next';
import {LanguageProvider} from '../localization/useLanguage';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator<RootStackParamList>();

export function BottomTabs() {
  const {t} = useTranslation();
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
          headerTitle: t('navigation.tabs.dashboard.headerTitle'),
          title: t('navigation.tabs.dashboard.title'),
        }}
        name={'WEATHERDASHBOARDNAVIGATOR'}
        component={WeatherDashboardNavigator}
      />
      <Tab.Screen
        options={{
          headerTitle: t('navigation.tabs.search.headerTitle'),
          title: t('navigation.tabs.search.title'),
        }}
        name={'WEATHERSEARCHNAVIGATOR'}
        component={WeatherSearchNavigator}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const {t} = useTranslation();
  return (
    <NavigationContainer ref={navigationRef}>
      <LanguageProvider>
        <RootStack.Navigator>
          <RootStack.Screen
            options={{headerShown: false}}
            name={'LOGIN'}
            component={Screens.login}
          />
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name={'DASHBOARD'}
            component={BottomTabs}
          />
          <RootStack.Screen
            name={'WEATHERDETAILS'}
            component={Screens.weatherDetails}
            options={{
              headerLeftLabelVisible: false,
              title: t('navigation.weatherDetail'),
            }}
          />
        </RootStack.Navigator>
      </LanguageProvider>
    </NavigationContainer>
  );
}
