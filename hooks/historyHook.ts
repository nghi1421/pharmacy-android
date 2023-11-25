import { useQuery } from "react-query";
import axiosClient from "../utils/axios";
import { GET_HISTORIES_URL } from "../utils/constants";
import { getCustomer } from "../utils/helper";

const useGetHistory = () => {
    let phoneNumber: string = ''
    getCustomer().then((customer) => {
        if (customer) {
            phoneNumber = customer.phoneNumber
        }
    });
    console.log();
    return useQuery({
        queryFn: () => axiosClient
        .get(`${GET_HISTORIES_URL}${phoneNumber}`)
        .then((response)=> {
            return response.data
        }),
    })
};

export {
    useGetHistory
}