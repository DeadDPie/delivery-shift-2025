import { instance } from "../instance";

export interface PostSignInRequestParams {
    phone: string;
    code: string;
}

export interface PostSignInResponse {
    success: boolean;
    user: {
        phone: string;
        _id: string;
    };
    token: string;
}

export type PostSignInRequestConfig = RequestConfig<PostSignInRequestParams>;

export const postSignIn = async ({
    params,
    config,
}: PostSignInRequestConfig) => {
    const response = await instance.post<PostSignInResponse>(
        "/users/signin",
        params,
        config
    );
    return response.data;
};
