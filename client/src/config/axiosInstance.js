import axios from "axios";


const BASE_URL = `${import.meta.env.BACKEND_URL}/api/v1`
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.timeout = 10000;

export default axiosInstance;