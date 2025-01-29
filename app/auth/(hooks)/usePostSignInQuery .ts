import {
    SignInRequestParams,
    SignInResponse,
    postSignIn,
} from "@/lib/api/requests/signInRequest";
import { useMutation } from "@tanstack/react-query";

export const usePostSignInMutation = () => {
    return useMutation<SignInResponse, Error, SignInRequestParams>({
        mutationFn: postSignIn,
    });
};
