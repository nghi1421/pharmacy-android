import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HistoryExpandable } from "../types/History";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ExpandableProps {
    data: HistoryExpandable,
    onClick: () => void
}
export const Expandable: React.FC<ExpandableProps> = ({ data, onClick }) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [layoutHeight, setLayoutHeight] = useState<number | null>(0)
    const rotate = useSharedValue(180);

    const animatedStyles = useAnimatedStyle(() => ({
        marginBottom: 4,
        marginTop: 4,
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const handleRotate = () => {
        rotate.value = withTiming(data.isExpanded ? 0 : 180, {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
        })
    };
    useEffect(() => {
        if (data.isExpanded) {
            setLayoutHeight(null)
        }
        else {
            setLayoutHeight(0)
        }
    }, [data.isExpanded])

    return (
        <View className='mb-1'>
            <TouchableOpacity
                className="flex-row bg-indigo-100 w-full h-16 p-4 justify-between align-center"
                onPress={() => {
                    onClick()
                    handleRotate()
                }}
            >
                <Text
                    className="text-2xl font-bold"
                >
                    {data.title}
                </Text>
                <Animated.View
                    style={[animatedStyles]}
                >
                    <AntDesign name="down" size={20} color="black" />
                </Animated.View>
            </TouchableOpacity>
            <View
                style={{ height: layoutHeight, overflow: 'hidden' }}
            >
                {
                    data.histories.map((history, index) => (
                        <TouchableOpacity
                            key={`${data.title}-history-${index}`}
                            className='px-3 py-2 flex-row bg-white'
                            onPress={() => navigation.navigate('detail', { params: { history: history } })}
                        >
                            <View className="text-center justify-center">
                                <FontAwesome
                                    style={{ textAlign: 'center', padding: 1 }}
                                    name="cart-plus"
                                    size={24}
                                    color="rgb(13 148 136)" />

                            </View>
                            <View className="flex-col h-full">
                                <Text className='text-xs px-2 font-semibold'> Đơn mua thuốc </Text>
                                <Text className='text-xs px-2'> Nhân viên bán: {history.staffName} </Text>
                                <Text className='text-xs px-2'> Thời gian: {history.time} </Text>
                            </View>

                            <View className="grow justify-items-end justify-center">
                                <Text className='text-sm px-2 text-green-700 text-right'> {history.total} </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}