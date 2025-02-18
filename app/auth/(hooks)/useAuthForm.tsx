import { ROUTES } from "@/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import { otpFormScheme, phoneFormScheme } from "../(constants)/formSchemas";
import { usePostOtpMutation } from "./usePostOtpMutation";
import { usePostSignInMutation } from "./usePostSignInMutation";

export const useAuthForm = () => {
    const router = useRouter();

    const [isOtpStage, setOtpStage] = useState(false);
    const postOtpQuery = usePostOtpMutation();
    const postSignInQuery = usePostSignInMutation();

    const form = useForm<
        z.infer<typeof phoneFormScheme | typeof otpFormScheme>
    >({
        resolver: zodResolver(isOtpStage ? otpFormScheme : phoneFormScheme),
        defaultValues: {
            phone: "",
            otp: "",
        },
    });

    const onFromSubmit = (
        values: z.infer<typeof phoneFormScheme | typeof otpFormScheme>
    ) => {
        if ("phone" in values && !isOtpStage) {
            postOtpQuery.mutate(
                { params: { phone: values.phone } },
                {
                    onSuccess: () => setOtpStage(true),
                }
            );
        } else if ("otp" in values) {
            postSignInQuery.mutate(
                {
                    params: {
                        phone: form.getValues("phone"),
                        code: values.otp,
                    },
                },
                {
                    onSuccess: (response) => {
                        console.log("User authenticated:", response);

                        setCookie("token", response.token, {
                            maxAge: 60 * 60 * 24 * 7,
                            secure: true,
                            sameSite: "strict",
                            path: "/",
                        });
                        router.push(ROUTES.PROFILE);
                    },
                }
            );
        }
    };

    return {
        form,
        isOtpStage,
        onSubmit: form.handleSubmit(onFromSubmit),
        setOtpStage,
    };
};
