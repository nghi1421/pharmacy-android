import { ReactElement } from "react"
import { Controller } from "react-hook-form"
import { Pressable, Text, TextInput, View } from "react-native"
import { useTogglePasswordVisibility } from "../hooks/togglePasswordVisibility"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export interface FormInputTextProps {
    name: string
    placeholder: string
    control: any
    isPassword?: boolean,
    renderIcon?: () => ReactElement<any>;
}

export const FormTextInput: React.FC<FormInputTextProps> = ({
    control, 
    name,
    placeholder,
    isPassword,
    renderIcon
}) => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    
    const icon = renderIcon && renderIcon()
    return (
        <View  
            className="w-full">
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <View >
                        {icon}
                        
                        {
                            isPassword
                                ?
                                <View className='flex-row align-items-center'>
                                    <TextInput
                                        secureTextEntry={passwordVisibility}
                                        className='bg-black/5 p-5 rounded-2xl text-lg flex-1'
                                        placeholder={placeholder}
                                        placeholderTextColor={'gray'}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    <Pressable onPress={handlePasswordVisibility} className='my-auto absolute right-4 top-6'>
                                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                                    </Pressable>
                                </View>
                                :
                                <View className='flex-row align-items-center'>
                                    <TextInput
                                        className='bg-black/5 p-5 rounded-2xl text-lg flex-1'
                                        placeholder={placeholder}
                                        placeholderTextColor={'gray'}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                        }

                        {
                            error &&
                            <Text className='mt-2 text-red-600 font-semibold'>{ error.message }</Text>
                        }
                    </View>

                )}
            />
        </View>
    )
}