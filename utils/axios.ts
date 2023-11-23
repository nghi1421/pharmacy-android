import axios from "axios";

let config = {
    "Authorization" : "",
    "Content-Type" : "application/json"
};

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/api/mobile/',
    headers : config
})

export default axiosClient;