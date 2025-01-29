import { instance } from "../instance";

export interface PostOtpRequestParams {
    phone: string;
}

export interface PostOtpResponse {
    success: boolean;
    retryDelay: number;
}

export type PostOtpRequestConfig = RequestConfig<PostOtpRequestParams>;

export const postOtp = async ({ params, config }: PostOtpRequestConfig) => {
    const response = await instance.post<PostOtpResponse>(
        "/auth/otp",
        params,
        config
    );
    return response.data;
};
