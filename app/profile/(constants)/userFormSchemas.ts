import { z } from "zod";

export const userFormSchema = z.object({
    phone: z
        .string()
        .min(10, "Номер телефона должен содержать не менее 10 цифр"),
    firstname: z.string().min(2, "Имя должно содержать не менее 2 символов"),
    middlename: z.string().optional(),
    lastname: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
    email: z.string().email("Неверный формат email").optional(),
    city: z
        .string()
        .min(2, "Название города должно содержать не менее 2 символов")
        .optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;
