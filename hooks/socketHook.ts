import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SOCKET_URL } from "../utils/constants";
import { io } from "socket.io-client";
import { Alert } from "react-native";
import { AuthContext } from "../App";

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
        setMessage('');

        socket.emit('chat message', roomId, message);


    }

    useEffect(() => {
        socket.emit('join-room', roomId);

        socket.on('message', (msg) => {
            setChat((prevChat) => [...prevChat, {
                time: '11:20:22',
                id: prevChat.length + 1,
                text: msg,
                user: Math.random() > 0.5 ? 1 : 0
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
        message,
        setMessage
    }
}