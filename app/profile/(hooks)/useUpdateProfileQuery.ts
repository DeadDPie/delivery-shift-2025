import {
    UpdateProfileParams,
    UpdateProfileResponse,
    updateUserProfile,
} from "@/lib/requests/userRequests";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileQuery = () => {
    return useMutation<UpdateProfileResponse, Error, UpdateProfileParams>({
        mutationFn: updateUserProfile,
    });
};
