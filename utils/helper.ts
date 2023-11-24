import { Customer } from "../types/User";
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('AsyncStorage:', AsyncStorage);

const setCustomer = async (customer: Customer) => {
    try {
        await AsyncStorage.setItem('customer', JSON.stringify(customer));
    } catch (error) {
        console.log(error)
    }
}

const getCustomer = async () => {
    try {
        const jsonValue  = await AsyncStorage.getItem('customer');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(error)
    }
}

const setOtp = async (otp: string) => {
    try {
        await AsyncStorage.setItem('otp', otp);
    } catch (error) {
        console.log(error)
    }
}

const getOtp = async () => {
    try {
        const value  = await AsyncStorage.getItem('otp');
        return value != null ? value : null;
    } catch (error) {
        console.log(error)
    }
}

export {
    setCustomer, getCustomer, setOtp, getOtp
}