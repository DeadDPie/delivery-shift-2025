"use client";

import { Button } from "@/components/ui";
import { Progress } from "@/components/ui/progress";

import React, { useState } from "react";

interface StepperProps {
    totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ totalSteps }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            console.log("Данные отправлены!");
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <div className="text-center mb-4">
                <p className="text-lg font-semibold">
                    Шаг {currentStep} из {totalSteps}
                </p>
            </div>

            <Progress value={progressPercentage} className="h-4 bg-gray-200" />

            <div className="flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentStep === 1}>
                    Назад
                </Button>
                <Button onClick={handleNext}>
                    {currentStep === totalSteps ? "Отправить" : "Вперед"}
                </Button>
            </div>
        </div>
    );
};

export default Stepper;
