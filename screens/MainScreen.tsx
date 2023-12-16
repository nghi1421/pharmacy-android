import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HistoryScreen } from './HistoryScreen';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingScreen } from './SettingScreen';
import { ChatScreen } from './ChatScreen';
import { HomePage } from './HomePage';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Trang chủ"
                component={HomePage}
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
                            <FontAwesome
                                name="home"
                                size={24}
                                color={tabInfo.focused ? "rgb(14 165 233)" : "#8e8e93"}
                            />
                        );
                    }
                }}
            />
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
                name="Tư vấn"
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
                            <AntDesign
                                name="customerservice"
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