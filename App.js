import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MainTabNavConfigs from './navigations/MainTabNavigation'
import {NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import store from './store/store'
import {persistor} from './store/store'
export default function App() {
  return (
    <Provider store ={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainTabNavConfigs/>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});