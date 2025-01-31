"use client";

import { usePostDeliveryOrderMutation } from "@/app/(hooks)/usePostDeliveryOrderMutation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PostDeliveryOrderParams } from "@/lib/api/requests";
import { ROUTES } from "@/lib/constants/routes";
import { useStep } from "@/lib/contexts/StepContext";
import useDeliveryStore from "@/lib/store/deliveryStore";
import { useRouter } from "next/navigation";

const Stepper = () => {
    const router = useRouter();

    const {
        currentStep,
        totalSteps,
        goNext,
        goBack,
        isLastStep,
        isStepValid,
        formData,
    } = useStep();
    const { data, clearData } = useDeliveryStore();
    const postDeliveryOrder = usePostDeliveryOrderMutation();

    const handleSubmit = () => {
        const updatedFormData: PostDeliveryOrderParams = {
            senderPoint: data.params?.senderPoint || formData.senderPoint,
            receiverPoint: data.params?.receiverPoint || formData.receiverPoint,
            sender: formData.sender,
            senderAddress: formData.senderAddress,
            receiver: formData.receiver,
            receiverAddress: formData.receiverAddress,
            payer: formData.payer,
            option: formData.option,
        };

        postDeliveryOrder.mutate(
            {
                params: updatedFormData,
            },
            {
                onSuccess: (response) => {
                    console.log("Отправка данных:", response);
                },
                onError: (error) => {
                    console.error("Ошибка при отправка данных:", error);
                },
            }
        );
        console.log("Отправка данных:", updatedFormData);

        clearData();
    };

    const handleNext = () => {
        if (isLastStep) {
            handleSubmit();
        } else {
            goNext();
        }
    };

    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <div className="text-center mb-4">
                <p className="text-lg font-semibold">
                    Шаг {currentStep + 1} из {totalSteps}
                </p>
            </div>

            <Progress value={progressPercentage} className="h-4 bg-gray-200" />

            <div className="flex justify-between mt-4">
                <Button onClick={goBack} disabled={currentStep === 0}>
                    Назад
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid}>
                    {isLastStep ? "Отправить" : "Вперед"}
                </Button>
            </div>
        </div>
    );
};

export default Stepper;
