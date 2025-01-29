import axios from "axios";

export const instance = axios.create({
    baseURL: "https://shift-intensive.ru/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
