import { getCookie } from "cookies-next/server";

import { instance } from "../instance";

export interface UpdateProfileParams {
    phone: string;
    profile: {
        firstname: string;
        middlename?: string;
        lastname: string;
        email?: string;
        city?: string;
    };
    token: string;
}

export interface UpdateProfileResponse {
    success: boolean;
    user: {
        _id: string;
        phone: string;
    };
}

export const updateUserProfile = async ({
    phone,
    profile,
    token,
}: UpdateProfileParams) => {
    const response = await instance.patch<UpdateProfileResponse>(
        "/users/profile",
        {
            phone,
            profile,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
