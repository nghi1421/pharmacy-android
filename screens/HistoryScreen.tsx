import { ActivityIndicator, Image, LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from "react-native";
import { Expandable } from "../components/Expandable";
import { useEffect, useState } from "react";
import { HistoryExpandable } from "../types/History";
import { useGetHistory } from "../hooks/historyHook";

export function HistoryScreen() {
    const { data } = useGetHistory()
    const [historiesExpand, setHistoryExpand] = useState<HistoryExpandable[]>([])

    const updateLayout = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setHistoryExpand(historiesExpand.map((history, i) => {
            return index === i ? { ...history, isExpanded: !history.isExpanded } : history
        }))
    }

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        if (data) {
            setHistoryExpand(data)
        }
    }, [data])

    return (
        <>
            <View className=' w-full -h-full flex-row bg-sky-500 p-4'>
                <Text className='text-xl text-middle my-auto shadow-xl text-white font-semibold'>
                    Lịch sử mua hàng
                </Text>
            </View >
            <View className='bg-slate-50 m-4 mb-20 shadow shadow-black '>
                <ScrollView >
                    {
                        !data
                            ?
                            <ActivityIndicator size="large" />
                            :
                            historiesExpand.length > 0
                                ?
                                historiesExpand.map((historyExpand, index) => (
                                    <Expandable
                                        key={historyExpand.title}
                                        onClick={
                                            () => {
                                                updateLayout(index)
                                            }
                                        }
                                        data={historyExpand}
                                    />
                                ))
                                :
                                <View>
                                    <Image className='w-96 h-96 m-auto' source={require('../assets/images/empty-data.png')} />
                                    <Text className='text-2xl text-slate-600 mx-auto -mt-10'>Không có dữ liệu</Text>
                                </View>
                    }
                </ScrollView>
            </View>
        </>

    )
}