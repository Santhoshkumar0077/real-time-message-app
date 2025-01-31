import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://real-time-message-app-kbej.onrender.com"
});

export default axiosInstance;
