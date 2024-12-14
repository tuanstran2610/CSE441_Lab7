/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Customer from './components/Customer/Customer';
import AddCustomer from './components/Customer/AddCustomer';
import Transaction from './components/Transaction/Transaction';
import Home from './components/Home/Home';
import Settings from './components/Settings';
import DetailTransaction from './components/Transaction/DetailTransaction';
import AddServiceScreen from './components/Home/AddService';
import UpdateServiceScreen from './components/Home/UpdateService';
import DetailServiceScreen from './components/Home/DetailService';
import {MenuProvider} from 'react-native-popup-menu';
import Login from './components/Login';
import DetailCustomer from './components/Customer/DetailCustomer';
import UpdateCustomer from './components/Customer/UpdateCustomer';
import AddTransaction from './components/Transaction/AddTransaction';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tạo TransactionStack riêng
const TransactionStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TransactionList" component={Transaction} />
      <Stack.Screen name="DetailTransaction" component={DetailTransaction} />
      <Stack.Screen name="AddTransaction" component={AddTransaction} />
    </Stack.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerList" component={Customer} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="DetailCustomer" component={DetailCustomer} />
      <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <MenuProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={AddServiceScreen} />
        <Stack.Screen name="Update" component={UpdateServiceScreen} />
        <Stack.Screen name="Detail" component={DetailServiceScreen} />
      </Stack.Navigator>
    </MenuProvider>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Transaction':
              iconName = 'receipt';
              break;
            case 'Customer':
              iconName = 'people';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F06B7A',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Transaction" component={TransactionStack} />
      <Tab.Screen name="Customer" component={CustomerStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
