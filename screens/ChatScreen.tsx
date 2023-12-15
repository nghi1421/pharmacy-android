import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../App"
import { useSocket } from "../hooks/socketHook"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import MessageComponent from "../components/MessageComponent"
import { styles } from "../assets/styles"
import { createDataMessage } from "../hooks/chatHook"
import axiosClient from "../utils/axios"
import { GET_MESSAGES_FROM_ID_URL } from "../utils/constants"
import { Message } from "../types/Message"

export const ChatScreen = () => {
    const { customer, roomId } = useContext(AuthContext)
    const {
        handleSendMessage,
        chat,
        message,
        setMessage,
        setChat
    } = useSocket(customer?.phoneNumber)
    useEffect(() => {
        const abortController = new AbortController();

        const fetchMessges = async () => {
            try {
                const response = await axiosClient.get(`${GET_MESSAGES_FROM_ID_URL}${roomId}`);
                if (response.status === 200) {
                    console.log('data::::', response.data.data.messages)
                    setChat((prevChat) => [...prevChat, ...response.data.data.messages.map((data: Message) => createDataMessage(data))])
                    return;
                } else {
                    throw new Error("Failed to fetch users");
                }
            } catch (error) {

            }
        };
        fetchMessges();

        return () => abortController.abort();
    }, []);

    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 16, paddingHorizontal: 12 },
                ]}
            >
                {chat[0]
                    ? (
                        <FlatList
                            data={chat}
                            renderItem={({ item }) => (
                                <MessageComponent item={item} user={1} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    )
                    : (
                        ""
                    )}
            </View>

            <View
                className='bg-white border-t border-slate-400 flex-row gap-2 p-2 '
            >
                <TextInput
                    // style={styles.messaginginput}
                    className='border flex-1 rounded-md text-lg border-slate-200 p-4'
                    placeholder="Nhập tin nhắn"
                    onChangeText={(value) => setMessage(value)}
                />
                <Pressable

                    onPress={() => {
                        handleSendMessage();
                    }}
                >
                    <View className='m-auto'>
                        <Text className='text-white bg-blue-500 px-3 py-2 text-xl  border border-blue-400 rounded-md'>Gửi</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    )
}

