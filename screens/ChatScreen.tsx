import { useContext } from "react"
import { AuthContext } from "../App"
import { useSocket } from "../hooks/socketHook"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import MessageComponent from "../components/MessageComponent"
import { styles } from "../assets/styles"

export const ChatScreen = () => {
    const { customer } = useContext(AuthContext)
    const {
        handleSendMessage,
        chat,
        message,
        setMessage
    } = useSocket(customer?.phoneNumber)

    const onChange = (value: string) => {
        setMessage(value)
    }

    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chat[0] ? (
                    <FlatList
                        data={chat}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={2} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleSendMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>Gửi</Text>
                    </View>
                </Pressable>
            </View>
        </View>

    )
}

