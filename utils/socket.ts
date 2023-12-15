import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "./constants";

let socket: Socket | null

export const initialSocket = (phoneNumber: string) => {
    socket = io(SOCKET_URL, {
        query: {
            phoneNumber,
        },
    });
}

// export const sendMessage = ({ message, roomId }, cb) => {
//     if (socket) {
//         socket.emit('message', { message, roomId }, cb);
//     }
// }

// export const subscribeToMessages = (cb) => {
//     if (!socket) {
//         return(true)
//     }
//     socket.on('message', msg => {
//         console.log('Room event received!');
//         return cb(null, msg);
//     });
// }
