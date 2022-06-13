import React from 'react';
import {ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useNotes} from './NotesHooks/Notes';
import {ListNotes, AddNote} from './screens';
import colors from './utils/colors';

const Stack = createNativeStackNavigator();

export default () => {
  const {loading} = useNotes();

  if (loading) {
    return <ActivityIndicator color={colors.black} />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ListNotes" component={ListNotes} />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        initialParams={{id: null}}
      />
    </Stack.Navigator>
  );
};
