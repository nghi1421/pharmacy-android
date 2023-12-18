import { useContext } from "react"
import axiosClient from "../utils/axios"
import { CHANGE_PASSWORD_URL, SET_NEW_PASSWORD } from "../utils/constants"
import { AuthContext } from "../App"
import { useMutation } from "react-query"
import { shortToast } from "../utils/helper"
import { ChangePasswordForm } from "../screens/ChangePasswordScreen"
import { SetNewPasswordForm } from "../screens/SetNewPassword"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const useChangePassword = () => {
    const { logOut } = useContext(AuthContext)

    return useMutation({
        mutationFn: async (data: ChangePasswordForm) => {
            return await axiosClient
                .post(CHANGE_PASSWORD_URL, data)
                .then((response) => {
                    console.log('then', response.data);
                    if (response.data.message) {
                        logOut()
                        shortToast('Đổi mật khẩu thành công.')
                        return;
                    }
                    return response.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
    })
}

const useSetNewPassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return useMutation({
        mutationFn: async (data: SetNewPasswordForm) => {
            return await axiosClient
                .post(SET_NEW_PASSWORD, data)
                .then((response) => {
                    if (response.data.message) {
                        shortToast('Đặt mật khẩu mới thành công.')
                        navigation.push('login')
                        return;
                    }
                    return response.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }
    })
}

export {
    useChangePassword,
    useSetNewPassword
}