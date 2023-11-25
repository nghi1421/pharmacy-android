import axios from "axios";

let config = {
    "Content-Type" : "application/json"
};

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: 'http://172.16.12.51:3000/api/mobile/',
    headers : config
})

export default axiosClient;