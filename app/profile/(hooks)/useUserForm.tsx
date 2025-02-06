import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { User } from "../(components)/UserForm";
import { UserFormData, userFormSchema } from "../(constants)/userFormSchemas";
import { useUpdateProfileMutation } from "./useUpdateProfileMutation";

export const useUserForm = (initialData: User) => {
    const updateProfileMutate = useUpdateProfileMutation();

    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            phone: initialData.phone,
            firstname: initialData.firstname ?? "",
            middlename: initialData.middlename ?? "",
            lastname: initialData.lastname ?? "",
            email: initialData.email ?? "",
            city: initialData.city ?? "",
        },
    });

    const onFormSubmit = (values: UserFormData) => {
        updateProfileMutate.mutate(
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
    };
};
