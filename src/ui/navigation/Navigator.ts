import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

const Navigator = {
  navigate(route: string, params?: Record<string, unknown>) {
    navigationRef.current?.navigate(route, params);
  },
};

export default Navigator;
