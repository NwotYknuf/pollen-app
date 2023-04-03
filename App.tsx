import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './components/screen/main-screen';
import { useColorScheme } from 'react-native';
import { theme } from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: 'Pollen forecast',
            statusBarStyle: 'light',
            statusBarColor: '#000000',
            headerTintColor: theme.lightest,
            headerStyle: {
              backgroundColor: theme.darker,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
