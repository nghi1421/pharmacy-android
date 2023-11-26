import { Controller } from "react-hook-form"
import { Text, TextInput, View } from "react-native"

export interface FormInputTextProps {
    name: string
    placeholder: string
    control: any
    isPassword?: boolean,
}

export const FormTextInput: React.FC<FormInputTextProps> = ({
    control, 
    name,
    placeholder,
    isPassword,
}) => {
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
                    <View>
                        <TextInput
                            className='bg-black/5 p-5 rounded-2xl'
                            placeholder={placeholder}
                            placeholderTextColor={'gray'}
                            secureTextEntry={isPassword ? isPassword : false}
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
        </View>
    )
}