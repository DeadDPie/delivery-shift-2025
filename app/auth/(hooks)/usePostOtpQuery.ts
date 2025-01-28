import {
    OtpRequestParams,
    OtpResponse,
    postOtp,
} from "@/lib/requests/authRequests";
import { useMutation } from "@tanstack/react-query";

export const usePostOtpQuery = () => {
    return useMutation<OtpResponse, Error, OtpRequestParams>({
        mutationFn: postOtp,
    });
};
