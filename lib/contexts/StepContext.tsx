"use client";

import { ORDER_DELIVERY_STAGES } from "@/app/order-delivery/(constants)/constants";

import { createContext, useContext, useMemo, useState } from "react";

interface FormData {
    option?: any;
    receiver?: any;
    sender?: any;
    senderAddress?: any;
    receiverAddress?: any;
    payer?: any;
    overview?: any;
}

interface StepContextProps {
    currentStep: number;
    totalSteps: number;
    goNext: () => void;
    goBack: () => void;
    isLastStep: boolean;
    isStepValid: boolean;
    formData: FormData;
    updateFormData: (step: keyof FormData, data: any) => void;
    updateStepValidity: (step: number, isValid: boolean) => void;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({});
    const [formValidity, setFormValidity] = useState<Record<number, boolean>>(
        {}
    );

    const stepsLength = Object.keys(ORDER_DELIVERY_STAGES).length;

    const goNext = () => {
        if (currentStep < stepsLength - 1 && formValidity[currentStep]) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const updateFormData = (step: keyof FormData, data: any) => {
        setFormData((prev) => {
            if (prev[step] === data) return prev;
            return {
                ...prev,
                [step]: data,
            };
        });
    };

    const updateStepValidity = (step: number, isValid: boolean) => {
        setFormValidity((prev) => {
            if (prev[step] === isValid) return prev; // Не обновлять, если валидность не изменилась
            return {
                ...prev,
                [step]: isValid,
            };
        });
    };

    const value = useMemo(
        () => ({
            currentStep,
            totalSteps: stepsLength,
            goNext,
            goBack,
            isLastStep: currentStep === stepsLength - 1,
            isStepValid: formValidity[currentStep] ?? false,
            formData,
            updateFormData,
            updateStepValidity,
        }),
        [formData, formValidity, updateFormData, updateStepValidity]
    );

    return (
        <StepContext.Provider value={value}>{children}</StepContext.Provider>
    );
};

export const useStep = () => {
    const context = useContext(StepContext);
    if (!context) {
        throw new Error("useStep must be used within a StepProvider");
    }
    return context;
};
