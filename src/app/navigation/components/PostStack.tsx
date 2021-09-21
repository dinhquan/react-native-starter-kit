import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../Routes';
import PostScreen from 'app/screens/post/PostScreen';

function PostStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.Post} component={PostScreen} />
    </Stack.Navigator>
  );
}

export default PostStack;
