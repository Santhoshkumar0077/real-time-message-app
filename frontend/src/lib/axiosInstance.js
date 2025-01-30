import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.MODE === "development" ? "http://localhost:3000" : "/"
});

export default axiosInstance;
