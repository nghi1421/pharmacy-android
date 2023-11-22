import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Detail } from './Detail';
import { HistoryScreen } from './HistoryScreen';
import { Ionicons } from '@expo/vector-icons';
  
const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false }}>
            <Tab.Screen
                name="Lịch sử mua hàng"
                component={HistoryScreen}
                options={{ 
                    tabBarIcon: (tabInfo) => {
                        return ( 
                            <Ionicons 
                                name="md-home"
                                size={24} 
                                color={tabInfo.focused ? "#006600" : "#8e8e93"} 
                            /> 
                    );}
                 }}
            />
            <Tab.Screen
                name="Thiết lập"
                component={Detail}
                options={{ 
                    tabBarIcon: (tabInfo) => {
                        return ( 
                            <Ionicons 
                                name="md-person-circle-outline"
                                size={24} 
                                color={tabInfo.focused ? "#006600" : "#8e8e93"} 
                            /> 
                    );}
                 }}
            />
        </Tab.Navigator>
    )
}