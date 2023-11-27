import { useContext } from "react"
import axiosClient from "../utils/axios"
import { CHECK_SEND_OTP_URL, UPDATE_PROFILE_URL } from "../utils/constants"
import { AuthContext } from "../App"
import { useMutation } from "react-query"
import { UpdateProfileForm } from "../screens/UpdateProfileScreen"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { handleValidate, shortToast } from "../utils/helper"
import { UseFormSetError } from "react-hook-form"
import { VerifyPhoneNumberForm } from "../screens/SignUpScreen"

const useUpdateProfile = (setError: UseFormSetError<any>) => {
    const { setCustomer } = useContext(AuthContext)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    
    return useMutation({
        mutationFn: async (data: UpdateProfileForm) =>{
           return await axiosClient
            .post(`${UPDATE_PROFILE_URL}${data.id}`, data)
            .then((response) => {
                if (response.data.message) {
                    setCustomer(response.data.data)
                    shortToast('Cập nhật thông tin thành công.')
                    navigation.navigate('main')
                    return;
                }
                return response.data
            })
            .catch(error => {
                if (error.response.data.validateError) {
                    handleValidate(error.response.data.validateError, setError)
                }
            })}
        })
}

const useCheckAndSendOTPCode = (setError: UseFormSetError<any>) => {
    return useMutation({
        mutationFn: async (data: VerifyPhoneNumberForm) =>{
           return await axiosClient
            .post(CHECK_SEND_OTP_URL, data)
            .then(async (response) => {
                return response.data.otpCode
            })
            .catch(error => {
                if (error.response.data.errorMessage) {
                    setError('phoneNumber', { type: 'custom', message: error.response.data.errorMessage})
                }
            })}
        })
}


export {
    useUpdateProfile,
    useCheckAndSendOTPCode
}