import { instance } from "../instance";

export interface UpdateProfileRequestParams {
    phone: string;
    profile: {
        firstname: string;
        middlename?: string;
        lastname: string;
        email?: string;
        city?: string;
    };
}

export interface UpdateProfileResponse {
    success: boolean;
    user: {
        _id: string;
        phone: string;
    };
}

export type UpdateProfileRequestConfig =
    RequestConfig<UpdateProfileRequestParams>;

export const updateUserProfile = async ({
    params,
    config,
}: UpdateProfileRequestConfig) => {
    const response = await instance.patch<UpdateProfileResponse>(
        "/users/profile",
        params,
        config
    );
    return response.data;
};
