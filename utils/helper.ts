import { ToastAndroid } from "react-native";
import { Customer } from "../types/User";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomValidate } from "../types/CustomValidate";
import { UseFormSetError } from "react-hook-form";

const setCustomer = async (customer: Customer) => {
    try {
        await AsyncStorage.setItem('customer', JSON.stringify(customer));
    } catch (error) {
        console.log('error async storage', error)
    }
}

const setTest = async () => {
    try {
        await AsyncStorage.setItem('test', JSON.stringify([1, 2, 3, 4, 5, 5]));
    }
    catch (error) {
        console.log('error async storage', error)
    }
}
const getTest = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('test');
        console.log('Here is your value::::', jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log('error async storage', error)
    }
}

const getCustomer = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('customer');
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
        const value = await AsyncStorage.getItem('otp');
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

const handleValidate = (validateErrors: CustomValidate[], setError: UseFormSetError<any>) => {
    validateErrors.forEach((validate: any) => {
        setError(validate.key, { type: 'custom', message: validate.value[0] })
    })
}

export {
    setCustomer,
    getCustomer,
    getTest,
    setTest,
    setOtp,
    getOtp,
    removeCustomer,
    setDeviceToken,
    getDeviceToken,
    shortToast,
    handleValidate
}