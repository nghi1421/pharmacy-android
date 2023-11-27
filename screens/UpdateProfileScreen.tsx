import { AntDesign} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
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
import { useUpdateProfile } from "../hooks/updateProfileHook";

export interface UpdateProfileForm {
    id: number
    name: string
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
})

export const UpdateProfileScreen = () => {
    const navigation = useNavigation();
    const updateProfile = useUpdateProfile();
    const { customer } = useContext(AuthContext)
    const handleGoBack = () => {
        navigation.goBack(); 
    };
    const {
        control,
        handleSubmit,
        setError
    } = useForm<UpdateProfileForm>({
        defaultValues: {...customer},
        resolver: yupResolver(profileValidate)
    })
    const [address, setAddress] = useState<string>(customer ? customer.address : '')
    const [gender, setGender] = useState<DropdownItem>(genders.find(item => item.value == customer?.gender) as DropdownItem)
    const [addressError, setAddressError] = useState<string>('')
    const onSubmit = (data: UpdateProfileForm) => {
        if (address.length > 0) {
            updateProfile.mutate({
                ...data,
                address: address,
                phoneNumber: customer?.phoneNumber as string,
                gender: gender.value,
                id: customer?.id as number
            })
        }
        else {
            setAddressError('Địa chỉ bắt buộc.')
        }   
    }
    
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
                className="p-2 rounded-2xl w-full">
                    <Address setAddress={setAddress} initAddress={customer ? customer.address : ''} />  
                { addressError ?? <Text className='mt-2 text-red-600 font-semibold'>{ addressError }</Text>}
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
        </>
    )
}