"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

import { UserFormData, userFormSchema } from "../(constants)/userFormSchemas";
import { useSessionQuery } from "./useSessionQuery";
import { useUpdateProfileMutation } from "./useUpdateProfileMutation";

export const useUserForm = () => {
    const [token, setToken] = useState("");
    const { data, isLoading, isError, error } = useSessionQuery();
    const { mutate: updateProfileMutate } = useUpdateProfileMutation();

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

        if (data?.data?.user) {
            form.reset({
                phone: data.data.user.phone || "",
                firstname: data.data.user.firstname || "",
                middlename: data.data.user.middlename || "",
                lastname: data.data.user.lastname || "",
                email: data.data.user.email || "",
                city: data.data.user.city || "",
            });
        }
    }, [data, form]);

    const onFormSubmit = (values: UserFormData) => {
        updateProfileMutate(
            {
                params: {
                    phone: values.phone,
                    profile: {
                        firstname: values.firstname,
                        middlename: values.middlename,
                        lastname: values.lastname,
                        email: values.email,
                        city: values.city,
                    },
                },
            },
            {
                onSuccess: (response) => {
                    console.log("Профиль обновлен:", response);
                },
                onError: (error) => {
                    console.error("Ошибка при обновлении профиля:", error);
                },
            }
        );
    };

    return {
        form,
        onSubmit: form.handleSubmit(onFormSubmit),
        isLoading,
        isError,
        error,
    };
};
