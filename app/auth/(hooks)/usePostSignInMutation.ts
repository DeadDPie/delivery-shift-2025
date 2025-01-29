import {
    SignInRequestParams,
    SignInResponse,
    postSignIn,
} from "@/lib/api/requests";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const usePostSignInMutation = (
    options?: UseMutationOptions<SignInResponse, Error, SignInRequestParams>
) => {
    return useMutation<SignInResponse, Error, SignInRequestParams>({
        mutationFn: postSignIn,
        ...options,
    });
};
