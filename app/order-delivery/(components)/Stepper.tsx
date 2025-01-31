"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStep } from "@/lib/contexts/StepContext";

const Stepper = () => {
    const { currentStep, totalSteps, goNext, goBack, isLastStep, isStepValid } =
        useStep();
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
                <Button onClick={goNext} disabled={!isStepValid}>
                    {isLastStep ? "Отправить" : "Вперед"}
                </Button>
            </div>
        </div>
    );
};

export default Stepper;
