"use client";

import { useStep } from "@/lib/contexts/StepContext";
import useDeliveryStore from "@/lib/store/deliveryStore";

export const Overview = () => {
    const { data } = useDeliveryStore();
    const { formData, updateStepValidity, currentStep } = useStep();
    updateStepValidity(currentStep, true);

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Обзор заказа</h2>
            <pre className="bg-gray-100 p-4 rounded">
                formData
                {JSON.stringify(formData, null, 2)}
                <br />
                <br />
                {JSON.stringify(data.params, null, 2)}
            </pre>
        </div>
    );
};

export default Overview;
