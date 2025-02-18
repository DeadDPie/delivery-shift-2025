import { useStep } from "@/lib/contexts/StepContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const senderSchema = z.object({
    phone: z.string().min(10, "Введите корректный номер"),
    firstname: z.string().min(1, "Введите имя"),
    middlename: z.string().optional(),
    lastname: z.string().min(1, "Введите фамилию"),
});

export const useSenderForm = () => {
    const { formData, updateFormData } = useStep();

    const form = useForm({
        resolver: zodResolver(senderSchema),
        defaultValues: {
            phone: formData.sender?.phone || "",
            firstname: formData.sender?.firstname || "",
            middlename: formData.sender?.middlename || "",
            lastname: formData.sender?.lastname || "",
        },
        mode: "onChange",
    });

    const onSubmit = form.handleSubmit((values) => {
        updateFormData("sender", values);
    });

    return { form, onSubmit };
};
