"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStep } from "@/lib/contexts/StepContext";
import { cn } from "@/lib/utils";

import { useState } from "react";

const deliveries = [
    {
        id: "ba4da688-b4f5-4a59-90d9-836e7e0883dc",
        days: 3,
        price: 144178,
        name: "Стандартная доставка",
        type: "DEFAULT",
    },
    {
        id: "975d50ac-c316-4585-9cab-a9f3808ae428",
        price: 288356,
        days: 1,
        name: "Экспресс доставка",
        type: "EXPRESS",
    },
];

export const OptionForm = () => {
    const { updateFormData } = useStep();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (delivery: (typeof deliveries)[number]) => {
        setSelectedOption(delivery.id);
        updateFormData("option", delivery);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col max-w-[500px] gap-4">
            {deliveries.map((delivery) => (
                <Card
                    key={delivery.id}
                    className={cn(
                        "p-4 cursor-pointer border-2 transition-all",
                        selectedOption === delivery.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200"
                    )}
                    onClick={() => handleSelect(delivery)}
                >
                    <CardHeader>
                        <CardTitle>{delivery.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-gray-700">
                            Срок: {delivery.days} дней
                        </p>
                        <p className="text-gray-700">
                            Цена: {delivery.price} ₽
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
