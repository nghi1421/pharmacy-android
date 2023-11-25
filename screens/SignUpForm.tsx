import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Animated, { FadeInDown } from "react-native-reanimated"
import { FormTextInput } from "../components/FomTextInput"
import { Text, TouchableOpacity } from "react-native"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "../utils/yup"
import * as Yup from 'yup';

export interface CreateCustomerForm {
    username: string
    password: string
    confirmationPassword: string
    name: string;
    phoneNumber: string;
    address: string;
    gender: string;
    deviceToken: string
}

const defaultValues = {
    username: "",
    password: "",
    confirmationPassword: "",
    name: "",
    phoneNumber: "",
    gender: '1',
    address: '',
    deviceToken: ''
};

//@ts-ignore
const customerFormValidate: Yup.ObjectSchema<CreateCustomerForm> = yup.object({
    name: yup
        .string()
        .required('Họ và tên bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        //@ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.'),
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .max(255),
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .max(255),
    confirmationPassword: yup
        .string()
        .required('Xác nhận mật khẩu bắt buộc.')
        .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu không khớp.')
        .max(255),
})

export const SignUpForm = () => {
    const {
        control: customerControl,
        handleSubmit: handleSubmitCustomer,
        setError
    } = useForm<CreateCustomerForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(customerFormValidate)
    })

    const onSubmitCustomer = async (data: CreateCustomerForm) => { 
        console.log(data)
        // if (isHaveInfor) {
        //   logIn();
        // }
        // else {
        //   setIsVeriry(true)
        //   logIn();
        //   console.log(isAuthenticated);
        // }
    }
    
    return (
        <KeyboardAwareScrollView
            extraScrollHeight={50}
            className='w-full flex'
            enableOnAndroid
        >
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
                
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="p-2 rounded-2xl w-full"
            >
                <FormTextInput
                    name='name'
                    placeholder='Họ và tên'
                    control={customerControl}
                />
            </Animated.View>
                
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="p-2 rounded-2xl w-full"
            >
                <FormTextInput
                    name='address'
                    placeholder='Địa chỉ'
                    control={customerControl}
                />
                </Animated.View>  

                <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity
                    className="w-full mt-10 bg-sky-400 p-3 rounded-2xl mb-3"
                    onPress={handleSubmitCustomer(onSubmitCustomer)}
                >
                    <Text className="text-xl font-bold text-white text-center">Đăng ký</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAwareScrollView>
    )
}