"use client";

import { StepProvider, useStep } from "@/lib/contexts/StepContext";

import Stepper from "./(components)/Stepper";
import { ORDER_DELIVERY_STAGES } from "./(constants)/constants";

const StepForm = () => {
    const { currentStep } = useStep();
    const StepComponent = Object.values(ORDER_DELIVERY_STAGES)[currentStep];

    return <StepComponent />;
};

export default function OrderDeliveryPage() {
    return (
        <StepProvider>
            <div className="space-y-6">
                <Stepper />
                <StepForm />
            </div>
        </StepProvider>
    );
}
