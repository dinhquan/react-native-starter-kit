import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../Routes';
import UserScreen from 'app/screens/user/UserScreen';

function UserStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.User} component={UserScreen} />
    </Stack.Navigator>
  );
}

export default UserStack;
