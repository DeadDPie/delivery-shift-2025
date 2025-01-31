"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStep } from "@/lib/contexts/StepContext";
import useDeliveryStore from "@/lib/store/deliveryStore";

const Stepper = () => {
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

    const handleSubmit = () => {
        const updatedFormData = {
            ...formData,
            senderPoint: data.params?.senderPoint || null,
            receiverPoint: data.params?.receiverPoint || null,
        };

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
