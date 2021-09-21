import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from 'app/navigation/Routes';
import PostScreen from 'app/components/post/PostScreen';

function PostStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.Post} component={PostScreen} />
    </Stack.Navigator>
  );
}

export default PostStack;
