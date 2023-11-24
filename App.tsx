import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export type AuthType = {
  isAuthenticated: boolean
  logIn: () => void
  logOut: () => void
}

export const AuthContext = React.createContext<AuthType>({
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const logIn = () => setIsAuthenticated(true);
  const logOut = () => setIsAuthenticated(false);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('My token:' , token);
  }

  React.useEffect(() => {
    requestUserPermission()
    getToken()

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {
            !isAuthenticated
              ?
              <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="login" component={LoginScreen} />
                      <Stack.Screen name="signin" component={SignUpScreen} />
              </Stack.Navigator>
              :
              <Stack.Navigator initialRouteName='main' screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="main" component={MainScreen} />
              </Stack.Navigator>
            }
              {/* <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
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
            </Stack.Navigator> */}
        </QueryClientProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;