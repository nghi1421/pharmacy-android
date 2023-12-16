import { useContext, useEffect, useState } from "react";
import { SOCKET_URL } from "../utils/constants";
import { io } from "socket.io-client";
import { Alert } from "react-native";
import { AuthContext } from "../App";
import dayjs from "dayjs";
import { Message } from "../types/Message";

export const useSocket = (phoneNumber: string | undefined) => {
    const { roomId } = useContext(AuthContext)
    const [socket, _] = useState(io(SOCKET_URL, {
        query: {
            phoneNumber: phoneNumber
        }
    }))

    const [chat, setChat] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message && message.trim().length !== 0) {
            socket.emit('chat message', roomId, message, phoneNumber, '');
            setMessage('');
        }
    }

    useEffect(() => {
        socket.emit('join-room', roomId);

        socket.on('message', (data: Message, fromCustomer: boolean) => {
            setChat((prevChat) => [...prevChat, {
                content: data.content,
                id: data.id,
                fromCustomer: !fromCustomer,
                time: dayjs(data.time).format('HH:mm'),
            }]);
        });

        return () => {
            socket.off('message');
            socket.off('join-room')
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