import { useContext } from "react"
import axiosClient from "../utils/axios"
import { CHANGE_PASSWORD_URL } from "../utils/constants"
import { AuthContext } from "../App"
import { useMutation } from "react-query"
import { shortToast } from "../utils/helper"
import { ChangePasswordForm } from "../screens/ChangePasswordScreen"

const useChangePassword = () => {
    const { logOut } = useContext(AuthContext)
    
    return useMutation({
        mutationFn: async (data: ChangePasswordForm) => {
            return await axiosClient
                .post(CHANGE_PASSWORD_URL, data)
                .then((response) => {
                    console.log('then',response.data);
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

export {
    useChangePassword
}