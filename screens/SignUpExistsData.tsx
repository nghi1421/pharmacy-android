import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Animated, { FadeInDown } from "react-native-reanimated"
import { FormTextInput } from "../components/FomTextInput"
import { Text, TouchableOpacity } from "react-native"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "../utils/yup"
import * as Yup from 'yup';
import { useSignUp } from "../hooks/authenticationHook"
import { getDeviceToken } from "../utils/helper"

export interface SignUpExistDataForm {
    username: string
    password: string
    confirmationPassword: string
}

const defaultValues = {
    username: "",
    password: "",
    confirmationPassword: "",
};

const customerFormValidate: Yup.ObjectSchema<SignUpExistDataForm> = yup.object({
    username: yup
        .string()
        .min(6, 'Tên đăng nhập tối thiểu 6 kí tự')
        .required('Tên đăng nhập bắt buộc.')
        .max(255, 'Tên đăng nhập tối đa 255 kí tự'),
    password: yup
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
        .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu không khớp.')
        .max(255, 'Mật khẩu tối đa 255 kí tự'),
})

interface SignUpProps {
    email: string;
}

export const SignUpFormExistsData: React.FC<SignUpProps> = ({ email }) => {
    const signup = useSignUp()
    const {
        control: customerControl,
        handleSubmit,
        setError
    } = useForm<SignUpExistDataForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(customerFormValidate)
    })

    const onSubmit = (data: SignUpExistDataForm) => {
        getDeviceToken().then(deviceToken => {
            if (deviceToken) {
                signup.mutate(
                    {
                        ...data,
                        name: '',
                        address: '',
                        gender: '1',
                        phoneNumber: '',
                        email: email,
                        deviceToken
                    })
            }
        })
    }

    return (
        <>
            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="p-2 rounded-2xl w-full">
                <FormTextInput
                    name='username'
                    placeholder='Tên đăng nhập'
                    control={customerControl}
                />
            </Animated.View>

            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="p-2 rounded-2xl w-full"
            >
                <FormTextInput
                    name='password'
                    placeholder='Mật khẩu'
                    isPassword={true}
                    control={customerControl}
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
                    control={customerControl}
                />
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity
                    className="w-full mt-10 bg-sky-400 p-3 rounded-2xl mb-3"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-xl font-bold text-white text-center">Đăng ký</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}