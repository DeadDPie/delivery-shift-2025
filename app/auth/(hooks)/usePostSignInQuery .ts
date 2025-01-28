import {
    SignInRequestParams,
    SignInResponse,
    postSignIn,
} from "@/lib/requests/signInRequest";
import { useMutation } from "@tanstack/react-query";

export const usePostSignInQuery = () => {
    return useMutation<SignInResponse, Error, SignInRequestParams>({
        mutationFn: postSignIn,
    });
};
