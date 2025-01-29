import {
    UpdateProfileParams,
    UpdateProfileResponse,
    updateUserProfile,
} from "@/lib/api/requests";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = (
    options?: UseMutationOptions<
        UpdateProfileResponse,
        Error,
        UpdateProfileParams
    >
) => {
    return useMutation<UpdateProfileResponse, Error, UpdateProfileParams>({
        mutationFn: updateUserProfile,
        ...options,
    });
};
