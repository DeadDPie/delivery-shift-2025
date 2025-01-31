import { useStep } from "@/lib/contexts/StepContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { senderAddressSchema } from "../(constants)/senderAddressSchema";

export const useSenderAddressForm = () => {
    const { formData, updateFormData } = useStep();

    const form = useForm({
        resolver: zodResolver(senderAddressSchema),
        defaultValues: {
            street: formData.senderAddress?.street || "", // Улица
            house: formData.senderAddress?.house || "", // Дом
            apartment: formData.senderAddress?.apartment || "", // Квартира
            comment: formData.senderAddress?.comment || "", // Комментарий
        },
        mode: "onChange",
    });

    const onSubmit = form.handleSubmit((values) => {
        updateFormData("senderAddress", values);
    });

    return { form, onSubmit };
};
