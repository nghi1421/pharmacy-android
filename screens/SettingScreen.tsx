import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../App";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createConfirmation } from "../utils/confirmation";

export function SettingScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { customer, logOut } = useContext(AuthContext)
    return (
        <>
            <View className=' w-full -h-full flex-row bg-sky-500 p-4'>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Thiết lập
                </Text>
            </View >
            <View className='flex-col h-full w-full bg-slate-200'>
                <View className='flex-row rounded-xl mx-6 mt-4 p-4 bg-white'>
                    <View className="text-center justify-center pl-2">
                        <MaterialIcons name="account-circle"
                            size={64}
                            color='rgb(14 165 233)'
                        />
                    </View>
                    <View className='flex-col py-2 px-3'>
                        <Text className='text-xl text-slate-900 font-bold opacity-70'>{customer?.name}</Text>
                        <Text className='text-xl text-slate-500 opacity-70'>{customer?.phoneNumber}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    className='bg-slate-200'
                    onPress={() => navigation.navigate('update-profile')}
                >
                    <View className='flex-row rounded-xl mx-6 p-4 mt-4 bg-white'>
                        <View className='my-auto mr-2'>
                            <MaterialCommunityIcons name="account-settings" size={24} color="rgb(14 165 233)" />
                        </View>
                        <Text className='text-xl my-auto text-sky-600 opacity-70'>Cập nhật thông tin</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className='bg-slate-200'
                    onPress={() => navigation.navigate('change-password')}
                >

                    <View className='flex-row rounded-xl mx-6 p-4 mt-1 bg-white'>
                        <View className='my-auto mr-2'>
                            <MaterialCommunityIcons name="key-change" size={24} color="rgb(14 165 233)" />
                        </View>
                        <Text className='text-xl my-auto text-sky-600 opacity-70'>Đổi mật khẩu</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className='bg-slate-200'
                    onPress={() => {
                        createConfirmation('Xác nhận', 'Bạn có muốn đăng xuất không?', logOut)
                    }}
                >
                    <View className='flex-row rounded-xl mx-6 p-4 mt-1 bg-white'>
                        <View className='my-auto mr-2'>
                            <MaterialCommunityIcons name="logout-variant" size={24} color="rgb(14 165 233)" />
                        </View>
                        <Text className='text-xl my-auto text-sky-600 opacity-70'>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}