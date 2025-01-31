import { useStep } from "@/lib/contexts/StepContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const receiverSchema = z.object({
    phone: z.string().min(10, "Введите корректный номер"),
    firstname: z.string().min(1, "Введите имя"),
    middlename: z.string().optional(),
    lastname: z.string().min(1, "Введите фамилию"),
});

export const useReceiverForm = () => {
    const { formData, updateFormData, updateStepValidity, currentStep } =
        useStep();

    const form = useForm({
        resolver: zodResolver(receiverSchema),
        defaultValues: {
            phone: formData.receiver?.phone || "",
            firstname: formData.receiver?.firstname || "",
            middlename: formData.receiver?.middlename || "",
            lastname: formData.receiver?.lastname || "",
        },
        mode: "onChange",
    });

    // Функция отправки формы
    const onSubmit = form.handleSubmit((values) => {
        updateFormData("receiver", values);
    });

    return { form, onSubmit };
};
