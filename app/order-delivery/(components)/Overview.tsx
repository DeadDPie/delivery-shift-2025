"use client";

import { Button } from "@/components/ui/button";
import { useStep } from "@/lib/contexts/StepContext";

export const Overview = () => {
    const { formData } = useStep();

    const handleSubmit = () => {
        console.log("Отправка данных:", formData);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Обзор заказа</h2>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(formData, null, 2)}
            </pre>
            <Button onClick={handleSubmit}>Отправить заказ</Button>
        </div>
    );
};

export default Overview;
