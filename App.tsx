import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Screens/Home';
import { Camera } from './Screens/Camera';
import { Scanner } from './Screens/Scanner';
import { QRcode } from './Screens/QRcode';

const { Screen, Navigator, Group } = createNativeStackNavigator();
export const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Group>
          <Screen name='Home' component={Home} options={{ headerShown: false }} />
        </Group>
        <Group screenOptions={{ presentation: 'modal' }} >
          <Screen
            name='Camera'
            component={Camera}
            options={{ headerShown: false }} />
          <Screen
            name='Scanner'
            component={Scanner}
            options={{ headerShown: false }}
          />
          <Screen
            name='QRcode'
            component={QRcode}
            options={{ headerShown: false }}
          />
        </Group>
      </Navigator>
    </NavigationContainer>
  );
};