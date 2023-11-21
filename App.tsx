import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';
import { SettingScreen } from './screens/SettingScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isAuthenticated = React.useState<boolean>(true)
  return (
    <NavigationContainer>
      {
        isAuthenticated 
          ?
          <Stack.Navigator initialRouteName='main' screenOptions={{headerShown: false, }}>
            <Stack.Screen name="main" component={MainScreen} />
          </Stack.Navigator>
          :
          <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signin" component={SignUpScreen} />
          </Stack.Navigator>
      }
     
    </NavigationContainer>
  );
}

export default App;