import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import workitem from './Workitem'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Workitem"
          component={workitem}
          options={{ title: 'Welcome' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack