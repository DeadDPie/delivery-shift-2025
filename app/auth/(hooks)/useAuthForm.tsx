// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";

// const phoneSchema = z.object({
// 	phone: z
// 		.string()
// 		.min(10, "Введите корректный номер телефона")
// 		.regex(/^\d{10,}$/, "Номер телефона должен содержать только цифры"),
// });

// const otpSchema = z.object({
// 	phone: z
// 		.string()
// 		.min(10, "Введите корректный номер телефона")
// 		.regex(/^\d{10,}$/, "Номер телефона должен содержать только цифры"),
// 	otp: z
// 		.string()
// 		.length(6, "Код подтверждения должен быть длиной 6 символов")
// 		.regex(/^\d{6}$/, "Код должен содержать только цифры"),
// });

// export const useAuthForm = (isOtpStage: boolean) => {
// 	const schema = isOtpStage ? otpSchema : phoneSchema;

// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 		setValue,
// 	} = useForm<z.infer<typeof schema>>({
// 		resolver: zodResolver(schema),
// 		defaultValues: { phone: "", otp: "" },
// 	});

// 	// Логика отправки телефона
// 	const handlePhoneSubmit: SubmitHandler<z.infer<typeof phoneSchema>> = async (
// 		data
// 	) => {
// 		console.log("Телефон отправлен:", data.phone);
// 		// Здесь можно вызвать API
// 		await new Promise((resolve) => setTimeout(resolve, 1000)); // Симуляция запроса
// 		alert(`Код отправлен на номер: ${data.phone}`);
// 	};

// 	// Логика проверки OTP
// 	const handleOtpSubmit: SubmitHandler<z.infer<typeof otpSchema>> = async (
// 		data
// 	) => {
// 		console.log("OTP отправлен:", data.otp);
// 		// Здесь можно вызвать API
// 		await new Promise((resolve) => setTimeout(resolve, 1000)); // Симуляция запроса
// 		alert(`Пользователь с номером ${data.phone} успешно вошел`);
// 	};

// 	const onSubmit = isOtpStage ? handleOtpSubmit : handlePhoneSubmit;

// 	return {
// 		control,
// 		handleSubmit,
// 		onSubmit,
// 		errors,
// 		setValue, // Если нужно обновлять поля извне
// 	};
// };
