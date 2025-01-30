"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import { useDeliveryPointsQuery } from "../(hooks)/useDeliveryPointsQuery ";
import { type PackageType, PackageTypesList } from "./PackageTypesList";

const FormSchema = z.object({
    departureCity: z
        .object({
            id: z.string(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Выберите пункт отправки",
        }),
    destinationCity: z
        .object({
            id: z.string(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Выберите пункт назначения",
        }),
    packageSize: z.string().min(1, "Выберите размер посылки"),
});

export function CountDeliveryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
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

    function onSubmit(data: z.infer<typeof FormSchema>) {
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                {isLoading ? (
                    <p>Загрузка пунктов выдачи...</p>
                ) : (
                    ["departureCity", "destinationCity"].map((name) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name as "departureCity" | "destinationCity"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {name === "departureCity"
                                            ? "Пункт отправки"
                                            : "Пункт назначения"}
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const point = deliveryPoints.find(
                                                (p) => p.id === value
                                            );
                                            if (point) {
                                                field.onChange(point);
                                            }
                                        }}
                                        value={field.value?.id || ""}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        name === "departureCity"
                                                            ? "Выберите пункт отправки"
                                                            : "Выберите пункт назначения"
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {deliveryPoints.map((point) => (
                                                <SelectItem
                                                    key={point.id}
                                                    value={point.id}
                                                >
                                                    {point.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                )}

                <FormField
                    control={form.control}
                    name="packageSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Размер посылки</FormLabel>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        {selectedPackage.name ||
                                            "Выберите размер посылки"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="right"
                                    align="start"
                                    className="max-h-[300px] w-[400px] fixed overflow-auto"
                                >
                                    <PackageTypesList
                                        setSelectedPackage={(packageType) => {
                                            setSelectedPackage(packageType);
                                            field.onChange(packageType.name);
                                        }}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Рассчитать доставку
                </Button>
            </form>
        </Form>
    );
}
