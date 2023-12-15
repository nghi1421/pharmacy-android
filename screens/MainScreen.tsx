import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HistoryScreen } from './HistoryScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingScreen } from './SettingScreen';
import { ChatScreen } from './ChatScreen';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator >
            <Tab.Screen
                name="Lịch sử mua hàng"
                component={HistoryScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'rgb(14 165 233)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        justifyContent: 'center'
                    },
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialCommunityIcons
                                name="cart"
                                size={24}
                                color={tabInfo.focused ? "rgb(14 165 233)" : "#8e8e93"}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="Chăm sóc khách hàng"
                component={ChatScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'rgb(14 165 233)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        justifyContent: 'center'
                    },
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialCommunityIcons
                                name="cart"
                                size={24}
                                color={tabInfo.focused ? "rgb(14 165 233)" : "#8e8e93"}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="Thiết lập"
                component={SettingScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'rgb(14 165 233)',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        justifyContent: 'center'
                    },
                    tabBarIcon: (tabInfo) => {
                        return (
                            <Ionicons
                                name="md-person-circle-outline"
                                size={24}
                                color={tabInfo.focused ? "rgb(14 165 233)" : "#8e8e93"}
                            />
                        );
                    }
                }}
            />
        </Tab.Navigator>
    )
}