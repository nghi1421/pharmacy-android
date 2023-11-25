import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

export function DetailScreen() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack(); 
    };
    
    return (
        <>
            <View className=' w-full -h-full flex-row bg-sky-500 '>
                <TouchableOpacity onPress={handleGoBack} className='p-4'>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Chi tiết đơn hàng
                </Text>
            </View>
            <Animated.View 
                entering={FadeInRight.duration(200).springify()} 
                className="w-full"
            >
                <View className='flex-row mx-6 border border-b-0 my-4 rounded-lg border-slate-300'>
                    <View className="text-center justify-center pl-4">
                        <FontAwesome
                            style={{ textAlign: 'center', padding: 1 }}
                            name="cart-plus"
                            size={48}
                            color="rgb(14 165 233)" />
                    </View>
                    <View className='flex-col py-4 px-3'>
                        <Text className='text-xl uppercase text-slate-500 opacity-70 border-b border-slate-300'>Đơn mua thuốc </Text>
                        <Text className='text-2xl font-semibold text-slate-600'>{`${'220,000 VND'}`}</Text>
                    </View>

                </View>
              
                <View className='mx-6 -mt-4 bg-slate-500 h-[1px]'></View>
                <View className='border border-slate-300 mx-6 rounded-lg' >
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 pt-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>{`Mã đơn hàng`}</Text> 
                        <Text className='pb-2 pt-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{1}</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>{`Nhân viên bán`}</Text> 
                        <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{'Nguyễn Thanh Nghị'}</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>{`Thời gian bán hàng`}</Text> 
                        <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{'22/11/2023 23:20:22'}</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>{`Mã đơn thuốc`}</Text> 
                        <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{'DT2145'}</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 px-1 flex-1 text-lg text-center uppercase text-slate-600 font-bold'>Chi tiết</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end border-b border-slate-300'>
                        <Text className='pb-2 px-1 flex-2 text-slate-600 text-sm font-bold'>Tên thuốc</Text> 
                        <Text className='pb-2 px-1 flex-1 text-center text-slate-600 text-sm font-bold'>Số lượng</Text>
                        <Text className='pb-2 px-1 flex-2 text-right text-slate-600 text-sm font-bold'>Đơn giá</Text>
                    </View>

                    <View className='flex-row mx-1 align-items-end border-b border-slate-200'>
                        <Text className='pb-2 px-1 flex-2 text-sm text-slate-500'>{`Thuốc A`}</Text> 
                        <Text className='pb-2 px-1 flex-1 text-sm text-center text-slate-500 font-bold'>1</Text>
                        <Text className='pb-2 px-1 flex-2 text-sm text-right text-slate-500 font-bold'>20,000đ</Text>
                    </View>
                    <View className='flex-row mx-1 align-items-end border-b border-slate-200'>
                        <Text className='pb-2 px-1 flex-1 text-sm text-slate-500'>{`Thuốc A`}</Text> 
                        <Text className='pb-2 px-1 flex-1 text-sm text-center text-slate-500 font-bold'>1</Text>
                        <Text className='pb-2 px-1 flex-1 text-sm text-right text-slate-500 font-bold'>20,000đ</Text>
                    </View>

                    {/* pay */}
                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tổng tiền (chưa VAT)</Text>
                        <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>20,000đ</Text>
                    </View>

                    <View className='flex-row mx-1 align-items-end border-b border-slate-200'>
                        <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tiền thuế</Text>
                        <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>20,000đ</Text>
                    </View>

                    <View className='flex-row mx-1 align-items-end'>
                        <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tổng tiền</Text>
                        <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>20,000đ</Text>
                    </View>

                </View>
            </Animated.View>
        </>
        
    )
}