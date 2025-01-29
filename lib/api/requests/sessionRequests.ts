import { instance } from "../instance";

export interface SessionResponse {
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

export const fetchSession = async (token: string): Promise<SessionResponse> => {
    const response = await instance.get<SessionResponse>("/users/session", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
