import { AntDesign } from "@expo/vector-icons";
import { cloneElement, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming  }  from 'react-native-reanimated'

const ExpandableView = ({ expanded = false }) => {
    const height = useSharedValue(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        height.value = withTiming(!expanded ? contentHeight : 0, {
            duration: 150,
        })
    }, [expanded]);

    return (
        <Animated.View
            style={{ height: height.value }}
            className='overflow-hidden'
            >
            <View
                onLayout={(event) => {
                    console.log(event.nativeEvent)
                    setContentHeight(event.nativeEvent.layout.height as number)
                }}
            >
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
                <Text>This is the expanded view</Text>
                <Text>Another line of content</Text>
            </View>
        </Animated.View>
    );
};

export function BannerHistory() {
    const [isExpanded, setIsExpanded] = useState(false);
    const rotate = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        marginBottom: 4,
        marginTop: 4,
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    const handleRotate = () => {
        rotate.value = withTiming(isExpanded ? 180 : 0, {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
        })
    };
 
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setIsExpanded(!isExpanded);
                    handleRotate()
                }}
                style={styles.toggle}
            >
                <View className="flex-row bg-indigo-100 w-full h-16 p-4 justify-between align-center">
                    <Text className='text-2xl font-bold'>
                        Tháng 11/2023
                    </Text>

                    <Animated.View
                        style={[animatedStyles]}
                    >
                        <AntDesign name="down" size={20} color="black" />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            <ExpandableView expanded={isExpanded}/>
        </>
    )
}

const styles = StyleSheet.create({
  app: {},
  toggle: {
    justifyContent: "center",
    alignItems: "center"
  },
  toggleText: {
    color: "#fff"
    },
});