import {
    OtpRequestParams,
    OtpResponse,
    postOtp,
} from "@/lib/api/requests/authRequests";
import { useMutation } from "@tanstack/react-query";

export const usePostOtpMutation = () => {
    return useMutation<OtpResponse, Error, OtpRequestParams>({
        mutationFn: postOtp,
    });
};
