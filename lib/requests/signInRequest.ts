import { instance } from "../instance";

export interface SignInRequestParams {
    phone: string;
    code: string;
}

export interface SignInResponse {
    success: boolean;
    user: {
        phone: string;
        _id: string;
    };
    token: string;
}

export const postSignIn = async (data: SignInRequestParams) => {
    const response = await instance.post<SignInResponse>("/users/signin", data);
    return response.data;
};
