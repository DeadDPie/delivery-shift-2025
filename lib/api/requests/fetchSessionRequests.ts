import { instance } from "../instance";

export type FetchSessionRequestConfig = RequestConfig;

export interface FetchSessionResponse {
    success: boolean;
    reason: string;
    user: {
        _id: string;
        phone: string;
        firstname?: string;
        middlename?: string;
        lastname?: string;
        email?: string;
        city?: string;
    };
}

export const fetchSession = async ({ config }: FetchSessionRequestConfig) =>
    instance.get<FetchSessionResponse>("/users/session", {
        ...config,
    });
