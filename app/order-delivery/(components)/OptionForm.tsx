"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeliveryOption } from "@/lib/api/requests";
import { useStep } from "@/lib/contexts/StepContext";
import useDeliveryStore from "@/lib/store/deliveryStore";
import { cn } from "@/lib/utils";

import { useState } from "react";


export const OptionForm = () => {
    const { data } = useDeliveryStore();
    const deliveries = data?.response?.data.options;
    data && console.log(data?.response.data.options);
    const { updateFormData } = useStep();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (delivery: (typeof deliveries)[number]) => {
        setSelectedOption(delivery.id);
        updateFormData("option", delivery);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col max-w-[500px] gap-4">
            {deliveries &&
                deliveries.map((delivery: DeliveryOption) => (
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
