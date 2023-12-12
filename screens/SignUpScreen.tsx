import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputKeyPressEventData,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useForm } from 'react-hook-form';
import { useVerifyPhoneNumber } from '../hooks/authenticationHook';
import { yupResolver } from "@hookform/resolvers/yup";
import yup from '../utils/yup';
import * as Yup from 'yup';
import { FormPhoneNumber } from '../components/FormPhoneNumber';
import { AuthContext } from '../App';
import { SignUpFormExistsData } from './SignUpExistsData';
import { SignUpForm } from './SignUpForm';
import { PreventKeyboard } from '../components/PreventKeyBoard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormTextInput } from '../components/FomTextInput';
// import { StatusBar } as ExpoStatusBar from 'expo-status-bar';

export interface VerifyEmailForm {
  email: string
}

interface TextInputProp {
  focus: () => void
}

//@ts-ignore
const emailValidate: Yup.ObjectSchema<VerifyEmailForm> = yup.object({
  email: yup
    .string()
    .required('Email bắt buộc.')
    //@ts-ignore
    .email('Email không hợp lệ.'),
})

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { customer } = useContext(AuthContext);
  const {
    control: emailController,
    handleSubmit: handleSubmitEmail,
    setError,
    watch
  } = useForm<VerifyEmailForm>({
    defaultValues: { email: '' },
    resolver: yupResolver(emailValidate),
  })

  const verifyEmail = useVerifyPhoneNumber(setError)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInputProp[]>(Array(otp.length).fill({}));
  const [checkOtp, setCheckOtp] = useState<string>('')
  const [isVeriry, setIsVeriry] = useState<boolean>(false)
  const [otpError, setOtpError] = useState<string>('')
  const onSubmit = async (data: VerifyEmailForm) => {
    verifyEmail.mutate(data)
  }

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleKeyPress = (event: TextInputKeyPressEventData, index: number) => {
    if (event.key === 'Backspace') {
      if (index - 1 >= 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    else {
      if (index < otp.length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  const checkVerify = () => {
    if (otp.join('') === checkOtp) {
      setIsVeriry(true)
    }
    else {
      setOtpError('Mã OTP không hợp lệ vui lòng kiểm tra.')
    }
  }

  useEffect(() => {
    if (verifyEmail.data) {
      setCheckOtp(verifyEmail.data)
    }

  }, [verifyEmail.data])

  return (
    <SafeAreaView
      className='bg-white'
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View className="bg-white h-full w-full">
            <StatusBar style="dark" />

            <View className="w-full flex justify-around pt-10">
              <View className="flex items-center">
                <Animated.Text
                  entering={FadeInUp.duration(1000).springify()}
                  className="text-sky-400 font-bold tracking-wider text-5xl mb-10">
                  Đăng kí
                </Animated.Text>
              </View>

              <View className="flex items-center mx-5 space-y-4">
                {
                  checkOtp
                    ?
                    isVeriry
                      ?
                      customer
                        ?
                        <SignUpFormExistsData email={watch('email')} />
                        :
                        <SignUpForm email={watch('email')} />
                      :
                      <>
                        <Animated.View
                          entering={FadeInDown.duration(1000).springify()}
                          className="p-5 rounded-2xl w-full">
                          <View className='flex flex-row'>
                            {otp.map((digit, index) => (
                              <TextInput
                                className='border rounded-md m-1 border-sky-800 opacity-70 h-12 w-12 text-center text-xl'
                                ref={(ref) => (inputRefs.current[index] = ref as TextInputProp)}
                                key={index}
                                maxLength={1}
                                keyboardType="numeric"
                                value={digit}
                                onChangeText={(value) => handleOtpChange(index, value)}
                                onKeyPress={({ nativeEvent }) => {
                                  handleKeyPress(nativeEvent, index)
                                }}
                              />
                            ))}
                          </View>
                          <Text className='mt-2 text-red-600 font-semibold'>{otpError}</Text>
                        </Animated.View>

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
                            onPress={handleSubmitEmail(onSubmit)}>
                            <Text className="text-xl font-bold text-sky-400 text-center">Gửi lại OTP</Text>
                          </TouchableOpacity>

                        </Animated.View>
                      </>
                    :
                    <>
                      <FormTextInput
                        name='email'
                        placeholder='Nhập email'
                        control={emailController}
                      />

                      <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity
                          className="w-full mt-10 bg-sky-400 p-3 rounded-2xl mb-3"
                          onPress={handleSubmitEmail(onSubmit)}
                        >
                          <Text className="text-xl font-bold text-white text-center">Xác thực</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </>
                }
                <Animated.View
                  entering={FadeInDown.delay(600).duration(1000).springify()}
                  className="flex-row justify-center mb-20"
                >
                  <Text>Bạn đã có tài khoản? </Text>
                  <TouchableOpacity onPress={() => navigation.push('login')}>
                    <Text className="text-sky-600">Đăng nhập</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : 50
  }
})