import { useQuery } from "react-query";
import axiosClient from "../utils/axios";
import { GET_HISTORIES_URL } from "../utils/constants";
import { getCustomer } from "../utils/helper";
import { History, HistoryExpandable } from "../types/History";
import { useContext } from "react";
import { AuthContext } from "../App";

function createData({ title, histories }: History): HistoryExpandable {
    return {
        title: title,
        histories: histories.map(history => {
            return { staffName: history.staffName, time: history.time, total: history.total}
        }),
        isExpanded: true
    }
}
const useGetHistory = () => {
    const { customer } = useContext(AuthContext)

    return useQuery({
        queryFn: () => axiosClient 
        .get(`${GET_HISTORIES_URL}${customer?.phoneNumber}`)
            .then((response) => {  
                if (response.data.data)
                console.log(response.data.data)
                return response.data.data.map((data: History) => createData(data))
            return undefined
        }),
    })
};

export {
    useGetHistory
}