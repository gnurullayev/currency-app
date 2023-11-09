import Axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // if (!config.headers.Authorization) {
    //   const token = localStorage.getItem("token");

    //   if (token) {
    //     config.headers.Authorization = token;
    //   }
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export const API = {
  getSymbols: () => axiosInstance.get(`currencies?api_key=${API_KEY}`),
  ConvertEndpoint: (data: { from: string; to: string; amount: string }) =>
    axiosInstance.get(
      `convert?api_key=${API_KEY}&from=${data.from}&to=${data.to}&amount=${data.amount}`
    ),
  currencies: (data: string) =>
    axiosInstance.get(`fetch-all?from=${data}&api_key=${API_KEY}
`),
};
