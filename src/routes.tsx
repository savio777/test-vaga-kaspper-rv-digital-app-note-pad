import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ListNotes} from './screens';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ListNotes" component={ListNotes} />
  </Stack.Navigator>
);
