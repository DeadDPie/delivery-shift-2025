import { useStep } from "@/lib/contexts/StepContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { senderAddressSchema } from "../(constants)/senderAddressSchema";

export const useSenderAddressForm = () => {
    const { formData, updateFormData } = useStep();

    const form = useForm({
        resolver: zodResolver(senderAddressSchema),
        defaultValues: {
            street: formData.senderAddress?.street || "",
            house: formData.senderAddress?.house || "",
            apartment: formData.senderAddress?.apartment || "",
            comment: formData.senderAddress?.comment || "",
        },
        mode: "onChange",
    });

    const onSubmit = form.handleSubmit((values) => {
        updateFormData("senderAddress", values);
    });

    return { form, onSubmit };
};
