import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});
const getToken = () => localStorage.getItem("token");

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
