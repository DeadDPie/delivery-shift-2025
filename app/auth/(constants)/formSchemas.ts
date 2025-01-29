import * as z from "zod";

export const phoneFormScheme = z.object({
    phone: z.string().min(11, {
        message: "Поле обязательно для заполнения",
    }),
});

export type PhoneFormScheme = z.infer<typeof phoneFormScheme>;

export const otpFormScheme = z.object({
    otp: z.string().min(6, {
        message: "Код должен содержать 6 цифр",
    }),
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
