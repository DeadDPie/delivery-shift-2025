import { instance } from "../instance";

export interface FetchSessionParams {
    token: string;
}

export type FetchSessionRequestConfig = RequestConfig<FetchSessionParams>;

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

export const fetchSession = async ({
    params,
    config,
}: FetchSessionRequestConfig) =>
    instance.get<FetchSessionResponse>("/users/session", {
        headers: {
            Authorization: `Bearer ${params.token}`,
        },
        ...config,
    });
