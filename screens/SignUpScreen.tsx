import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form';
import { useTest, useVerifyPhoneNumber } from '../hooks/authenticationHook';

export interface VerifyPhoneNumberForm {
    phoneNumber: string
}

export default function SignupScreen() {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<VerifyPhoneNumberForm>()
    const verifyPhoneNumber = useVerifyPhoneNumber()
    const onSubmit = (data: VerifyPhoneNumberForm) => { 
        verifyPhoneNumber.mutate(data)
    }

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      {/* <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

      <View className="flex-row justify-around w-full absolute">
        <Animated.Image 
            entering={FadeInUp.delay(200).duration(1000).springify()} 
            source={require('../assets/images/light.png')} 
            className="h-[225] w-[90]"
        />
        <Animated.Image 
            entering={FadeInUp.delay(400).duration(1000).springify()} 
            source={require('../assets/images/light.png')} 
            className="h-[160] w-[65] opacity-75" 
        />
      </View> */}

      <View  className="h-full w-full flex justify-around pt-48">
        <View className="flex items-center">
            <Animated.Text 
                entering={FadeInUp.duration(1000).springify()} 
                className="text-sky-400 font-bold tracking-wider text-5xl">
                    Đăng kí
            </Animated.Text>
        </View>

        <View className="flex items-center mx-5 space-y-4">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <Controller
                            name='phoneNumber'
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextInput
                                    keyboardType="phone-pad" // Định dạng bàn phím cho nhập số điện thoại
                                    placeholder="Số điện thoại"
                                    placeholderTextColor={'gray'}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            // <TextField
                            //     size='small'
                            //     type='text'
                            //     helperText={error ? error.message : null}
                            //     error={!!error}
                            //     onChange={onChange}
                            //     onBlur={() => {
                            //         searchCustomer.mutate(watch('phoneNumber'))
                            //     }
                            //     }
                            //     value={value}
                            //     fullWidth
                            //     label="Số điện thoại khách hàng"
                            //     variant="outlined"
                            //     placeholder='Nhập số điện thoại khách hàng'
                            // />
                            )}
                        />
                
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity className="w-full mt-20 bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleSubmit(onSubmit)}>
                    <Text className="text-xl font-bold text-white text-center">Xác thực</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                    <Text>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('login')}>
                        <Text className="text-sky-600">Đăng nhập</Text>
                    </TouchableOpacity>
                </Animated.View>                    
        </View>
      </View>
    </View>
  )
}