import { useRef, useState } from "react";
import { Text, TextInput, TextInputKeyPressEventData, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

interface TextInputProp {
    focus: () => void
}

interface OtpCodeProps {
    setOtpCode: (s: string) => void
    otpError: string
}

export const OtpCode: React.FC<OtpCodeProps> = ({ setOtpCode, otpError }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<TextInputProp[]>(Array(otp.length).fill({}));
    
    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpCode(newOtp.join(''))
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