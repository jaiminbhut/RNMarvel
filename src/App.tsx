import { persistor, store } from '@/store';
import React from 'react';
import { LogBox, StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingView } from './components';
import { Reactotron } from './config';
import { RootNavigator } from './navigation';
import { theme } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  LogBox.ignoreAllLogs(true);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.black}
          />
          <RootNavigator />
          <LoadingView />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

// @ts-ignore
export default __DEV__ ? Reactotron.overlay(App) : App;
