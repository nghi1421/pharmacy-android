import { useMutation, useQuery } from "react-query"
import axiosClient from "../utils/axios"
import { LOGIN_URL, SIGN_IN_CUSTOMER_URL, VERIFY_EMAIL_URL } from "../utils/constants"
import { VerifyEmailForm } from "../screens/SignUpScreen"
import { CreateCustomerForm } from "../screens/SignUpForm"
import { useContext } from "react"
import { AuthContext } from "../App"
import { LoginForm } from "../screens/LoginScreen"
import { UseFormSetError } from "react-hook-form"

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

const useVerifyPhoneNumber = (setError: UseFormSetError<any>) => {
    const { setCustomer } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data: VerifyEmailForm) => {
            return await axiosClient
                .post(VERIFY_EMAIL_URL, data)
                .then(async (response) => {
                    if (response.data.data) {
                        setCustomer(response.data.data)
                        return response.data.otpCode
                    }
                    setCustomer(null)
                    return response.data.otpCode

                })
                .catch(error => {
                    if (error.response.data.errorMessage) {
                        setError('email', { type: 'custom', message: error.response.data.errorMessage })
                    }
                })
        }
    })
}

const useLogin = (setError: UseFormSetError<any>) => {
    const { logIn, setCustomer } = useContext(AuthContext)
    return useMutation({
        mutationFn: async (data: LoginForm) => {
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
                    if (error.response.data.errorMessage) {
                        setError('password', { type: 'custom', message: error.response.data.errorMessage })
                    }
                })
        }
    })
}

export {
    useSignUp,
    useVerifyPhoneNumber,
    useLogin
}