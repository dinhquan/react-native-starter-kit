import {
  BottomTabBarOptions,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FontIcon from 'ui/components/base/FontIcon';
import Color from 'ui/theme/Color';
import {t, T} from 'ui/theme/Localization';
import {navigationRef} from '../Navigator';
import Routes from '../Routes';
import PostStack from './PostStack';
import UserStack from './UserStack';

function RootView() {
  const Tab = createBottomTabNavigator();
  const options = tabItemOptions();

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator tabBarOptions={TAB_BAR_OPTIONS}>
        <Tab.Screen name={Routes.PostStack} component={PostStack} options={options.post} />
        <Tab.Screen name={Routes.UserStack} component={UserStack} options={options.user} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const TAB_BAR_OPTIONS: BottomTabBarOptions = {
  activeTintColor: Color.Theme,
};

function tabItemOptions(): Record<string, BottomTabNavigationOptions> {
  return {
    post: {
      tabBarLabel: t(T.post),
      tabBarIcon: ({color, size}) => (
        <FontIcon title="" font="MaterialIcons" color={color} size={24} />
      ),
    },
    user: {
      tabBarLabel: t(T.user),
      tabBarIcon: ({color, size}) => (
        <FontIcon title="" font="FontAwesome" color={color} size={24} />
      ),
    },
  };
}

export default RootView;
