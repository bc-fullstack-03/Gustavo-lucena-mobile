import React, { useContext, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider, Context as AuthContext} from "./src/context/AuthContext"

import Login from './src/Screens/Login';
import SingUp from './src/Screens/SingUp';
import Home from './src/Screens/Home';
import Frineds from './src/Screens/Friends';
import Profile from './src/Screens/Profile';
import { THEME } from './src/theme';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter"
import Loading from './src/components/Loading';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUNG_900,
  }
}

function App() {
  const { token, tryLocalLogin, isLoading } = useContext(AuthContext);
  
  const[fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    tryLocalLogin();
  },[])

  if(!fontsLoaded || isLoading) {
    return <Loading/>
  }

  return (
    <NavigationContainer theme={AppTheme}>
      {!token ? (
        <Stack.Navigator screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SingUp" component={SingUp} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name='Home' component={Home} ></Tab.Screen>
          <Tab.Screen name='Frineds' component={Frineds} ></Tab.Screen>
          <Tab.Screen name='Profile' component={Profile} ></Tab.Screen>
        </Tab.Navigator>
      )
      }
    </NavigationContainer>
  );
}

export default () => {
  return(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};