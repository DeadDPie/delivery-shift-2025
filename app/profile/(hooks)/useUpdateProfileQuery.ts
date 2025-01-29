import {
    UpdateProfileParams,
    UpdateProfileResponse,
    updateUserProfile,
} from "@/lib/api/requests/userRequests";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = () => {
    return useMutation<UpdateProfileResponse, Error, UpdateProfileParams>({
        mutationFn: updateUserProfile,
    });
};
