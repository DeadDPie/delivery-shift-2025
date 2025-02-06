import { PostOtpRequestConfig, postOtp } from "@/lib/api/requests";
import { useMutation } from "@tanstack/react-query";

export const usePostOtpMutation = (
    settings?: MutationSettings<PostOtpRequestConfig, typeof postOtp>
) =>
    useMutation({
        mutationKey: ["postOtp"],
        mutationFn: ({ params, config }) =>
            postOtp({
                params,
                config: { ...settings?.config, ...config },
            }),
        ...settings?.options,
    });
