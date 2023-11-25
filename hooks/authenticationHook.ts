import { useMutation, useQuery } from "react-query"
import axiosClient from "../utils/axios"
import { LOGIN_URL, SIGN_IN_CUSTOMER_URL, VERIFY_PHONE_NUMBER_URL } from "../utils/constants"
import { VerifyPhoneNumberForm } from "../screens/SignUpScreen"
import { CreateCustomerForm } from "../screens/SignUpForm"
import { useContext } from "react"
import { AuthContext } from "../App"
import { LoginForm } from "../screens/LoginScreen"

const useSignUp = () => {
    const { logIn } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data: CreateCustomerForm) => await axiosClient
            .post(`${SIGN_IN_CUSTOMER_URL}`, data)
            .then((response) => {
                if (response.data.message) {
                    logIn()
                }
                else {
                    
                }
                return response
            })
        })
}

const useVerifyPhoneNumber = () => {
    const {  setCustomer } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data: VerifyPhoneNumberForm) =>{
           return await axiosClient
            .post(VERIFY_PHONE_NUMBER_URL, data)
            .then(async (response) => {
                if (response.data.data) {
                    setCustomer(response.data.data.customer)
                    return response.data.otpCode
                }
                setCustomer(null)
                return response.data.otpCode
            })
            .catch(error => {
                console.log(error)
            })}
        })
}

const useLogin = () => {
    const { logIn, setCustomer } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data: LoginForm) =>{
           return await axiosClient
            .post(LOGIN_URL, data)
            .then(async (response) => {
                if (response.data.message) {
                    setCustomer(response.data.data.customer)
                    logIn()
                    return;
                }
                setCustomer(null)
                return response.data
            })
            .catch(error => {
                console.log(error)
            })}
        })
}

export {
    useSignUp,
    useVerifyPhoneNumber,
    useLogin
}