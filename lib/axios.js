"use client";
import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
    timeout: 30000,
});
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === "ERR_CANCELED") {
            return Promise.reject(error);
        }

        if (
            window.location.pathname !== "/" &&
            (error?.response?.status === 401 || error?.code === "ERR_NETWORK")
        ) {
            window.location.replace("/");
        }

        return Promise.reject(error);
    }
);
export default axios;