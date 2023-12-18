import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FormTextInput } from '../components/FomTextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../utils/yup';
import * as Yup from 'yup';
import { useLogin } from '../hooks/authenticationHook';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface LoginForm {
    username: string
    password: string
}

const defaultValues = {
    username: "",
    password: "",
};

const loginFormValidate: Yup.ObjectSchema<LoginForm> = yup.object({
    username: yup
        .string()
        .required('Tên đăng nhập bắt buộc.')
        .max(255),
    password: yup
        .string()
        .required('Mật khẩu bắt buộc.')
        .max(255),
})

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {
        control,
        handleSubmit,
        setError,
    } = useForm<LoginForm>({
        defaultValues: defaultValues,
        resolver: yupResolver(loginFormValidate)
    })
    const login = useLogin(setError);
    const onSubmit = (data: LoginForm) => {
        login.mutate(data)
    }

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

                        <View className="w-full flex justify-around mt-10">
                            <View className="flex items-center">
                                <Animated.Text
                                    entering={FadeInUp.duration(1000).springify()}
                                    className="text-sky-500 font-bold tracking-wider text-5xl">
                                    Đăng nhập
                                </Animated.Text>
                            </View>

                            <View className="flex-col items-center mx-5 space-y-4 mt-10">
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    className="p-2 rounded-2xl w-full">
                                    <FormTextInput
                                        control={control}
                                        name='username'
                                        placeholder='Tên đăng nhập'
                                    />
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    className="p-2 rounded-2xl w-full">
                                    <FormTextInput
                                        control={control}
                                        name='password'
                                        isPassword={true}
                                        placeholder='Mật khẩu'
                                    />
                                </Animated.View>

                                <Animated.View
                                    className="w-full"
                                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                                    <TouchableOpacity
                                        onPress={handleSubmit(onSubmit)}
                                        className="w-full bg-sky-400 p-3 rounded-2xl mb-3 mt-10"
                                    >
                                        <Text className="text-xl font-bold text-white text-center">Đăng nhập</Text>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View
                                    entering={FadeInDown.delay(600).duration(1000).springify()}
                                    className="flex-row justify-center">
                                    <Text>Bạn chưa có tài khoản? </Text>
                                    <TouchableOpacity onPress={() => navigation.push('signin')}>
                                        <Text className="text-sky-600">Đăng kí</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInDown.delay(600).duration(1000).springify()}
                                    className="flex-row justify-center">
                                    <TouchableOpacity onPress={() => navigation.push('forgot-password')}>
                                        <Text className="text-sky-600">Quên mật khẩu?</Text>
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
    },
})

