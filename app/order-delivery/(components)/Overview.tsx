"use client";

import { useStep } from "@/lib/contexts/StepContext";

import { OrderCard } from "./OrderCard";

export const Overview = () => {
    const { formData, updateStepValidity, currentStep, goNext, goBack } =
        useStep();
    updateStepValidity(currentStep, true);

    const handleEdit = (stepIndex: number) => {
        if (stepIndex < currentStep) {
            goBack();
        } else if (stepIndex > currentStep) {
            goNext();
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <h2 className="text-lg font-semibold">Обзор заказа</h2>

            <OrderCard
                title="Получатель"
                fields={[
                    {
                        label: "ФИО",
                        value: formData.receiver
                            ? `${formData.receiver.lastname} ${formData.receiver.firstname} ${formData.receiver.middlename || ""}`.trim()
                            : "—",
                    },
                    {
                        label: "Телефон",
                        value: formData.receiver?.phone
                            ? `+7 ${formData.receiver.phone.replace(/\D/g, "").slice(1, 4)} ${formData.receiver.phone.slice(4, 7)} ${formData.receiver.phone.slice(7, 9)} ${formData.receiver.phone.slice(9, 11)}`
                            : "—",
                    },
                ]}
                onEdit={() => handleEdit(1)}
            />

            <OrderCard
                title="Отправитель"
                fields={[
                    {
                        label: "ФИО",
                        value: formData.sender
                            ? `${formData.sender.lastname} ${formData.sender.firstname} ${formData.sender.middlename || ""}`.trim()
                            : "—",
                    },
                    {
                        label: "Телефон",
                        value: formData.sender?.phone
                            ? `+7 ${formData.sender.phone.replace(/\D/g, "").slice(1, 4)} ${formData.sender.phone.slice(4, 7)} ${formData.sender.phone.slice(7, 9)} ${formData.sender.phone.slice(9, 11)}`
                            : "—",
                    },
                ]}
                onEdit={() => handleEdit(2)}
            />

            <OrderCard
                title="Откуда забрать"
                fields={[
                    {
                        label: "Адрес",
                        value: formData.senderAddress
                            ? `ул. ${formData.senderAddress.street}, д. ${formData.senderAddress.house}${formData.senderAddress.apartment ? `, кв. ${formData.senderAddress.apartment}` : ""}`
                            : "—",
                    },
                    {
                        label: "Заметка",
                        value: formData.senderAddress?.comment || "—",
                    },
                ]}
                onEdit={() => handleEdit(3)}
            />

            <OrderCard
                title="Куда доставить"
                fields={[
                    {
                        label: "Адрес",
                        value: formData.receiverAddress
                            ? `ул. ${formData.receiverAddress.street}, д. ${formData.receiverAddress.house}${formData.receiverAddress.apartment ? `, кв. ${formData.receiverAddress.apartment}` : ""}`
                            : "—",
                    },
                    {
                        label: "Заметка",
                        value: formData.receiverAddress?.comment || "—",
                    },
                ]}
                onEdit={() => handleEdit(4)}
            />

            <div className="flex justify-between items-start pt-4">
                <div className="space-y-1">
                    <div>Тариф: {formData.option?.name || "—"}</div>
                    <div>Срок: {formData.option?.days || "—"} рабочих дней</div>
                </div>
                <div className="text-xl font-semibold">
                    Итого:{" "}
                    {formData.option?.price
                        ? `${formData.option.price.toLocaleString("ru-RU")}₽`
                        : "—"}
                </div>
            </div>
        </div>
    );
};

export default Overview;
