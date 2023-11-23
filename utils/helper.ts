import { Customer } from "../types/User";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default {
    setCustomer, getCustomer
}