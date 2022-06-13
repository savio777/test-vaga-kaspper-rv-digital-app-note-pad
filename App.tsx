import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './src/NotesHooks';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="pink" barStyle="dark-content" />
      <AppProvider>
        <View style={{flex: 1, backgroundColor: 'pink'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
}
