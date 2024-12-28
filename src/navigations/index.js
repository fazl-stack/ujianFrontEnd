import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Home from '../screen/Home';
import AddDusun from '../screen/AddDusun';
import EditDusun from '../screen/EditDusun';
import Profile from '../screen/Profile';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, initialRouteName: 'Login'}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AddDusun" component={AddDusun} />
      <Stack.Screen name="EditDusun" component={EditDusun} />
    </Stack.Navigator>
  );
}

export default function Navigations() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
