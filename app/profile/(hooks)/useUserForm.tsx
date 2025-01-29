"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

import { UserFormData, userFormSchema } from "../(constants)/userFormSchemas";
import { useSessionQuery } from "./useSessionQuery";
import { useUpdateProfileMutation } from "./useUpdateProfileQuery";

export const useUserForm = () => {
    const [token, setToken] = useState("");
    const { data, isLoading, isError, error } = useSessionQuery(token);
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
        updateProfileMutate(
            {
                phone: values.phone,
                profile: {
                    firstname: values.firstname,
                    middlename: values.middlename,
                    lastname: values.lastname,
                    email: values.email,
                    city: values.city,
                },
                token: token,
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
        onSubmit,
        isLoading,
        isError,
        error,
    };
};
