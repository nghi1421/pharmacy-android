import { AntDesign} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export const ChangePasswordScreen = () => {
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
                    Đổi mật khẩu
                </Text>
            </View>
        </>
    )
}