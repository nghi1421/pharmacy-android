import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Animated, { FadeInDown } from "react-native-reanimated"
import { FormTextInput } from "../components/FomTextInput"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "../utils/yup"
import * as Yup from 'yup';
import { useState } from "react"
import { CustomDropdown } from "../components/CustomDropdown"
import { Address } from "../components/Address"
import { getDeviceToken } from "../utils/helper"
import { useSignUp } from "../hooks/authenticationHook"
import { genders } from "../utils/constants"
import { DropdownItem } from "../types/DropdownItem"

const countries = [
  {label: 'Afghanistan', value: '93'},
  {label: 'Albania', value: '355'},
  {label: 'Algeria', value: '213'},
  {label: 'American Samoa', value: '1-684'},
  {label: 'Andorra', value: '376'},
  {label: 'Angola', value: '244'},
  {label: 'Anguilla', value: '1-264'},
  {label: 'Antarctica', value: '672'},
  {label: 'Antigua and Barbuda', value: '1-268'},
  {label: 'Argentina', value: '54'},
  {label: 'Armenia', value: '374'},
  {label: 'Aruba', value: '297'},
  {label: 'Australia', value: '61'},
  {label: 'Austria', value: '43'},
  {label: 'Azerbaijan', value: '994'},
  {label: 'Bahamas', value: '1-242'},
  {label: 'Bahrain', value: '973'},
  {label: 'Bangladesh', value: '880'},
  {label: 'Barbados', value: '1-246'},
];

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
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .min(6)
        .max(255),
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .min(6)
        .max(255),
    confirmationPassword: yup
        .string()
        .required('Xác nhận mật khẩu bắt buộc.')
        .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu không khớp.')
        .min(6)
        .max(255),
})

interface SignUpProps {
    phoneNumber: string;
}

export const SignUpForm: React.FC<SignUpProps> = ({ phoneNumber }) => {
    const signup = useSignUp()
    const {
        control: customerControl,
        handleSubmit,
        setError
    } = useForm<CreateCustomerForm>({
        defaultValues: {...defaultValues},
        resolver: yupResolver(customerFormValidate)
    })
    const [address, setAddress] = useState<string>('')
    const [gender, setGender] = useState<DropdownItem>({ label: 'Nữ', value: '0' })
    const [addressError, setAddressError] = useState<string>('')

    const onSubmit = (data: CreateCustomerForm) => { 
        getDeviceToken().then(deviceToken => {
            if (address.length > 0) {
                if (deviceToken) {
                    console.log({
                        ...data,
                        address: address,
                        deviceToken,
                        phoneNumber: phoneNumber,
                        gender: gender.value
                    })

                    signup.mutate({
                        ...data,
                        address: address,
                        deviceToken,
                        phoneNumber: phoneNumber,
                        gender: gender.value
                    });
                }
                console.log('1')
                setAddressError('')
            }
            else {
                setAddressError('Vui lòng nhập địa chỉ.')
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
                className="p-2 rounded-2xl w-full">
                <Address setAddress={setAddress} />  
                { addressError ?? <Text className='mt-2 text-red-600 font-semibold'>{ addressError }</Text>}
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="p-2 rounded-2xl w-full">
                <CustomDropdown
                    data={genders}
                    setSelectItem={setGender}
                    selectItem={gender}
                    placeholder="Giới tính"
                    searchable={false}
                >

                </CustomDropdown>
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