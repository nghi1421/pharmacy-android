import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SOCKET_URL } from "../utils/constants";
import { io } from "socket.io-client";
import { Alert } from "react-native";
import { AuthContext } from "../App";
import dayjs from "dayjs";
import { useGetMessageFromRoomId } from "./chatHook";

export const useSocket = (phoneNumber: string | undefined) => {
    const { roomId } = useContext(AuthContext)
    const [socket, _] = useState(io(SOCKET_URL, {
        query: {
            phoneNumber: phoneNumber
        }
    }))

    const [chat, setChat] = useState<any[]>([]);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message && message.trim().length !== 0) {
            setMessage('');
            socket.emit('chat message', roomId, message, phoneNumber, '');
        }
    }

    useEffect(() => {
        socket.emit('join-room', roomId);

        socket.on('message', (msg, isFromCustomer, time, id) => {
            setChat((prevChat) => [...prevChat, {
                time: dayjs(time).format('HH:mm'),
                id: id,
                text: msg,
                user: isFromCustomer ? 1 : 0
            }]);
        });

        socket.on('connect_error', (data) => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(data));
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    return {
        socket,
        handleSendMessage,
        chat,
        setChat,
        message,
        setMessage
    }
}