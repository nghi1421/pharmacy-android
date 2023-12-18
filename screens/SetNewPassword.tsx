import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FormTextInput } from "../components/FomTextInput";
import yup from "../utils/yup";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetNewPassword } from "../hooks/changePasswordHook";

export interface SetNewPasswordForm {
    password: string
    confirmationPassword: string
    email: string
}

const defaultValues = {
    password: "",
    confirmationPassword: "",
    email: "",
};

//@ts-ignore
const changePasswordValidate: Yup.ObjectSchema<SetNewPasswordForm> = yup.object({
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

interface SetNewPasswordProps {
    email: string
}

export const SetNewPassword: React.FC<SetNewPasswordProps> = ({ email }) => {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
    } = useForm<SetNewPasswordForm>({
        defaultValues: defaultValues,
        //@ts-ignore
        resolver: yupResolver(changePasswordValidate)
    })
    const setNewPassword = useSetNewPassword()

    const onSubmit = (data: SetNewPasswordForm) => {
        setNewPassword.mutate({ ...data, email: email });
    }

    return (
        <>

            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="p-2 rounded-2xl w-full"
            >
                <FormTextInput
                    name='password'
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
                    <Text className="text-xl font-bold text-white text-center">Đặt mật khẩu</Text>
                </TouchableOpacity>
            </Animated.View>

        </>
    )
}