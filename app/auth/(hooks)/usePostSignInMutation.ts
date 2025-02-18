import { PostSignInRequestConfig, postSignIn } from "@/lib/api/requests";
import { useMutation } from "@tanstack/react-query";

export const usePostSignInMutation = (
    settings?: MutationSettings<PostSignInRequestConfig, typeof postSignIn>
) =>
    useMutation({
        mutationKey: ["postUsersSignIn"],
        mutationFn: ({ params, config }) =>
            postSignIn({
                params,
                config: { ...settings?.config, ...config },
            }),
        ...settings?.options,
    });
