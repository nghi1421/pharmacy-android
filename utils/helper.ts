import { ToastAndroid } from "react-native";
import { Customer } from "../types/User";
import AsyncStorage from '@react-native-async-storage/async-storage';

const setCustomer = async (customer: Customer) => {
    try {
        await AsyncStorage.setItem('customer', JSON.stringify(customer));
    } catch (error) {
        console.log('error async storage', error)
    }
}

const getCustomer = async () => {
    try {
        const jsonValue  = await AsyncStorage.getItem('customer');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log('error async storage', error)
    }
}

const removeCustomer = async () => {
    await AsyncStorage.removeItem('customer')
}

const setOtp = async (otp: string) => {
    try {
        await AsyncStorage.setItem('otp', otp);
    } catch (error) {
        console.log('error async storage', error)
    }
}

const getOtp = async () => {
    try {
        const value  = await AsyncStorage.getItem('otp');
        return value != null ? value : null;
    } catch (error) {
        console.log('error async storage', error)
    }
}

const setDeviceToken = async (token: string) => {
    await AsyncStorage.setItem('deviceToken', token);
}

const getDeviceToken = async () => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    return deviceToken;
}

const shortToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
}

export {
    setCustomer,
    getCustomer,
    setOtp,
    getOtp,
    removeCustomer,
    setDeviceToken,
    getDeviceToken,
    shortToast
}