import { useContext } from "react"
import axiosClient from "../utils/axios"
import { UPDATE_PROFILE_URL } from "../utils/constants"
import { AuthContext } from "../App"
import { useMutation } from "react-query"
import { UpdateProfileForm } from "../screens/UpdateProfileScreen"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { shortToast } from "../utils/helper"

const useUpdateProfile = () => {
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
                    navigation.push('main')
                    return;
                }
                return response.data
            })
            .catch(error => {
                console.log(error)
            })}
        })
}

export {
    useUpdateProfile,
}