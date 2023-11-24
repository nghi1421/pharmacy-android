import { Controller } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

export interface FormInputTextProps {
    name: string
    placeholder: string
    control: any
}

export const FormPhoneNumber: React.FC<FormInputTextProps> = ({
    control, 
    name,
    placeholder,
}) => {
    return (
        <Animated.View 
            entering={FadeInDown.duration(1000).springify()} 
            className="w-full">
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <View>
                        <TextInput
                            className='bg-black/5 p-5 rounded-2xl'
                            placeholder={placeholder}
                            keyboardType="numeric"
                            placeholderTextColor={'gray'}
                            value={value}
                            onChangeText={onChange}
                        />
                        {
                            error &&
                            <Text className='mt-2 text-red-600 font-semibold'>{ error.message }</Text>
                        }
                    </View>
                )}
            />
        </Animated.View>
    )
}