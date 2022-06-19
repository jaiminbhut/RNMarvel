import { NAVIGATION } from '@/constants';
import { navigationRef } from '@/navigation/NavigationRef';
import { CharacterDetails, Favorites, Search } from '@/screens';
import { Characters } from '@/screens/Characters/Characters';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const RootStack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName={NAVIGATION.characters}>
        <RootStack.Screen
          options={{ headerShown: false }}
          name={NAVIGATION.characters}
          component={Characters}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name={NAVIGATION.favorites}
          component={Favorites}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name={NAVIGATION.search}
          component={Search}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name={NAVIGATION.characterDetails}
          component={CharacterDetails}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
