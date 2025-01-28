"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState } from "react";

import { useSessionQuery } from "./useSessionQuery";

const userFormSchema = z.object({
    phone: z
        .string()
        .min(10, "Номер телефона должен содержать не менее 10 цифр"),
    firstname: z.string().min(2, "Имя должно содержать не менее 2 символов"),
    middlename: z.string().optional(),
    lastname: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
    email: z.string().email("Неверный формат email"),
    city: z
        .string()
        .min(2, "Название города должно содержать не менее 2 символов"),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const useUserForm = () => {
    const [token, setToken] = useState("");
    const { data, isLoading, isError, error } = useSessionQuery(token);

    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            phone: "",
            firstname: "",
            middlename: "",
            lastname: "",
            email: "",
            city: "",
        },
    });

    useEffect(() => {
        const cookieToken = getCookie("token")?.toString() || "";
        setToken(cookieToken);

        if (data?.user) {
            form.reset({
                phone: data.user.phone || "",
                firstname: data.user.firstname || "",
                middlename: data.user.middlename || "",
                lastname: data.user.lastname || "",
                email: data.user.email || "",
                city: data.user.city || "",
            });
        }
    }, [data, form]);

    const onSubmit = (values: UserFormData) => {
        console.log("Обновленные данные пользователя:", values);
        // Здесь вы можете добавить логику для отправки обновленных данных на сервер
    };

    return {
        form,
        onSubmit,
        isLoading,
        isError,
        error,
    };
};
