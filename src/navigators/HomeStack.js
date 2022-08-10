import React from "react";
import Settings from "../screens/mainPages/Settings";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SupplierStack from "./SupplierStack";
import OrderStack from "./OrderStack";
const Tab = createBottomTabNavigator();

export default function HomeStack(){
    
    return ( 
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'MainPage') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'home'
                        : 'home-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Settings') {
                return (
                  <Ionicons
                    name={focused ? 'settings-sharp' : 'settings-outline'}
                    size={size}
                    color={color}
                  />
                );
              }else if (route.name === 'Supplier') {
                return (
                  <Ionicons
                    name={focused ? 'person-sharp' : 'person-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            headerShown:false,
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: '#34BE82',
          })}>
          <Tab.Screen name="MainPage" component={OrderStack} />
          <Tab.Screen name="Supplier" component={SupplierStack} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
     )
}