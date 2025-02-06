import {
    UpdateProfileRequestConfig,
    updateUserProfile,
} from "@/lib/api/requests";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileMutation = (
    settings?: MutationSettings<
        UpdateProfileRequestConfig,
        typeof updateUserProfile
    >
) =>
    useMutation({
        mutationKey: ["updateUserProfile"],
        mutationFn: ({ params, config }) =>
            updateUserProfile({
                params,
                config: { ...settings?.config, ...config },
            }),
        ...settings?.options,
    });
