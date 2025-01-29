import axios from "axios";
import { getCookie as getCookieClient } from "cookies-next/client";
import { getCookie as getCookieServer } from "cookies-next/server";

import { API_URL } from "../constants/apiUrl";
import { iS_SSR } from "../constants/isSSR";

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        let token: string | undefined;

        if (iS_SSR) {
            token = getCookieServer("token")?.toString() || "";
        } else {
            token = getCookieClient("token")?.toString() || "";
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
