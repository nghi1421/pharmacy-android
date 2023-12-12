import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { HistoryItem } from "../types/History";
import { styled } from "nativewind";

const StyledView = styled(View)

export function DetailScreen() {
    const navigation = useNavigation();
    const [history, setHistory] = useState<HistoryItem | null>(null)
    const handleGoBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        //@ts-ignore
        const historyData = navigation.getState().routes.find(route => route.name === 'detail')?.params.params.history
        if (historyData) {
            setHistory(historyData)
        }
    }, [])

    return (
        <View className='bg-slate-200 h-full'>
            <View className=' w-full -h-full flex-row bg-sky-500 '>
                <TouchableOpacity onPress={handleGoBack} className='p-4'>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Chi tiết đơn hàng
                </Text>
            </View >
            {
                history
                    ?
                    <Animated.View
                        entering={FadeInRight.duration(200).springify()}
                        className="w-full "
                    >
                        <View className='flex-row mx-6 border border-b-0 my-4 rounded-lg bg-white border-slate-300 shadow-lg shadow-black'>
                            <View className="text-center justify-center pl-4">
                                <FontAwesome
                                    style={{ textAlign: 'center', padding: 1 }}
                                    name="cart-plus"
                                    size={48}
                                    color="rgb(14 165 233)" />
                            </View>
                            <View className='flex-col py-4 px-3'>
                                <Text className='text-xl uppercase text-slate-500 opacity-70 border-b border-slate-300'>Đơn mua thuốc </Text>
                                <Text className='text-2xl font-semibold text-slate-600'>{history.total}</Text>
                            </View>

                        </View>

                        <View className='mx-6 -mt-4 bg-slate-500 h-[1px] '></View>
                        <StyledView className='border border-slate-300 mx-6 rounded-lg bg-white shadow-lg shadow-black' >
                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 pt-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>Mã đơn hàng</Text>
                                <Text className='pb-2 pt-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{history.id}</Text>
                            </View>
                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>Nhân viên bán</Text>
                                <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{history.staffName}</Text>
                            </View>
                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>Thời gian bán hàng</Text>
                                <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{history.time}</Text>
                            </View>
                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 px-1 flex-1 text-lg opacity-80 text-slate-500'>Mã đơn thuốc</Text>
                                <Text className='pb-2 px-1 flex-1 text-lg text-right text-slate-600 font-bold'>{history.prescriptionId}</Text>
                            </View>
                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 px-1 flex-1 text-lg text-center uppercase text-slate-600 font-bold'>Chi tiết</Text>
                            </View>
                            <View className='flex-row mx-1 align-items-end border-b border-slate-300'>
                                <Text className='pb-2 px-1 flex-1 text-slate-600 text-sm font-bold'>Tên thuốc</Text>
                                <Text className='pb-2 px-1 flex-1 text-center text-slate-600 text-sm font-bold'>Số lượng</Text>
                                <Text className='pb-2 px-1 flex-1 text-right text-slate-600 text-sm font-bold'>Đơn giá</Text>
                            </View>
                            {
                                history.historyDetail.map((historyDetailData) => (
                                    <View className='flex-row mx-1 align-items-end border-b border-slate-200'>
                                        <Text className='pb-2 px-1 flex-1 m-auto text-sm text-slate-500'>{historyDetailData.drugName}</Text>
                                        <Text className='pb-2 px-1 flex-1 m-auto text-sm text-center text-slate-500 font-bold'>{historyDetailData.quantity}</Text>
                                        <Text className='pb-2 px-1 flex-1 m-auto text-sm text-right text-slate-500 font-bold'>{historyDetailData.unitPrice}</Text>
                                    </View>
                                ))
                            }

                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tổng tiền (chưa VAT)</Text>
                                <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>{history.totalWithoutVat}</Text>
                            </View>

                            <View className='flex-row mx-1 align-items-end border-b border-slate-200'>
                                <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tiền thuế</Text>
                                <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>{history.vat}</Text>
                            </View>

                            <View className='flex-row mx-1 align-items-end'>
                                <Text className='pb-2 pt-1 px-1 flex-1 text-base text-left text-slate-600 font-bold'>Tổng tiền</Text>
                                <Text className='pb-2 pt-1 px-1 flex-2 text-base text-right text-slate-600 font-bold'>{history.total}</Text>
                            </View>

                        </StyledView>
                    </Animated.View>
                    :
                    <><Text>No data found</Text></>
            }
        </View>

    )
}