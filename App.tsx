import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import { Alert, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setDeviceToken } from './utils/helper';
import { Customer } from './types/User';
import { DetailScreen } from './screens/DetailScreen';
import SignUpScreen from './screens/SignUpScreen';
import { UpdateProfileScreen } from './screens/UpdateProfileScreen';
import { ChangePasswordScreen } from './screens/ChangePasswordScreen';
import ForgotPassworSreen from './screens/ForgotPasswordScreen';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export type AuthType = {
  isAuthenticated: boolean
  logIn: () => void
  logOut: () => void
  customer: null | Customer
  setCustomer: (c: Customer | null) => void
  roomId: null | number
  setRoomId: (c: number | null) => void
}

export const AuthContext = React.createContext<AuthType>({
  isAuthenticated: false,
  logIn: () => { },
  logOut: () => { },
  roomId: null,
  setRoomId: () => { },
  customer: null,
  setCustomer: (c: Customer | null) => { }
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [roomId, setRoomId] = React.useState<number | null>(null);
  const logIn = () => setIsAuthenticated(true);
  const logOut = () => {
    setIsAuthenticated(false)
    setCustomer(null)
    setRoomId(null)
  };

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
    setDeviceToken(token);
    console.log('My token:', token);
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
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut, customer, setCustomer, roomId, setRoomId }}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {
            !isAuthenticated
              ?
              <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="signin" component={SignUpScreen} />
                <Stack.Screen name="forgot-password" component={ForgotPassworSreen} />
              </Stack.Navigator>
              :
              <Stack.Navigator initialRouteName='main' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="main" component={MainScreen} />
                <Stack.Screen name="detail" component={DetailScreen} />
                <Stack.Screen name="change-password" component={ChangePasswordScreen} />
                <Stack.Screen name="update-profile" component={UpdateProfileScreen} />
              </Stack.Navigator>
          }
        </QueryClientProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;