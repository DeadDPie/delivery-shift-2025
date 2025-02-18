"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useOrderStore from "@/lib/store/orderStore";
import { Check } from "lucide-react";
import Link from "next/link";

interface OrderData {
    _id: string;
    status: number;
    receiverAddress: {
        street: string;
        house: string;
        apartment?: string;
    };
    receiverPoint: {
        name: string;
    };
    option: {
        name: string;
        type: "DEFAULT" | "EXPRESS";
    };
}

export default function ResultOrderPage() {
    const { data: dataOrder } = useOrderStore();
    const data = dataOrder?.data;
    console.log(dataOrder);
    const delivery = JSON.parse(dataOrder.config.data).option;
    const formatAddress = (
        address: { street: string; house: string; apartment?: string },
        city: string
    ) => {
        return `Россия, г. ${city}, ул. ${address.street}, д. ${address.house}${
            address.apartment ? `, кв. ${address.apartment}` : ""
        }`;
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return "Создан";
            default:
                return "Неизвестный статус";
        }
    };

    if (!data || !data.order) {
        return <div>Данные заказа отсутствуют</div>;
    }

    const { order } = data;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-semibold">
                        Заявка отправлена
                    </h1>
                </div>

                <p className="text-gray-600">
                    Вы можете оплатить ваш заказ в разделе «Профиль»
                </p>

                <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">
                            Номер заказа
                        </div>
                        <div className="font-medium">{order._id}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">Статус</div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span>{getStatusLabel(order.status)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">
                            Адрес доставки
                        </div>
                        <div>
                            {formatAddress(
                                order.receiverAddress,
                                order.receiverPoint.name
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-sm text-gray-500">
                            Тип доставки
                        </div>
                        <div>
                            {delivery?.type === "EXPRESS"
                                ? "Экспресс доставка"
                                : "Стандартная доставка"}
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 pt-2">
                        Вся информация была продублирована в SMS
                    </div>
                </Card>

                <div className="flex gap-4 pt-4">
                    <Button variant="outline" asChild className="flex-1">
                        <Link href="/">Посмотреть статус</Link>
                    </Button>
                    <Button asChild className="flex-1">
                        <Link href="/">На главную</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
