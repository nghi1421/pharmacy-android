import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { TextInput, TextInputKeyPressEventData, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

interface TextInputProp {
    focus: () => void
}

interface OtpCodeProps {
    checkOtpCode: (o: string) => boolean
    havingData: boolean
}

export const OtpCode: React.FC<OtpCodeProps> = ({ checkOtpCode }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigation = useNavigation() ;
    const inputRefs = useRef<TextInputProp[]>(Array(otp.length).fill({}));
    const [otpError, setOtpError] = useState<string>('')
    
    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };
        
    const handleKeyPress = (event: TextInputKeyPressEventData, index: number) => {
        if (event.key === 'Backspace') {
        if (index - 1 >=0 && inputRefs.current[index - 1]) {
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
        console.log(otp.join(''));
        if (checkOtpCode(otp.join(''))) {
            // navigation.navigate('signup', { 
            //     havingData: havingData,
            // })
        }
        else {
            setOtpError('Mã OTP không hợp lệ vui lòng kiểm tra.')
        }
    }
    return (
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
                            onKeyPress={({ nativeEvent  }) => {
                            handleKeyPress(nativeEvent, index)
                            }}
                        />
                    ))}
            </View>
            <Text className='mt-2 text-red-600 font-semibold'>{ otpError }</Text>  
        </Animated.View>
    )
}