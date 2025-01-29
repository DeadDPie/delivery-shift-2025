import { OtpRequestParams, OtpResponse, postOtp } from "@/lib/api/requests";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const usePostOtpMutation = (
    options?: UseMutationOptions<OtpResponse, Error, OtpRequestParams>
) => {
    return useMutation<OtpResponse, Error, OtpRequestParams>({
        mutationFn: postOtp,
        ...options,
    });
};
