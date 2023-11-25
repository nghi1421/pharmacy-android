import axios from "axios";

let config = {
    "Content-Type" : "application/json"
};

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.1.27:3000/api/mobile/',
    headers : config
})

export default axiosClient;