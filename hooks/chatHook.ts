import { useContext } from "react"
import { AuthContext } from "../App"
import { useQuery } from "react-query"
import axiosClient from "../utils/axios"
import { GET_MESSAGES_FROM_ID_URL } from "../utils/constants"
import dayjs from "dayjs"
import { Message } from "../types/Message"

export const createDataMessage = ({ id, time, content, fromCustomer }: Message): Message => {
    return {
        time: dayjs(time).format('HH:mm'),
        id: id,
        content: content,
        fromCustomer: !fromCustomer
    }
}

export const useGetMessageFromRoomId = () => {
    const { roomId } = useContext(AuthContext)

    return useQuery({
        queryFn: async () => await axiosClient
            .get(`${GET_MESSAGES_FROM_ID_URL}${roomId}`)
            .then((response) => {
                if (response.data.data) {
                    const myData = response.data.data.messages.map((data: Message) => createDataMessage(data))
                    return myData
                }
                return response
            })
            .catch((error) => {
                console.log('Error::', error.response.data)
            })
    })
}