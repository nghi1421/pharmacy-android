import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
         {
          isAuthenticated 
            ?
              <Stack.Screen name="main" component={MainScreen} />
            :
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="signin" component={SignUpScreen} />
            </>
        }
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;