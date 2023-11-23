import { useMutation, useQuery } from "react-query"
import axiosClient from "../utils/axios"
import { SIGN_IN_CUSTOMER_URL, VERIFY_PHONE_NUMBER_URL } from "../utils/constants"
import { VerifyPhoneNumberForm } from "../screens/SignUpScreen"
import { Alert } from "react-native"
import axios from "axios"

const useSignIn = () => {
    return useMutation({
        mutationFn: () => axiosClient
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
            .then((response) => {
                Alert.alert(JSON.stringify(response.data.otpCode))
                if (response.data.message) {
                    return response.data.data
                }
                return response
            })
            .catch(error => {
                console.log()
            })}
        })
}

const useTest = () => {

  return useQuery({
    queryFn: () => axios
      .get('http://192.168.1.27:3000/api/test-api')
      .then((response)=> {
        return response.data
      }),
  })
};
export {
    useSignIn,
    useVerifyPhoneNumber,
    useTest
}