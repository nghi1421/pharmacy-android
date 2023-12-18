import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FormTextInput } from "../components/FomTextInput";
import yup from "../utils/yup";
import * as Yup from 'yup';
import { useContext } from "react";
import { AuthContext } from "../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword } from "../hooks/changePasswordHook";
import { createConfirmation } from "../utils/confirmation";

export interface ChangePasswordForm {
    oldPassword: string
    newPassword: string
    confirmationPassword: string
    phoneNumber: string;
}

const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmationPassword: "",
    phoneNumber: "",
};

//@ts-ignore
const changePasswordValidate: Yup.ObjectSchema<ChangePasswordForm> = yup.object({
    oldPassword: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .min(6)
        .max(255),
    newPassword: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .min(6, 'Mật khẩu tối thiểu 6 kí tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\`*])(?=.{6,})/,
            "Mật khẩu phải bao gồm chữ số, chữ in hoa và ít nhất 1 kí tự đặc biệt."
        )
        .max(255, 'Mật khẩu tối đa 255 kí tự'),
    confirmationPassword: yup
        .string()
        .required('Xác nhận mật khẩu bắt buộc.')
        .min(6, 'Mật khẩu tối thiểu 6 kí tự')
        .oneOf([Yup.ref('newPassword'), ''], 'Xác nhận mật khẩu không khớp.')
        .max(255, 'Mật khẩu tối đa 255 kí tự'),
})

export const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const { customer } = useContext(AuthContext)
    const {
        control,
        handleSubmit,
    } = useForm<ChangePasswordForm>({
        defaultValues: { ...defaultValues, phoneNumber: customer ? customer.phoneNumber : '' },
        resolver: yupResolver(changePasswordValidate)
    })
    const changePassword = useChangePassword()
    const handleGoBack = () => {
        navigation.goBack();
    };

    const onSubmit = (data: ChangePasswordForm) => {

        const action = () => {
            changePassword.mutate(data);
        }
        createConfirmation('Xác nhận', 'Đồng ý đổi mật khẩu, bạn phải đăng nhập lại.', action)
    }

    return (
        <>
            <View className=' w-full -h-full flex-row bg-sky-500 '>
                <TouchableOpacity onPress={handleGoBack} className='p-4'>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Đổi mật khẩu
                </Text>
            </View>
            <View
                className='p-2 mt-4'
            >
                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    className="p-2 rounded-2xl w-full"
                >
                    <FormTextInput
                        name='oldPassword'
                        isPassword={true}
                        placeholder='Mật khẩu cũ'
                        control={control}
                    />
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    className="p-2 rounded-2xl w-full"
                >
                    <FormTextInput
                        name='newPassword'
                        isPassword={true}
                        placeholder='Mật khẩu mới'
                        control={control}
                    />
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    className="p-2 rounded-2xl w-full"
                >
                    <FormTextInput
                        name='confirmationPassword'
                        isPassword={true}
                        placeholder='Xác nhận mật khẩu'
                        control={control}
                    />
                </Animated.View>

                <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                    <TouchableOpacity
                        className="w-full mt-10 bg-sky-400 p-3 rounded-2xl mb-3"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-xl font-bold text-white text-center">Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    )
}