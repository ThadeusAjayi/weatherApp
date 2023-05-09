import React from 'react';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>();
