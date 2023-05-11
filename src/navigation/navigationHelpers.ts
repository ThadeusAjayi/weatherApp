import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {CityWeatherType} from '../redux/dataTypes';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export type RootStackParamList = {
  LOGIN: undefined;
  TABS: undefined;
  DASHBOARD: undefined;
  WEATHERDASHBOARDNAVIGATOR: undefined;
  WEATHERDASHBOARD: undefined;
  WEATHERSEARCHNAVIGATOR: undefined;
  WEATHERSEARCH: undefined;
  WEATHERDETAILS: CityWeatherType;
};
