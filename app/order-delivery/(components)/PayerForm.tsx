"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStep } from "@/lib/contexts/StepContext";

import { useState } from "react";

export const PayerForm = () => {
    const { updateFormData, updateStepValidity, currentStep } = useStep();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const payers = [
        { id: "RECEIVER", label: "Получатель" },
        { id: "SENDER", label: "Отправитель" },
    ];

    const handleSelect = (value: string) => {
        if (selectedOption === value) return;

        setSelectedOption(value);
        updateFormData("payer", value);
        updateStepValidity(currentStep, true);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col max-w-[500px] gap-4">
            <RadioGroup
                value={selectedOption || ""}
                onValueChange={handleSelect}
            >
                {payers.map((payer) => (
                    <div key={payer.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={payer.id} id={payer.id} />
                        <Label htmlFor={payer.id}>{payer.label}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};
