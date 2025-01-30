import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import { PackageType } from "../(components)/PackageTypesList";
import {
    DeliveryFormData,
    DeliveryFormSchema,
} from "../(constants)/DeliveryFormSchema";
import { useDeliveryPointsQuery } from "./useDeliveryPointsQuery ";

export function useDeliveryForm() {
    const form = useForm<DeliveryFormData>({
        resolver: zodResolver(DeliveryFormSchema),
        defaultValues: {
            packageSize: "",
            departureCity: null,
            destinationCity: null,
        },
    });

    const { data: deliveryResponse, isLoading } = useDeliveryPointsQuery();
    const deliveryPoints = deliveryResponse?.data?.points || [];

    const [selectedPackage, setSelectedPackage] = useState<PackageType>({
        id: "",
        name: "",
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
    });

    function onSubmit(data: DeliveryFormData) {
        if (!data.departureCity || !data.destinationCity) {
            console.error("Ошибка: Не выбраны пункты отправки или назначения");
            return;
        }

        const formattedData = {
            package: {
                length: selectedPackage.length,
                width: selectedPackage.width,
                weight: selectedPackage.weight,
                height: selectedPackage.height,
            },
            senderPoint: {
                latitude: data.departureCity.latitude,
                longitude: data.departureCity.longitude,
            },
            receiverPoint: {
                latitude: data.destinationCity.latitude,
                longitude: data.destinationCity.longitude,
            },
        };

        console.log("Форма отправлена:", formattedData);
    }

    return {
        form,
        isLoading,
        deliveryPoints,
        selectedPackage,
        setSelectedPackage,
        onSubmit: form.handleSubmit(onSubmit),
    };
}
