import { View, Text } from "react-native";
import React from "react";
import { styles } from "../assets/styles";
import { Message } from "../types/Message";

interface MessageComponentProp {
    item: Message;
}

export const MessageComponent: React.FC<MessageComponentProp> = ({ item }) => {
    return (
        <View>
            <View
                style={
                    item.fromCustomer
                        ? styles.mmessageWrapper
                        : [styles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={
                            item.fromCustomer
                                ? styles.mmessage
                                : [styles.mmessage, { backgroundColor: "#bae6fd" }]
                        }
                    >
                        <Text>{item.content} {item.fromCustomer}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </View>
        </View>
    );
}