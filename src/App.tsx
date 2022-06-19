import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { RootNavigator } from './navigation';
import { theme } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.black}
      />
      <RootNavigator />
    </View>
  );
};

export default App;
