import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import { otpFormScheme, phoneFormScheme } from "../(constants)/formSchemas";
import { usePostOtpQuery } from "../(hooks)/usePostOtpQuery";
import { usePostSignInQuery } from "./usePostSignInQuery ";

export const useAuthForm = () => {
    const [isOtpStage, setOtpStage] = useState(false);
    const { mutate: postOtpMutate } = usePostOtpQuery();
    const { mutate: postSignInMutate } = usePostSignInQuery();

    const form = useForm<
        z.infer<typeof phoneFormScheme | typeof otpFormScheme>
    >({
        resolver: zodResolver(isOtpStage ? otpFormScheme : phoneFormScheme),
        defaultValues: {
            phone: "",
            otp: "",
        },
    });

    const onSubmit = (
        values: z.infer<typeof phoneFormScheme | typeof otpFormScheme>
    ) => {
        if ("phone" in values && !isOtpStage) {
            postOtpMutate(
                { phone: values.phone },
                {
                    onSuccess: () => setOtpStage(true),
                }
            );
        } else if ("otp" in values) {
            postSignInMutate(
                { phone: form.getValues("phone"), code: values.otp },
                {
                    onSuccess: (response) => {
                        console.log("User authenticated:", response);
                    },
                }
            );
        }
    };

    return {
        form,
        isOtpStage,
        onSubmit,
        setOtpStage,
    };
};
