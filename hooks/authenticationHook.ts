import { useMutation, useQuery } from "react-query"
import axiosClient from "../utils/axios"
import { SIGN_IN_CUSTOMER_URL, VERIFY_PHONE_NUMBER_URL } from "../utils/constants"
import { VerifyPhoneNumberForm } from "../screens/SignUpScreen"
import { removeCustomer, setCustomer } from "../utils/helper"
import { SignUpExistDataForm } from "../screens/SignUpExistsData"
import { CreateCustomerForm } from "../screens/SignUpForm"

const useSignIn = () => {
    return useMutation({
        mutationFn: (data: SignUpExistDataForm| CreateCustomerForm) => axiosClient
            .post(`${SIGN_IN_CUSTOMER_URL}`)
            .then((response) => {
                if (response.data.message) {
                    return response.data.data
                }
                return undefined
            })
        })
}

const useVerifyPhoneNumber = () => {
    return useMutation({
        mutationFn: async (data: VerifyPhoneNumberForm) =>{
           return await axiosClient
            .post(VERIFY_PHONE_NUMBER_URL, data)
            .then(async (response) => {
                if (response.data.data) {
                    setCustomer(response.data.data)
                    return response.data.otpCode
                }
                removeCustomer()
                return response.data.otpCode
            })
            .catch(error => {
                console.log(error)
            })}
        })
}



export {
    useSignIn,
    useVerifyPhoneNumber,
}