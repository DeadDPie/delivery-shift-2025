import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostOtpQuery } from "../(hooks)/usePostOtpQuery";
import { otpFormScheme, phoneFormScheme } from "../(constants)/formSchemas";
import { z } from "zod";

export const useAuthForm = () => {
	const [isOtpStage, setOtpStage] = useState(false);
	const { mutate: postOtpMutate } = usePostOtpQuery();

	const form = useForm<z.infer<typeof phoneFormScheme | typeof otpFormScheme>>({
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
			postOtpMutate({ phone: values.phone });
			setOtpStage(true);
		} else if ("otp" in values) {
			console.log("OTP submitted:", values.otp);
		}
	};

	return {
		form,
		isOtpStage,
		onSubmit,
		setOtpStage,
	};
};
