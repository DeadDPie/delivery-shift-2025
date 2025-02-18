import { useStep } from "@/lib/contexts/StepContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { receiverAddressSchema } from "../(constants)/receiverAddressSchema";

export const useReceiverAddressForm = () => {
    const { formData, updateFormData } = useStep();

    const form = useForm({
        resolver: zodResolver(receiverAddressSchema),
        defaultValues: {
            street: formData.receiverAddress?.street || "", 
            house: formData.receiverAddress?.house || "", 
            apartment: formData.receiverAddress?.apartment || "", 
            comment: formData.receiverAddress?.comment || "", 
        },
        mode: "onChange",
    });

    const onSubmit = form.handleSubmit((values) => {
        updateFormData("receiverAddress", values);
    });

    return { form, onSubmit };
};
