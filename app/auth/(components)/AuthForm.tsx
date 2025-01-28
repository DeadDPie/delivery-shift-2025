"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostOtpQuery } from "../(hooks)/usePostOtpQuery";

const formSchema = z.object({
	phone: z.string().min(10, {
		message: "Введите корректный номер телефона",
	}),
	otp: z.string().optional(),
});

interface AuthFormProps {
	isOtpStage?: boolean;
	isLoading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({}) => {
	const [isOtpStage, setOtpStage] = useState(false);
	const isLoading = false;
	const { mutate: postOtpMutate } = usePostOtpQuery();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: "",
			otp: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		
		if (!isOtpStage) {
			postOtpMutate({ phone: values.phone }); 
			setOtpStage(true); 
		} else {
			console.log("OTP submitted:", values.otp); 
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Авторизация</FormLabel>
							<FormDescription>
								Введите номер телефона для входа в личный кабинет
							</FormDescription>
							<FormControl>
								<Input placeholder="Телефон" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isOtpStage && (
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Проверочный код" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button type="submit" disabled={isLoading}>
					{isOtpStage ? "Войти" : "Продолжить"}
				</Button>
			</form>
		</Form>
	);
};
