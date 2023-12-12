import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { FormTextInput } from "../components/FomTextInput";
import { Address } from "../components/Address";
import { CustomDropdown } from "../components/CustomDropdown";
import { useForm } from "react-hook-form";
import yup from "../utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { DropdownItem } from "../types/DropdownItem";
import { AuthContext } from "../App";
import { genders } from "../utils/constants";
import { useCheckAndSendOTPCode, useUpdateProfile } from "../hooks/updateProfileHook";
import { OtpCode } from "../components/OtpCode";
import { FormPhoneNumber } from "../components/FormPhoneNumber";

export interface UpdateProfileForm {
    id: number
    name: string
    email: string
    phoneNumber: string
    address: string
    gender: string
}

//@ts-ignore
const profileValidate: Yup.ObjectSchema<UpdateProfileForm> = yup.object({
    name: yup
        .string()
        .required('Họ và tên bắt buộc.')
        .max(255),
    phoneNumber: yup
        .string()
        .required('Số điện thoại bắt buộc.')
        //@ts-ignore
        .phoneNumber('Số điện thoại không hợp lệ.')
        .max(15, 'Số điện thoại không quá 15 kí tự'),
    email: yup
        .string()
        .required('Email bắt buộc.')
        .max(255, 'Email không quá 255 kí tự')
        //@ts-ignore
        .email('Email không hợp lệ.'),
})

export const UpdateProfileScreen = () => {
    const navigation = useNavigation();
    const { customer } = useContext(AuthContext)
    const handleGoBack = () => {
        navigation.goBack();
    };
    const {
        control,
        handleSubmit,
        setError,
        watch,
        setValue
    } = useForm<UpdateProfileForm>({
        defaultValues: { ...customer },
        resolver: yupResolver(profileValidate)
    })
    const updateProfile = useUpdateProfile(setError);
    const [address, setAddress] = useState<string>(customer ? customer.address : '')
    const [gender, setGender] = useState<DropdownItem>(genders.find(item => item.value == customer?.gender) as DropdownItem)
    const [addressError, setAddressError] = useState<string>('')
    const [optCode, setOtpCode] = useState<string>('')
    const [otpError, setOtpError] = useState<string>('')
    const verifyEmail = useCheckAndSendOTPCode(setError)
    const [optFromServer, setOtpFromServer] = useState<string>('')
    const [verified, setVerified] = useState<boolean>(true)

    const onSubmit = (data: UpdateProfileForm) => {
        if (address.length > 0) {
            if (watch('email') === customer?.email) {
                updateProfile.mutate({
                    ...data,
                    address: address,
                    gender: gender.value,
                    id: customer?.id as number
                })
            }
            else {
                verifyEmail.mutate({ email: watch('email') })
            }
        }
        else {
            setAddressError('Địa chỉ bắt buộc.')
        }
    }

    const checkVerify = () => {
        if (optCode === optFromServer) {
            updateProfile.mutate({
                phoneNumber: watch('phoneNumber'),
                name: watch('name'),
                address: address,
                email: watch('email'),
                gender: gender.value,
                id: customer?.id as number
            })
            // setVerified(true)
        }
        else {
            setOtpError('OTP không hợp lệ vui lòng kiểm tra.')
        }
    }

    const resendOtp = () => {
        verifyEmail.mutate({ email: watch('email') })
    }

    useEffect(() => {
        if (verifyEmail.data) {
            setVerified(false)
            setOtpError('')
            setOtpFromServer(verifyEmail.data)
        }
    }, [verifyEmail.data])

    return (
        <>
            <View className=' w-full -h-full flex-row bg-sky-500 '>
                <TouchableOpacity onPress={handleGoBack} className='p-4'>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Cập nhật thông tin
                </Text>
            </View>

            {
                verified
                    ?
                    <View
                        className='p-2 mt-4'
                    >
                        <Animated.View
                            entering={FadeInDown.duration(1000).springify()}
                            className="p-2 rounded-2xl w-full"
                        >
                            <FormTextInput
                                name='name'
                                placeholder='Họ và tên'
                                control={control}
                            />
                        </Animated.View>


                        <Animated.View
                            entering={FadeInDown.duration(1000).springify()}
                            className="p-2 rounded-2xl w-full"
                        >
                            <FormTextInput
                                name='email'
                                placeholder='Nhập email'
                                control={control}
                                renderIcon={() =>
                                    watch('email') === customer?.email
                                        ? <View className='-mb-4'>
                                            <MaterialIcons name="verified" size={24} color="green" />
                                        </View>
                                        : <View className='-mb-4'>
                                            <Octicons name="unverified" size={24} color="red" />
                                        </View>
                                }
                            />
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.duration(1000).springify()}
                            className="p-2 rounded-2xl w-full"
                        >
                            <FormPhoneNumber
                                name='phoneNumber'
                                placeholder='Số điện thoại'
                                control={control}
                            />
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.duration(1000).springify()}
                            className="p-2 rounded-2xl w-full">
                            <Address setAddress={setAddress} initAddress={customer ? customer.address : ''} />
                            {addressError ?? <Text className='mt-2 text-red-600 font-semibold'>{addressError}</Text>}
                        </Animated.View>

                        <Animated.View
                            entering={FadeInDown.duration(1000).springify()}
                            className="p-2 rounded-2xl w-full">
                            <CustomDropdown
                                data={genders}
                                setSelectItem={setGender}
                                selectItem={genders.find(item => item.value == customer?.gender) as DropdownItem}
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
                                <Text className="text-xl font-bold text-white text-center">Cập nhật</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    :
                    <View
                        className='p-2 mt-4'
                    >
                        <View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-sky-400 font-bold tracking-wider text-5xl mb-10">
                                Xác thực
                            </Animated.Text>
                        </View>
                        <OtpCode
                            setOtpCode={setOtpCode}
                            otpError={otpError}
                        />
                        <Animated.View className="w-full flex-row gap-3 mt-10" entering={FadeInDown.delay(600).duration(1000).springify()}>
                            <TouchableOpacity className="flex-1 mt-10 bg-sky-400 p-3 rounded-2xl mb-3"
                                onPress={() => {
                                    checkVerify();
                                }}
                            >
                                <Text className="text-xl font-bold text-white text-center">Xác thực</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 mt-10 border-2 border-sky-400 p-3 rounded-2xl mb-3"
                                onPress={() => {
                                    resendOtp()
                                }}
                            >
                                <Text className="text-xl font-bold text-sky-400 text-center">Gửi lại OTP</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
            }
        </>
    )
}